import HeroSection from '@/components/HeroSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import AboutSnapshot from '@/components/AboutSnapshot'
import ServicesSnapshot from '@/components/ServicesSnapshot'
import BlogPreview from '@/components/BlogPreview'
import ResourcesPreview from '@/components/ResourcesPreview'
import TestimonialsSection from '@/components/TestimonialsSection'
import NewsletterCTA from '@/components/NewsletterCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <AboutSnapshot />
      <ServicesSnapshot />
      <BlogPreview />
      <ResourcesPreview />
      <TestimonialsSection />
      <NewsletterCTA />
    </>
  )
}
