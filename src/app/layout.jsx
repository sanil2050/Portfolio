import { Outfit, Noto_Serif, Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { SmoothScroll } from "@/components/layout/smooth-scroll"
import { CustomCursor } from "@/components/ui/custom-cursor"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fredoka",
  display: "swap",
})

export const metadata = {
  title: "Sanil Mishra | AI Engineer",
  description:
    "Portfolio of Sanil Mishra — AI Engineer specializing in Agentic AI, Enterprise RAG, Multi-Agent Orchestration, Machine Learning, and Data Analytics.",
  openGraph: {
    title: "Sanil Mishra | AI Engineer",
    description:
      "Portfolio of Sanil Mishra — AI Engineer specializing in Agentic AI, Enterprise RAG, Multi-Agent Orchestration, Machine Learning, and Data Analytics.",
    url: "https://sanilmishra.me",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${notoSerif.variable} ${fredoka.variable} dark`}>
      <body className="font-sans antialiased bg-background text-on-background selection:bg-primary-container selection:text-on-primary">
        <CustomCursor />
        <SmoothScroll>
          {children}
          <Analytics />
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  )
}
