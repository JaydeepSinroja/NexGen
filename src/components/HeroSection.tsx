import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <Card className="w-full min-h-[600px] lg:h-[700px] bg-card/95 border-border/50 relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="hsl(var(--primary))"
          />

          <div className="flex flex-col lg:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 w-fit"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                {/* <span className="text-sm text-muted-foreground">Trusted by 500+ Businesses</span> */}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground"
              >
                We Build High-Converting
                <span className="block gradient-text">Digital Solutions</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 text-muted-foreground text-lg max-w-lg"
              >
                From stunning landing pages to business automation, mobile apps,
                and full-stack web development — we transform your vision into
                powerful interactive experiences.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Button variant="hero" size="xl" className="group">
                  Create My Landing Page
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="hero-outline" size="xl">
                  Book a Call
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-wrap gap-8 mt-10"
              >
                {[
                  { value: "50+", label: "Projects Delivered" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "24/7", label: "Support Available" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl font-display font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right content - 3D Scene */}
            <div className="hidden lg:flex flex-1 relative min-h-[400px] lg:min-h-0">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
