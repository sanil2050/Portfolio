import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { LogoRoll } from "@/components/sections/logo-roll"
import { SmartInsights } from "@/components/sections/smart-insights"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-full overflow-hidden">
        <HeroSection />
        <LogoRoll />
        <SmartInsights />
        <FeaturedProjects />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
