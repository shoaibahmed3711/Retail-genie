"use client"

import { useState } from "react"
import { FiPlus, FiMinus } from "react-icons/fi"

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How much usage is included with the Retail Ginue add-on plan?",
      answer:
        "The Retail Ginue add-on plan includes comprehensive AI features with flexible usage limits. Contact our sales team for specific details about enterprise usage requirements.",
    },
    {
      question: "Is there a free trial for Retail Ginue?",
      answer:
        "Yes, Notion offers a trial period for AI features so you can test the capabilities before committing to a subscription.",
    },
    {
      question: "How does Retail Ginue use my data?",
      answer:
        "Retail Ginue processes your data securely and in compliance with our privacy policy. Your data is used only to provide AI features and improve the service.",
    },
    {
      question: "Can I purchase Retail Ginue for only part of my team, without purchasing for the entire workspace?",
      answer:
        "Yes, you can selectively assign Retail Ginue access to specific team members without requiring workspace-wide deployment.",
    },
    {
      question: "How do I get charged when I add members to my workspace?",
      answer:
        "Charges are prorated based on when members are added to your workspace. You'll only pay for the time remaining in your billing cycle.",
    },
    {
      question: "Where can I find my invoices?",
      answer: "You can find your invoices in your workspace settings under the Billing & Plans section.",
    },
    {
      question: "What are your accepted payment methods?",
      answer:
        "We accept major credit cards, debit cards, and various payment methods including PayPal for business accounts.",
    },
    {
      question: "What happens when I go over the block storage limit on a Free Plan?",
      answer:
        "When you exceed the block storage limit on a Free Plan, you'll need to either upgrade to a paid plan or remove content to continue adding new blocks.",
    },
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="border-b border-gray-300">
    <div className="max-w-7xl mx-auto  py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Questions & answers</h1>

      <div className="space-y-1 ">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full py-4 flex justify-between items-center text-left hover:text-gray-600 transition-colors"
            >
              <span className="text-base font-medium pr-8">{faq.question}</span>
              {openIndex === index ? (
                <FiMinus className="flex-shrink-0 h-5 w-5" />
              ) : (
                <FiPlus className="flex-shrink-0 h-5 w-5" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96 pb-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>


    <div className="flex justify-center py-6 mb-4">
        <h1 className=" w-[250px] text-[#5E5E5E] text-[18px] font-semibold">Still have more questions?
        Learn more in our <a className="hover:text-blue-600" href="https://joinpakarmy.gov.pk"><u>help center.</u></a></h1>
    </div>
    </div>
  )
}

