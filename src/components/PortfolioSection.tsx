import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const projects = [
  {
    title: "SaaS Dashboard",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    gradient: "from-primary/80 to-secondary/80",
  },
  {
    title: "E-Commerce Platform",
    category: "Landing Page",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    gradient: "from-secondary/80 to-accent/80",
  },
  {
    title: "Fitness Mobile App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&h=400&fit=crop",
    gradient: "from-accent/80 to-primary/80",
  },
  {
    title: "Marketing Automation",
    category: "Automation",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
    gradient: "from-primary/80 to-accent/80",
  },
  {
    title: "Real Estate Portal",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    gradient: "from-secondary/80 to-primary/80",
  },
  {
    title: "Crypto Trading App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    gradient: "from-accent/80 to-secondary/80",
  },
  {
    title: "AI Content Studio",
    category: "Automation",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    gradient: "from-primary/80 to-accent/80",
  },
  {
    title: "Fintech Wallet",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    gradient: "from-secondary/80 to-primary/80",
  },
  {
    title: "Health & Wellness Hub",
    category: "Landing Page",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop",
    gradient: "from-accent/80 to-primary/80",
  },
  {
    title: "Education LMS",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&h=400&fit=crop",
    gradient: "from-primary/80 to-secondary/80",
  },
  {
    title: "Travel Booking",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764b81?w=600&h=400&fit=crop",
    gradient: "from-secondary/80 to-accent/80",
  },
  {
    title: "Restaurant Ordering",
    category: "Landing Page",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7b?w=600&h=400&fit=crop",
    gradient: "from-accent/80 to-primary/80",
  },
  {
    title: "Logistics Tracker",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1508387024700-9fe5c0b37fde?w=600&h=400&fit=crop",
    gradient: "from-primary/80 to-secondary/80",
  },
  {
    title: "Sustainability Dashboard",
    category: "Automation",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
    gradient: "from-secondary/80 to-primary/80",
  },
  {
    title: "Event Ticketing",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
    gradient: "from-accent/80 to-secondary/80",
  },
  {
    title: "IoT Device Console",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    gradient: "from-primary/80 to-accent/80",
  },
  {
    title: "Legal Services Portal",
    category: "Landing Page",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
    gradient: "from-secondary/80 to-primary/80",
  },
  {
    title: "Analytics Studio",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    gradient: "from-accent/80 to-primary/80",
  },
  {
    title: "Agency Landing",
    category: "Landing Page",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop",
    gradient: "from-primary/80 to-secondary/80",
  },
  {
    title: "Customer Support AI",
    category: "Automation",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    gradient: "from-secondary/80 to-accent/80",
  },
  {
    title: "Onboarding Mobile",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1472437774355-71ab6752b434?w=600&h=400&fit=crop",
    gradient: "from-accent/80 to-primary/80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-12 text-center space-y-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
            Projects That{" "}
            <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our portfolio of successful projects across various
            industries.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.slice(0, 9).map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer will-change-transform"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110 will-change-transform"
                />
              </div>

              {/* Overlay - Theme gradient for all */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-secondary/70 to-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-end p-6 will-change-opacity">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out will-change-transform">
                  <span className="text-sm text-foreground/80 font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <span className="text-sm">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl border border-border/50 group-hover:border-primary/50 transition-colors duration-300 ease-out" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button - Below Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center mt-12"
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [1, 0.85, 1] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-xl bg-primary/25 blur-xl animate-pulse" />
            <Button
              asChild
              variant="glow"
              size="lg"
              className="relative shadow-lg shadow-primary/30 bg-primary text-white hover:bg-primary/90"
            >
              <a
                href="/portfolio"
                className="flex items-center gap-2 text-white"
              >
                <span className="text-white">View all projects</span>
                <ArrowRight className="w-5 h-5 text-white" />
                <span className="inline-block h-2 w-2 rounded-full bg-white/80 animate-ping" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
