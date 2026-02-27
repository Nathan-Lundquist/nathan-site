import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  coverImage?: string
  content: string
}

export interface Resource {
  slug: string
  title: string
  description: string
  category: string
  fileUrl?: string
  free: boolean
  content: string
}

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(contentDir, 'blog')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug: file.replace('.mdx', ''),
        title: data.title ?? 'Untitled',
        date: data.date ?? '',
        description: data.description ?? '',
        tags: data.tags ?? [],
        coverImage: data.coverImage,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  const file = path.join(contentDir, 'blog', `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    content,
  }
}

export function getResources(): Resource[] {
  const dir = path.join(contentDir, 'resources')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug: file.replace('.mdx', ''),
      title: data.title ?? 'Untitled',
      description: data.description ?? '',
      category: data.category ?? 'General',
      fileUrl: data.fileUrl,
      free: data.free ?? true,
      content,
    }
  })
}
