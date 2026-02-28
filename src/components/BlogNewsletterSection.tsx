import { getBlogPosts, BlogPost } from '@/lib/mdx'
import BlogNewsletterClient from './BlogNewsletterClient'

export default function BlogNewsletterSection() {
  const posts = getBlogPosts().slice(0, 2)
  return <BlogNewsletterClient posts={posts} />
}
