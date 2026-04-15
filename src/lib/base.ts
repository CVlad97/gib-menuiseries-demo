export function withBase(path: string): string {
  if (!path) {
    return import.meta.env.BASE_URL
  }

  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
