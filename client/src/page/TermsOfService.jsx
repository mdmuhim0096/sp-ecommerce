import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: "📋",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing or using our website, placing an order, or creating an account, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.",
        },
        {
          subtitle: "Changes to Terms",
          text: "We reserve the right to update or modify these Terms at any time. We will notify you of significant changes via email or a prominent notice on our site. Continued use of our services after changes are posted constitutes your acceptance of the updated Terms.",
        },
      ],
    },
    {
      id: "accounts",
      title: "User Accounts",
      icon: "👤",
      content: [
        {
          subtitle: "Account Registration",
          text: "To access certain features, you may need to create an account. You must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your login credentials.",
        },
        {
          subtitle: "Account Responsibility",
          text: "You are solely responsible for all activity that occurs under your account. Notify us immediately at support@yourstore.com if you suspect any unauthorized access or security breach.",
        },
        {
          subtitle: "Account Termination",
          text: "We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or abuse our services — with or without prior notice.",
        },
      ],
    },
    {
      id: "orders",
      title: "Orders & Payments",
      icon: "🛒",
      content: [
        {
          subtitle: "Order Acceptance",
          text: "Placing an order does not constitute a binding contract until we send an order confirmation email. We reserve the right to refuse or cancel any order at our discretion, including cases of pricing errors, suspected fraud, or stock unavailability.",
        },
        {
          subtitle: "Pricing & Taxes",
          text: "All prices are listed in USD and are subject to change without notice. Applicable taxes will be calculated and displayed at checkout based on your shipping address.",
        },
        {
          subtitle: "Payment",
          text: "We accept major credit cards, debit cards, and other payment methods displayed at checkout. By submitting payment, you confirm that you are authorized to use the payment method provided.",
        },
      ],
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: "📦",
      content: [
        {
          subtitle: "Delivery Estimates",
          text: "Shipping times are estimates only and not guaranteed. We are not liable for delays caused by carriers, customs, weather, or other circumstances beyond our control.",
        },
        {
          subtitle: "Risk of Loss",
          text: "Title and risk of loss for products purchased from us pass to you upon delivery to the carrier. We are not responsible for lost or stolen packages once confirmed as delivered.",
        },
      ],
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      icon: "🔁",
      content: [
        {
          subtitle: "Return Policy",
          text: "Most items may be returned within 30 days of delivery in their original, unused condition with all original packaging. Certain items such as perishables, digital goods, and final-sale items are non-returnable.",
        },
        {
          subtitle: "Refund Process",
          text: "Approved refunds will be credited to the original payment method within 5–10 business days. Shipping costs are non-refundable unless the return is due to our error.",
        },
        {
          subtitle: "Damaged or Wrong Items",
          text: "If you receive a damaged or incorrect item, contact us within 7 days of delivery at support@yourstore.com and we will arrange a replacement or full refund at no cost to you.",
        },
      ],
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: "©️",
      content: [
        {
          subtitle: "Our Content",
          text: "All content on this website — including text, images, logos, graphics, and software — is the property of YourStore or its licensors and is protected by applicable copyright and trademark laws.",
        },
        {
          subtitle: "Restrictions",
          text: "You may not reproduce, distribute, modify, or create derivative works of any content on this site without our prior written consent. Unauthorized use may result in legal action.",
        },
      ],
    },
    {
      id: "prohibited",
      title: "Prohibited Conduct",
      icon: "🚫",
      content: [
        {
          subtitle: "Prohibited Activities",
          text: "You agree not to: use our services for any unlawful purpose; attempt to gain unauthorized access to our systems; transmit harmful, offensive, or fraudulent content; scrape or harvest data from our site; or interfere with the proper functioning of our platform.",
        },
        {
          subtitle: "Consequences",
          text: "Violation of these prohibitions may result in immediate account termination and may expose you to civil or criminal liability.",
        },
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: "⚖️",
      content: [
        {
          subtitle: "Disclaimer of Warranties",
          text: 'Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.',
        },
        {
          subtitle: "Liability Cap",
          text: "To the maximum extent permitted by law, YourStore shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Our total liability to you for any claim arising out of these Terms shall not exceed the amount you paid for the order in question.",
        },
      ],
    },
    {
      id: "governing",
      title: "Governing Law",
      icon: "🏛️",
      content: [
        {
          subtitle: "Jurisdiction",
          text: "These Terms shall be governed by and construed in accordance with the laws of the State of [Your State], without regard to its conflict of law provisions. Any disputes shall be resolved exclusively in the courts located in [Your City, State].",
        },
        {
          subtitle: "Dispute Resolution",
          text: "Before filing a formal legal claim, we encourage you to contact us directly at legal@yourstore.com to resolve the matter informally. We will make a good-faith effort to resolve any disputes within 30 days.",
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
            Terms of Service
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xl">
            Please read these terms carefully before using our services. By
            shopping with us, you agree to the conditions outlined below.
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

        {/* Sections */}
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
            Questions about these terms?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
            Our support team is here to help. We aim to respond to all legal
            inquiries within 2 business days.
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
          <a href="/privacy" className="hover:text-gray-400 transition-colors">
            Privacy Policy
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

export default TermsOfService;
