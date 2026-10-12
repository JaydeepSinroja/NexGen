import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starting from 5999",
    subtitle: "Just landing page.",
    price: "5,999",
    features: ["Responsive on web, mobile, tablet.", "No Domain, No Server."],
    cta: "Book this plan",
    highlighted: false,
  },
  {
    name: "Starting from 9999",
    subtitle: "Landing page with server, No Domain.",
    price: "9,999",
    features: [
      "Server setup included for the landing page.",
      "Ready for traffic without domain management.",
    ],
    cta: "Pick this plan",
    highlighted: true,
  },
  {
    name: "Custom",
    subtitle: "Contact for more.",
    price: "Custom",
    features: [
      "Tailored scope to your goals.",
      "We'll shape the stack and rollout together.",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -left-10 top-10 w-80 h-80 bg-primary/10 rounded-full blur-[140px]" />
      <div className="absolute right-0 bottom-10 w-96 h-96 bg-secondary/10 rounded-full blur-[160px]" />

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
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Choose the plan that{" "}
            <span className="gradient-text">fits your launch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent options so you know exactly what you’re getting before
            we start.
          </p>
        </motion.div>

        {/* Plans */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={cardVariants}>
              <div
                className={`group relative h-full rounded-2xl p-8 glass overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 will-change-transform ${
                  plan.highlighted
                    ? "border border-primary/40 shadow-lg shadow-primary/20"
                    : ""
                }`}
              >
                {/* Theme gradient overlay for all plans */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/60 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-opacity" />
                <div className="absolute inset-0 rounded-2xl border border-border/50 group-hover:border-primary/50 transition-colors duration-300 ease-out" />

                <div className="relative z-10 flex flex-col h-full gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.12em] text-primary/80">
                        {plan.name}
                      </p>
                      <h3 className="text-2xl font-display font-bold mt-2">
                        {plan.subtitle}
                      </h3>
                    </div>
                    {plan.highlighted && (
                      <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-4xl font-display font-bold text-foreground">
                      {plan.price === "Custom"
                        ? plan.price
                        : `INR ${plan.price}`}
                    </div>
                    {plan.price !== "Custom" && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Starting from
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <div className="mt-0.5 rounded-full bg-primary/15 p-1">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2">
                    {/* <Button
                      asChild
                      variant={plan.highlighted ? "glow" : "glass"}
                      className="w-full justify-center"
                    >
                      <a href="#contact">
                        {plan.cta}
                        {plan.price === "Custom" ? (
                          <PhoneCall className="w-4 h-4" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </a>
                    </Button> */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
