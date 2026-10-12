import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, TrendingUp, Palette, Search, Bot, Shield } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description:
      "Get your project delivered in record time without compromising quality.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    icon: TrendingUp,
    title: "High Conversions",
    description:
      "Our landing pages are optimized for maximum conversion rates.",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    icon: Palette,
    title: "Modern UI/UX",
    description:
      "Beautiful, intuitive designs that users love to interact with.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description:
      "Built-in SEO best practices to help you rank higher on search engines.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Bot,
    title: "Fully Automated",
    description:
      "Set it and forget it with our intelligent automation solutions.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee.",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              We Don't Just Build—{" "}
              <span className="gradient-text">We Transform</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team combines cutting-edge technology with creative excellence
              to deliver solutions that exceed expectations.
            </p>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-6">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "500+", label: "Projects Completed" },
                { value: "50+", label: "Team Members" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-3xl font-display font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>

          {/* Right Content - Benefits Grid */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group glass rounded-xl p-5 hover-lift cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${benefit.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
