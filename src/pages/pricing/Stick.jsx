import { FaArrowRightLong } from "react-icons/fa6"

export const Stick = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-[60px] font-bold flex justify-center py-6">Plans and features</h1>

      <div className="flex bg-white z-10 justify-end gap-2  shadow-white sticky top-0">
        <div className="w-[165px] p-2 flex flex-col gap-1">
          <h1 className="text-[18px] font-semibold">Free</h1>
          <p className="text-[#4b4e51] font-semibold text-[14px]">For individuals</p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 transition-colors duration-300 text-white w-full rounded-md py-1 cursor-pointer">
            Sign up
          </button>
        </div>
        <div className="w-[165px] p-2 flex flex-col gap-1">
          <h1 className="text-[18px] font-semibold">Plus</h1>
          <p className="text-[#4b4e51] font-semibold text-[14px]">10$ per seat/month</p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 transition-colors duration-300 text-white w-full rounded-md py-1 cursor-pointer">
            Get Started
          </button>
        </div>
        <div className="w-[165px] p-2 flex flex-col gap-1">
          <h1 className="text-[18px] font-semibold">Business</h1>
          <p className="text-[#4b4e51] font-semibold text-[14px]">15$ per seat/month</p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 transition-colors duration-300 text-white w-full rounded-md py-1 cursor-pointer">
            Get Started
          </button>
        </div>
        <div className="w-[165px] p-2 flex flex-col gap-1">
          <h1 className="text-[18px] font-semibold">Enterprise</h1>
          <a
            className="hover:text-blue-500 font-semibold flex items-center gap-3 text-[14px] w-fit"
            href="https://google.com"
          >
            Contact us <FaArrowRightLong />
          </a>
        </div>
      </div>


      <div>
        <h1 className="py-4 z-20 text-gray-500 font-semibold sticky top-0 text-[18px] ">Content</h1>
        <div className="border-b border-gray-300">
          <div className="grid border-b border-t border-gray-300 grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Pages & blocks
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Number of pages and blocks you can create
                </div>
              </div>
            </div>
            <div className="ml-67 gap-20 flex text-[#6E6E6D]">
              <div className="p-4 text-sm">Unlimited for individuals, limited block trial for 2+ members</div>
              <div className="p-4 text-sm">Unlimited</div>
              <div className="p-4 text-sm">Unlimited</div>
              <div className="p-4 text-sm">Unlimited</div>
            </div>
          </div>

          <div className="grid border-b border-gray-300 grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              File uploads
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Maximum file size for uploads
                </div>
              </div>
            </div>
            <div className="ml-67 gap-30 px-2 flex text-[#6E6E6D]">
              <div className="p-2 text-sm">Up to 5 MB</div>
              <div className="p-2 text-sm">Unlimited</div>
              <div className="p-2 text-sm">Unlimited</div>
              <div className="p-2 text-sm">Unlimited</div>
            </div>
          </div>

          <div className="border-b border-gray-300 grid grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Page history
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  How long we keep your page history
                </div>
              </div>
            </div>
            <div className="ml-67 gap-20 flex items-center text-[#6E6E6D]">
              <div className="p-4 text-sm">7 days</div>
              <div className="p-4 text-sm">30 days</div>
              <div className="p-4 text-sm">90 days</div>
              <div className="p-4 text-sm">Unlimited</div>
            </div>
          </div>

          <div className=" grid grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Page analytics
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Analytics and insights for your pages
                </div>
              </div>
            </div>
            <div className="ml-67 gap-21 flex text-[#6E6E6D]">
              <div className="p-4 text-[15px] font-semibold">Basic</div>
              <div className="p-4 text-[15px] font-semibold">Basic</div>
              <div className="p-4 text-[15px] font-semibold">Advanced</div>
              <div className="p-4 text-[15px] font-semibold">Advanced</div>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-11">
        <h1 className="z-20 py-4 text-gray-500 font-semibold sticky top-0 text-[18px] ">Shairing & Collaboration</h1>
        <div className="border-b border-gray-300">
          <div className="grid border-b border-gray-300 grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Pages & blocks
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Number of pages and blocks you can create
                </div>
              </div>
            </div>
            <div className="ml-67 gap-20 flex text-[#6E6E6D]">
              <div className="p-4 text-[15px] font-semibold">Unlimited for individuals, limited block trial for 2+ members</div>
              <div className="p-4 text-[15px] font-semibold">Unlimited</div>
              <div className="p-4 text-[15px] font-semibold">Unlimited</div>
              <div className="p-4 text-[15px] font-semibold">Unlimited</div>
            </div>
          </div>

          <div className="grid border-b border-gray-300 grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              File uploads
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Maximum file size for uploads
                </div>
              </div>
            </div>
            <div className="ml-67 gap-30 px-2 flex text-[#6E6E6D]">
              <div className="p-2 text-sm">Up to 5 MB</div>
              <div className="p-2 text-sm">Unlimited</div>
              <div className="p-2 text-sm">Unlimited</div>
              <div className="p-2 text-sm">Unlimited</div>
            </div>
          </div>

          <div className="border-b border-gray-300 grid grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Page history
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  How long we keep your page history
                </div>
              </div>
            </div>
            <div className="ml-67 gap-20 flex items-center text-[#6E6E6D]">
              <div className="p-4 text-sm">7 days</div>
              <div className="p-4 text-sm">30 days</div>
              <div className="p-4 text-sm">90 days</div>
              <div className="p-4 text-sm">Unlimited</div>
            </div>
          </div>

          <div className="border-b border-gray-300 grid grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Page analytics
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Analytics and insights for your pages
                </div>
              </div>
            </div>
            <div className="ml-67 gap-21 flex text-[#6E6E6D]">
              <div className="p-4 text-sm">Basic</div>
              <div className="p-4 text-sm">Basic</div>
              <div className="p-4 text-sm">Advanced</div>
              <div className="p-4 text-sm">Advanced</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-11">
        <h1 className="z-20 py-4 text-gray-500 font-semibold sticky top-0 text-[18px] ">Manage work & time</h1>
        <div className="border-b border-gray-300">
          <div className="grid border-b border-gray-300 grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Pages & blocks
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Number of pages and blocks you can create
                </div>
              </div>
            </div>
            <div className="ml-67 gap-20 flex text-[#6E6E6D]">
              <div className="p-4 text-[15px] font-semibold">Unlimited for individuals, limited block trial for 2+ members</div>
              <div className="p-4 text-[15px] font-semibold">Unlimited</div>
              <div className="p-4 text-[15px] font-semibold">Unlimited</div>
              <div className="p-4 text-[15px] font-semibold">Unlimited</div>
            </div>
          </div>

          <div className="grid border-b border-gray-300 grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              File uploads
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Maximum file size for uploads
                </div>
              </div>
            </div>
            <div className="ml-67 gap-30 px-2 flex text-[#6E6E6D]">
              <div className="p-2 text-sm">Up to 5 MB</div>
              <div className="p-2 text-sm">Unlimited</div>
              <div className="p-2 text-sm">Unlimited</div>
              <div className="p-2 text-sm">Unlimited</div>
            </div>
          </div>

          <div className="border-b border-gray-300 grid grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Page history
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  How long we keep your page history
                </div>
              </div>
            </div>
            <div className="ml-67 gap-20 flex items-center text-[#6E6E6D]">
              <div className="p-4 text-sm">7 days</div>
              <div className="p-4 text-sm">30 days</div>
              <div className="p-4 text-sm">90 days</div>
              <div className="p-4 text-sm">Unlimited</div>
            </div>
          </div>

          <div className="border-b border-gray-300 grid grid-cols-[200px_repeat(4,165px)]">
            <div className="font-semibold flex items-center gap-2">
              Page analytics
              <div className="relative group">
                <div className="cursor-help">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded z-10">
                  Analytics and insights for your pages
                </div>
              </div>
            </div>
            <div className="ml-67 gap-21 flex text-[#6E6E6D]">
              <div className="p-4 text-sm">Basic</div>
              <div className="p-4 text-sm">Basic</div>
              <div className="p-4 text-sm">Advanced</div>
              <div className="p-4 text-sm">Advanced</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

