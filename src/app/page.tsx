import HeroSection from '@/components/HeroSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import ServicesSection from '@/components/ServicesSection'
import ApproachSection from '@/components/ApproachSection'
import StatsSection from '@/components/StatsSection'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogNewsletterSection from '@/components/BlogNewsletterSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />        {/* 01 - white */}
      <MarqueeStrip />       {/* 02 - white */}
      <ServicesSection />    {/* 03 - dark #0D1824 */}
      <ApproachSection />    {/* 04 - white */}
      <StatsSection />       {/* 05 - #EEF2F8 */}
      <ProcessSection />     {/* 06 - white */}
      <CTASection />         {/* 07 - dark #0D1824 */}
      <TestimonialsSection />{/* 08 - white */}
      <BlogNewsletterSection />{/* 09 - white */}
    </>
  )
}
