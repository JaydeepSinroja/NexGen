import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { projects } from "@/components/PortfolioSection";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const filterOptions = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-28 pb-16 container mx-auto px-4 md:px-6">
          <div className="space-y-3 mb-10">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
              Portfolio
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
              All Projects with category filters
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Browse everything we have shipped. Use filters to jump to the work
              that matters most to you.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {filterOptions.map((option) => (
              <Button
                key={option}
                variant={activeFilter === option ? "glow" : "glass"}
                size="sm"
                onClick={() => setActiveFilter(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6`}
                >
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
                <div className="absolute inset-0 rounded-2xl border border-border/50 group-hover:border-primary/50 transition-colors duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
