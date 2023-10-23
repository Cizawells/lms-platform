"use client"

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "./search-input";
import { Button } from "./ui/button";


const NavbarRoutes = () => {
    const pathName = usePathname();
    const router = useRouter()
    
    const isTeacherPage = pathName?.startsWith("/teacher");
    const isPlayerPage = pathName?.includes("/chapter");
    const isSearchPage = pathName === "/search"
    return (
      <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
      )}
      <div className="flex gap-x-2 ml-auto">
          {
              isTeacherPage || isPlayerPage ? (
                  <Button size="sm" variant="ghost">
                      <LogOut className="h-4 w-4 mr-2"/>
                  </Button>
              ) : (
                      <Link href="/teacher/courses">
                          <Button size="sm" variant="ghost">
                              Teacher mode
                          </Button>
                      </Link>
              )
          }
          <UserButton afterSignOutUrl="/"/>
    </div>
      </>
  )
}

export default NavbarRoutes