export class MemoryFS {
  files = new Map<string, Buffer>()
  dirs = new Set<string>()

  private static normalize(path: string): string {
    const parts = path.split('/').filter((p) => p && p !== '.')
    const stack: string[] = []
    for (const part of parts) {
      if (part === '..') stack.pop()
      else stack.push(part)
    }
    return stack.join('/')
  }

  private dirKey(path: string): string {
    const n = MemoryFS.normalize(path)
    return n ? n + '/' : ''
  }

  async mkdir(path: string): Promise<void> {
    const parts = MemoryFS.normalize(path).split('/')
    let acc = ''
    for (const part of parts) {
      acc = acc ? acc + '/' + part : part
      this.dirs.add(acc + '/')
    }
    return Promise.resolve()
  }

  async writeFile(path: string, data: Uint8Array | string): Promise<void> {
    const n = MemoryFS.normalize(path)
    const parts = n.split('/')
    if (parts.length > 1) {
      let acc = ''
      for (let i = 0; i < parts.length - 1; i++) {
        acc = acc ? acc + '/' + parts[i] : parts[i]
        this.dirs.add(acc + '/')
      }
    }
    this.files.set(n, Buffer.isBuffer(data) ? data : Buffer.from(data))
    return Promise.resolve()
  }

  async readFile(path: string, options?: { encoding?: string } | string): Promise<Buffer | string> {
    const n = MemoryFS.normalize(path)
    const found = this.files.get(n)
    if (found === undefined) {
      const err = new Error(`ENOENT: no such file or directory, open '${path}'`) as NodeJS.ErrnoException
      err.code = 'ENOENT'
      throw err
    }
    const encoding = typeof options === 'string' ? options : options?.encoding
    return encoding === 'utf8' || encoding === 'utf-8' ? found.toString('utf8') : found
  }

  async readdir(path: string): Promise<string[]> {
    const prefix = this.dirKey(path)
    const names = new Set<string>()
    for (const key of this.files.keys()) {
      if (key.startsWith(prefix)) {
        const rest = key.slice(prefix.length)
        const first = rest.split('/')[0]
        if (first) names.add(first)
      }
    }
    for (const dir of this.dirs) {
      if (dir.startsWith(prefix)) {
        const rest = dir.slice(prefix.length)
        const first = rest.split('/')[0]
        if (first) names.add(first)
      }
    }
    return Promise.resolve([...names].sort())
  }

  async unlink(path: string): Promise<void> {
    const n = MemoryFS.normalize(path)
    if (!this.files.delete(n)) {
      const err = new Error(`ENOENT: no such file or directory, unlink '${path}'`) as NodeJS.ErrnoException
      err.code = 'ENOENT'
      throw err
    }
    return Promise.resolve()
  }

  async rmdir(path: string): Promise<void> {
    const n = this.dirKey(path)
    const hasChildren =
      [...this.files.keys()].some((k) => k.startsWith(n) && k !== n.slice(0, -1)) ||
      [...this.dirs].some((d) => d.startsWith(n) && d !== n)
    if (hasChildren) {
      const err = new Error(`ENOTEMPTY: directory not empty, rmdir '${path}'`) as NodeJS.ErrnoException
      err.code = 'ENOTEMPTY'
      throw err
    }
    this.dirs.delete(n)
    return Promise.resolve()
  }

  async rename(oldPath: string, newPath: string): Promise<void> {
    const from = MemoryFS.normalize(oldPath)
    const to = MemoryFS.normalize(newPath)
    const content = this.files.get(from)
    if (content !== undefined) {
      this.files.delete(from)
      return this.writeFile(to, content)
    }
    if (this.dirs.has(from + '/')) {
      const moved: [string, Buffer][] = []
      for (const [key, value] of this.files) {
        if (key.startsWith(from + '/')) moved.push([to + key.slice(from.length), value])
      }
      for (const [key] of moved) this.files.delete(key)
      for (const [key, value] of moved) this.files.set(key, value)
      return Promise.resolve()
    }
    const err = new Error(`ENOENT: no such file or directory, rename '${oldPath}'`) as NodeJS.ErrnoException
    err.code = 'ENOENT'
    throw err
  }

  async stat(path: string): Promise<{
    isDirectory: () => boolean
    isFile: () => boolean
    isSymbolicLink: () => boolean
    mode: number
    size: number
    mtime: Date
    ctime: Date
    mtimeMs: number
    ctimeMs: number
    ino: number
    uid: number
    gid: number
    dev: number
  }> {
    const n = MemoryFS.normalize(path)
    const isDir = this.dirs.has(n + '/')
    const content = this.files.get(n)
    if (!isDir && content === undefined) {
      const err = new Error(`ENOENT: no such file or directory, stat '${path}'`) as NodeJS.ErrnoException
      err.code = 'ENOENT'
      throw err
    }
    const now = new Date()
    return {
      isDirectory: () => isDir,
      isFile: () => content !== undefined,
      isSymbolicLink: () => false,
      mode: isDir ? 0o40000 : 0o100644,
      size: content?.length ?? 0,
      mtime: now,
      ctime: now,
      mtimeMs: now.getTime(),
      ctimeMs: now.getTime(),
      ino: 0,
      uid: 0,
      gid: 0,
      dev: 0
    }
  }

  async lstat(path: string): Promise<{
    isDirectory: () => boolean
    isFile: () => boolean
    isSymbolicLink: () => boolean
    mode: number
    size: number
    mtime: Date
    ctime: Date
    mtimeMs: number
    ctimeMs: number
    ino: number
    uid: number
    gid: number
    dev: number
  }> {
    return this.stat(path)
  }

  async readlink(path: string): Promise<string> {
    const err = new Error(`EINVAL: invalid argument, readlink '${path}'`) as NodeJS.ErrnoException
    err.code = 'EINVAL'
    throw err
  }

  async symlink(): Promise<void> {
    const err = new Error('EOPNOTSUPP: symlinks not supported in playground fs') as NodeJS.ErrnoException
    err.code = 'EOPNOTSUPP'
    throw err
  }

  fileList(): string[] {
    return [...this.files.keys()].sort()
  }
}
