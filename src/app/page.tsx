import HeroSection from '@/components/HeroSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ApproachSection from '@/components/ApproachSection'
import SectorsSection from '@/components/SectorsSection'
import CTASection from '@/components/CTASection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogNewsletterSection from '@/components/BlogNewsletterSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />           {/* 01 — light cerulean #E8F4FD */}
      <MarqueeStrip />          {/* 02 — white */}
      <AboutSection />          {/* 03 — white */}
      <ServicesSection />       {/* 04 — white */}
      <ApproachSection />       {/* 05 — white/cream */}
      <SectorsSection />        {/* 06 — light cerulean #E8F4FD */}
      <CTASection />            {/* 07 — cerulean #006FC6 */}
      <TestimonialsSection />   {/* 08 — white */}
      <BlogNewsletterSection /> {/* 09 — white */}
    </>
  )
}
