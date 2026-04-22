import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null); // ✅ Define state

  const faqs = [
    {
      question: "Is LawgicAI a lawyer?",
      answer:
        "No, LawgicAI is an AI assistant that provides legal information and guidance. While highly accurate, it's not a substitute for professional legal advice. Always consult a qualified lawyer for complex legal matters.",
    },
    {
      question: "Is the advice legally binding?",
      answer:
        "No, LawgicAI provides informational guidance based on legal knowledge, but it's not legally binding advice. For official legal counsel that can be used in court or for formal proceedings, consult a licensed attorney.",
    },
    {
      question: "How is my data handled?",
      answer:
        "We take privacy seriously. All conversations are encrypted, and we never share your data with third parties. You can delete your conversation history at any time, and we comply with all data protection regulations.",
    },
    {
      question: "What types of legal questions can LawgicAI answer?",
      answer:
        "LawgicAI can help with a wide range of legal topics including contract law, business compliance, intellectual property, employment law, consumer rights, and more. It's trained on Indian legal databases for local relevance.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! You can try LawgicAI for free with limited queries per month. Our paid plans offer unlimited access, priority support, and advanced features like document analysis and legal research tools.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about LawgicAI</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="fade-in border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setActiveAccordion(activeAccordion === index ? null : index)
                }
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform ${
                    activeAccordion === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
