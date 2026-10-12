import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Layout, Cog, Smartphone, Globe, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Landing Page Maker - Professional & Affordable",
    description:
      "Professional landing page maker service starting from 5999 INR. High-converting landing pages that capture leads and drive sales. Pixel-perfect designs with blazing-fast performance.",
    features: [
      "A/B Testing Ready",
      "SEO Optimized",
      "Mobile First",
      "Starting from 5999 INR",
    ],
    gradient: "from-primary to-secondary",
    highlighted: true,
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Full-stack web applications built with modern technologies. Scalable, secure, and performant solutions.",
    features: [
      "React & Next.js",
      "Node.js & Nest JS",
      "MongoDB, PostgreSQL & MySQL",
    ],
    gradient: "from-primary via-secondary to-accent",
    highlighted: false,
  }, // {
  //   icon: Cog,
  //   title: "Automation Development",
  //   description:
  //     "Streamline your business with custom automation solutions. Save time and reduce errors with intelligent workflows.",
  //   features: ["Workflow Automation", "API Integrations", "Custom Scripts"],
  //   gradient: "from-secondary to-accent",
  //   highlighted: false,
  // },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android. Beautiful UIs with seamless user experiences.",
    features: ["iOS & Android", "React Native", "Flutter"],
    gradient: "from-accent to-primary",
    highlighted: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Scale Your Business</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            NexGen Digital offers affordable website solutions. Get a
            professional landing page maker service with websites starting from{" "}
            <strong className="gradient-text">5999 INR</strong>. High-converting
            designs that drive real business results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className={`group relative ${
                service.highlighted ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`relative glass rounded-2xl p-8 h-full hover-lift hover-glow overflow-hidden ${
                  service.highlighted ? "lg:flex lg:items-center lg:gap-12" : ""
                }`}
              >
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-border" />

                {/* Icon */}
                <div
                  className={`relative z-10 ${
                    service.highlighted ? "lg:flex-shrink-0" : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {service.highlighted && (
                    <div className="hidden lg:block">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                        ★ Most Popular
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-primary font-medium group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Background Gradient */}
                <div
                  className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
