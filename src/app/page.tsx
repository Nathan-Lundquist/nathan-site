import HeroSection from '@/components/HeroSection'
import AboutSnapshot from '@/components/AboutSnapshot'
import ServicesSnapshot from '@/components/ServicesSnapshot'
import BlogPreview from '@/components/BlogPreview'
import ResourcesPreview from '@/components/ResourcesPreview'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSnapshot />
      <ServicesSnapshot />
      <BlogPreview />
      <ResourcesPreview />
    </>
  )
}
