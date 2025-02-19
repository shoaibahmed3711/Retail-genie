import React from 'react'
import { BsSlack, BsCheck } from "react-icons/bs"
import { FaGoogle } from "react-icons/fa"
import { IoColorPaletteOutline } from "react-icons/io5"
import { HiCode } from "react-icons/hi"
import { BiTable } from "react-icons/bi"
import { MdOutlineEdit } from "react-icons/md"
import { TbWorldCode } from "react-icons/tb"
import { RiFileTextLine } from "react-icons/ri"

export const Notion = () => {
  const features = [
    { text: "Connect apps like Slack & Google Drive", beta: true },
    { text: "Limit the AI's search to your trusted sources" },
    { text: "Generate and edit text in any doc" },
    { text: "Autofill databases with summaries & insights" },
    { text: "Chat about anything using GPT-4 & Claude" },
  ]

  const aiCapabilities = [
    { icon: "✍️", text: "Summarize" },
    { icon: "💡", text: "Brainstorm ideas" },
    { icon: <HiCode className="w-5 h-5" />, text: "Get help with code" },
    { icon: <RiFileTextLine className="w-5 h-5" />, text: "Make a flowchart" },
    { icon: <BiTable className="w-5 h-5" />, text: "Make a table" },
    { icon: <MdOutlineEdit className="w-5 h-5" />, text: "Draft a meeting agenda" },
    { icon: <TbWorldCode className="w-5 h-5" />, text: "Translate" },
    { icon: <IoColorPaletteOutline className="w-5 h-5" />, text: "Improve writing" },
    { icon: <FaGoogle className="w-4 h-4" />, text: "Find in Google Drive" },
    { icon: <BsSlack className="w-4 h-4" />, text: "Find in Slack" },
  ]

  return (
    <div className="rounded-md p-6 mt-15 bg-[#F6F5F4]">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="flex gap-1">
              <span className="w-4 h-4 bg-blue-500 rounded"></span>
              <span className="w-4 h-4 bg-green-500 rounded"></span>
              <span className="w-4 h-4 bg-gray-500 rounded"></span>
            </span>
            Now with AI connectors
          </div>

          <h1 className="text-4xl font-bold mb-4">Retail Ginue</h1>
          <p className="text-lg mb-2">
            Add to your workspace for $8 per member/month, billed annually.
          </p>
          <p className="text-gray-600 mb-8">
            $10 per member/month billed monthly.
          </p>

          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <BsCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-[15px]">
                  {feature.text}
                  {feature.beta && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      Beta
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 cursor-pointer transition-colors font-medium">
              Get started
            </button>
            <button className="bg-white text-gray-800 px-6 py-2 rounded-md border border-gray-200 hover:bg-gray-200 cursor-pointer transition-colors font-medium">
              Read AI FAQ
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {aiCapabilities.map((capability, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span className="text-xl flex items-center justify-center w-6">
                  {typeof capability.icon === "string" ? capability.icon : capability.icon}
                </span>
                <span className="text-gray-700 text-[15px]">{capability.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}