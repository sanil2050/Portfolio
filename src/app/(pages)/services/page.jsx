"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { site } from "@/lib/site"
import { motion, useReducedMotion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1]

const services = site.services || [
  {
    title: "Agentic AI & Multi-Agent Systems",
    description: "Autonomous multi-agent orchestration with LangChain, MCP, and critic-auditing loops.",
    features: ["LangChain Orchestration", "MCP Tooling", "Rapid MVP Delivery"]
  },
  {
    title: "Enterprise & Hybrid RAG",
    description: "RBAC-secured retrieval blending dense vectors, BM25 sparse search, and GraphRAG.",
    features: ["pgvector & Pinecone", "RRF + Reranking", "Source Traceability"]
  },
  {
    title: "Machine Learning & Data Analytics",
    description: "Predictive modeling, YOLO computer vision, SHAP explainability, and BI reporting.",
    features: ["PyTorch & YOLOv8/v11", "XGBoost & SHAP", "Pandas, Tableau & Power BI"]
  }
]

const pricing = site.pricing || [
  {
    name: "Rapid MVP",
    price: "1–2 Weeks",
    unit: "",
    description: "Validate an AI workflow or multi-agent prototype fast.",
    features: ["Working AI Prototype", "FastAPI / Streamlit UI", "GitHub Handoff"],
    popular: false
  },
  {
    name: "RAG & Agentic AI",
    price: "Custom",
    unit: "",
    description: "Production Enterprise/Hybrid RAG and multi-agent systems.",
    features: ["JWT / RBAC Security", "Hybrid + GraphRAG", "Grounded Citations"],
    popular: true
  },
  {
    name: "Full-Time & Consulting",
    price: "Flexible",
    unit: "",
    description: "AI Engineer / Data Analyst roles and applied ML consulting.",
    features: ["Computer Vision (YOLO)", "Predictive ML & SHAP", "BI Dashboards"],
    popular: false
  }
]

export default function ServicesPage() {
  const contactHref = "/contact"
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          {/* Header Section */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-24 max-w-2xl"
          >
            <span className="text-xs font-semibold text-secondary tracking-[0.2em] uppercase">What I Deliver</span>
            <h1 className="font-light text-primary mt-4 leading-tight text-4xl md:text-5xl lg:text-6xl font-serif">
              AI Capabilities &amp; Engagement
            </h1>
            <p className="mt-6 text-secondary font-light text-lg leading-relaxed">
              End-to-end engineering across Agentic AI orchestration, Enterprise RAG pipelines, computer vision research, data analytics, and scalable FastAPI backends.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {services.map((service, index) => (
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
                key={index} 
                className="group relative bg-surface-container-low rounded-3xl p-8 border border-outline-variant/50 hover:border-primary/50 transition-colors duration-500 overflow-hidden"
              >
                {/* Number Watermark */}
                <div className="absolute -right-4 -top-8 text-9xl font-serif text-primary/[0.03] group-hover:text-primary/[0.05] transition-colors duration-500 select-none">
                  {index + 1}
                </div>
                
                <h3 className="text-2xl font-medium text-primary mb-3 relative z-10">{service.title}</h3>
                <p className="text-secondary font-light mb-8 relative z-10 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-4 relative z-10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-secondary font-light">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Pricing Header */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-serif text-primary mb-4">Engagement Models</h2>
            <p className="text-secondary font-light text-lg">Flexible ways to collaborate — from rapid AI prototypes to production systems and full-time roles.</p>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {pricing.map((plan, index) => (
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
                key={index} 
                className={`relative bg-surface rounded-3xl p-8 border ${plan.popular ? "border-primary shadow-[0_0_40px_-15px_rgba(255,255,255,0.2)] md:scale-105 z-10" : "border-outline-variant/50"} flex flex-col h-full`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-on-primary text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-medium text-primary mb-2 text-center mt-2">{plan.name}</h3>
                <p className="text-secondary font-light text-center mb-8">{plan.description}</p>
                
                <div className="text-center mb-8">
                  <span className="text-5xl font-light text-primary tracking-tight font-serif">{plan.price}</span>
                  {plan.unit ? <span className="text-secondary ml-1">{plan.unit}</span> : null}
                </div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-secondary font-light">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={contactHref} className="w-full">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold transition-colors ${plan.popular ? "bg-primary text-on-primary hover:bg-primary-container" : "bg-surface border border-outline-variant text-primary hover:border-primary"}`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
