import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Policy = () => {
  const sections = [
    {
      id: "information",
      title: "Information We Collect",
      icon: "🗂️",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you place an order or create an account, we collect your name, email address, shipping address, billing address, and payment details. Payment card data is encrypted and processed securely — we never store raw card numbers.",
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our site, including pages visited, products viewed, search queries, browser type, IP address, and device identifiers. This helps us improve your shopping experience.",
        },
        {
          subtitle: "Cookies & Tracking",
          text: "We use cookies, pixel tags, and similar technologies to remember your preferences, keep items in your cart, and understand traffic patterns. You can manage cookie preferences through your browser settings at any time.",
        },
      ],
    },
    {
      id: "usage",
      title: "How We Use Your Data",
      icon: "⚙️",
      content: [
        {
          subtitle: "Order Fulfillment",
          text: "Your personal information is used to process and deliver your orders, send shipping confirmations and tracking updates, and handle returns or exchanges.",
        },
        {
          subtitle: "Communication",
          text: "We may contact you about your orders, respond to support inquiries, and — if you opt in — send promotional emails about new products and exclusive offers. You can unsubscribe at any time.",
        },
        {
          subtitle: "Improvements & Analytics",
          text: "Aggregated and anonymized usage data helps us understand what's working on our site, identify bugs, optimize performance, and develop new features that serve you better.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Sharing Your Information",
      icon: "🤝",
      content: [
        {
          subtitle: "Service Providers",
          text: "We share your information with trusted third-party vendors who help us operate: payment processors (e.g. Stripe), shipping carriers, email platforms, and analytics services. All vendors are contractually bound to protect your data.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information when required by law, court order, or government authority, or when we believe disclosure is necessary to protect our rights or the safety of others.",
        },
        {
          subtitle: "We Never Sell Your Data",
          text: "We do not sell, rent, or trade your personal information to third parties for their marketing purposes. Full stop.",
        },
      ],
    },
    {
      id: "security",
      title: "Data Security",
      icon: "🔒",
      content: [
        {
          subtitle: "Encryption & Protection",
          text: "All data transmitted between your browser and our servers is encrypted via TLS/HTTPS. Sensitive data at rest is encrypted using industry-standard AES-256 encryption.",
        },
        {
          subtitle: "Access Controls",
          text: "Access to customer data is strictly limited to employees who need it to perform their job. All access is logged and regularly audited.",
        },
        {
          subtitle: "Breach Response",
          text: "In the unlikely event of a data breach that affects your personal information, we will notify you within 72 hours in accordance with applicable laws.",
        },
      ],
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: "✅",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to request a copy of the personal data we hold about you in a portable, machine-readable format.",
        },
        {
          subtitle: "Correction & Deletion",
          text: 'You can update your account information at any time from your profile page. To request deletion of your account and associated data, email us at privacy@yourstore.com with the subject "Data Deletion Request".',
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt out of marketing emails using the unsubscribe link in any email, or by updating your notification preferences in your account settings.",
        },
      ],
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: "👶",
      content: [
        {
          subtitle: "Age Restriction",
          text: "Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with their data, please contact us and we will promptly delete it.",
        },
      ],
    },
    {
      id: "updates",
      title: "Policy Updates",
      icon: "🔄",
      content: [
        {
          subtitle: "Changes to This Policy",
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make material changes, we will notify you by email or by displaying a prominent notice on our website. The date at the top of this page will always reflect the most recent revision.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 font-sans w-full">
      <Navbar />
      {/* Hero Header */}
      <div className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              Legal
            </span>
            <span className="w-8 h-px bg-zinc-600" />
          </div>
          <h1
            style={{
              textShadow:
                "2px 2px 20px rgba(255,255,255,0.3), 2px 2px 30px rgba(255,255,255,0.4)",
            }}
            className="w-10/12 sm:w-7/12 text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-10 mt-7"
          >
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xl">
            We care deeply about your privacy. This page explains what data we
            collect, how we use it, and the choices you have. Plain language —
            no legal jargon.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-400">
            <span>
              <span className="font-medium text-gray-300">Effective:</span>{" "}
              January 1, 2025
            </span>
            <span>
              <span className="font-medium text-gray-300">Last updated:</span>{" "}
              March 10, 2025
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Quick Navigation */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-12">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-4">
            Jump to section
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 rounded-full text-sm text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-xs">{s.icon}</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden"
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 px-8 py-6 border-b border-zinc-700">
                <div className="w-10 h-10 rounded-xl bg-zinc-700 border border-zinc-600 flex items-center justify-center text-lg flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-200">
                    {section.title}
                  </h2>
                </div>
              </div>

              {/* Section Content */}
              <div className="divide-y divide-zinc-700">
                {section.content.map((item, i) => (
                  <div key={i} className="px-8 py-6">
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div className="mt-12 bg-zinc-800 border border-zinc-700 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-2">
            Have questions?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
            Our privacy team is happy to help. Reach out and we'll respond
            within 2 business days.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-zinc-600 text-gray-400 font-medium px-5 py-2.5 rounded-full hover:border-zinc-500 hover:text-white transition-colors"
            >
              Contact Support →
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-zinc-500 mt-10 pb-8">
          © {new Date().getFullYear()} YourStore. All rights reserved. ·{" "}
          <a href="/terms" className="hover:text-gray-400 transition-colors">
            Terms of Service
          </a>{" "}
          ·{" "}
          <a href="/cookies" className="hover:text-gray-400 transition-colors">
            Cookie Policy
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Policy;
