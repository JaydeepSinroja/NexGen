import { CompanyEmail } from "@/lib/utils";
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="pt-16 pb-16 container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                Legal
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Introduction */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                NexGen Digital ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website or use our services, including landing page development,
                automation services, mobile app development, and web development
                services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using our website or services, you consent to the data
                practices described in this Privacy Policy. If you do not agree
                with the practices described in this policy, please do not use
                our services.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-display font-semibold mt-6">
                2.1 Personal Information
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Contact us through our website forms or email</li>
                <li>Request a quote or consultation for our services</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Engage with our services or projects</li>
                <li>Communicate with us via phone, email, or other channels</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This information may include: name, email address, phone number,
                company name, project requirements, and any other information
                you choose to provide.
              </p>

              <h3 className="text-xl font-display font-semibold mt-6">
                2.2 Automatically Collected Information
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                When you visit our website, we may automatically collect certain
                information about your device and browsing behavior, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  To provide, maintain, and improve our services (landing pages,
                  automation, mobile apps, web development)
                </li>
                <li>
                  To respond to your inquiries, requests, and provide customer
                  support
                </li>
                <li>To process transactions and send related information</li>
                <li>
                  To send you marketing communications, newsletters, and
                  promotional materials (with your consent)
                </li>
                <li>
                  To personalize your experience and deliver content relevant to
                  your interests
                </li>
                <li>
                  To analyze website usage and improve our website functionality
                </li>
                <li>
                  To detect, prevent, and address technical issues and security
                  threats
                </li>
                <li>
                  To comply with legal obligations and enforce our terms of
                  service
                </li>
              </ul>
            </motion.div>

            {/* Information Sharing and Disclosure */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Service Providers:</strong> We may share information
                  with third-party service providers who perform services on our
                  behalf, such as hosting, analytics, email delivery, and
                  payment processing.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, or sale of assets, your information may be
                  transferred to the acquiring entity.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose
                  information if required by law, court order, or government
                  regulation, or to protect our rights and safety.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your
                  information with your explicit consent or at your direction.
                </li>
              </ul>
            </motion.div>

            {/* Cookies and Tracking Technologies */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track
                activity on our website and store certain information. Cookies
                are files with a small amount of data that may include an
                anonymous unique identifier.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                website.
              </p>
            </motion.div>

            {/* Data Security */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                6. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </motion.div>

            {/* Your Rights and Choices */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                7. Your Rights and Choices
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  The right to access and receive a copy of your personal
                  information
                </li>
                <li>
                  The right to rectify inaccurate or incomplete information
                </li>
                <li>
                  The right to request deletion of your personal information
                </li>
                <li>
                  The right to object to or restrict processing of your
                  information
                </li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
                <li>The right to opt-out of marketing communications</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us using the
                information provided in the "Contact Us" section below.
              </p>
            </motion.div>

            {/* Data Retention */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                8. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We will retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy, unless a longer retention period is required or
                permitted by law. When we no longer need your information, we
                will securely delete or anonymize it.
              </p>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                9. Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children. If you believe we have collected information from a
                child, please contact us immediately, and we will take steps to
                delete such information.
              </p>
            </motion.div>

            {/* International Data Transfers */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                10. International Data Transfers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your country of residence. These countries
                may have data protection laws that differ from those in your
                country. By using our services, you consent to the transfer of
                your information to these countries.
              </p>
            </motion.div>

            {/* Changes to This Privacy Policy */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
                Changes to this Privacy Policy are effective when they are
                posted on this page.
              </p>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display font-bold mt-8">
                12. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-6 mt-4">
                <p className="text-foreground font-semibold mb-2">
                  NexGen Digital
                </p>
                <p className="text-muted-foreground">
                  Email:{" "}
                  <a
                    href={`mailto:${CompanyEmail}`}
                    className="text-primary hover:underline"
                  >
                    {CompanyEmail}
                  </a>
                </p>
                <p className="text-muted-foreground mt-2">
                  Website:{" "}
                  <a href="/#contact" className="text-primary hover:underline">
                    Contact Us
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Effective Date */}
            <motion.div
              className="pt-8 border-t border-border/50 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-muted-foreground">
                This Privacy Policy is effective as of{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                .
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
