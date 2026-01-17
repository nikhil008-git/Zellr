"use client"
import { Tabs } from "@/components/ui/vercel-tabs"
import Link from "next/link"
import { ToggleTheme } from "@/components/ui/toggle-theme";

const tabs = [
  { id: "overview", href: '/dashboard', label: "Overview" },
  { id: "home", href: '/', label: "home" },
  { id: "blog", href: '/architecture', label: "blog" },
  { id: "vercel's blog", href: 'vercel-blog', label: "vercel's blog" },
]

export function DashNav() {
  return (
    <div>
      <div className="mt-5 fixed top-0 cursor-pointer backdrop-blur-md ml-10 ">  V /   rajpurohitnikhil008@gmail.com</div>
    <div className="flex font-mono justify-start items-center w-full fixed top-0 mt-12 ml-10 p-1  ">
      
      <Tabs
        tabs={tabs}
        onTabChange={(tabId) => console.log(`Tab changed to: ${tabId}`)}
      />
                          

    </div>
    {/* <div className="fixed top-0"><ToggleTheme /></div> */}
    </div>
  )
}