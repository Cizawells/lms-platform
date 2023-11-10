"use client"

import { isTeacher } from "@/lib/teacher";
import { UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "./search-input";
import { Button } from "./ui/button";


const NavbarRoutes = () => {
    const { userId } = useAuth()
    const pathName = usePathname();
    const router = useRouter()
    
    const isTeacherPage = pathName?.startsWith("/teacher");
    const isPlayerPage = pathName?.includes("/courses");
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
              ) : isTeacher(userId) ? (
                      <Link href="/teacher/courses">
                          <Button size="sm" variant="ghost">
                              Teacher mode
                          </Button>
                      </Link>
              ) : null
          }
          <UserButton afterSignOutUrl="/"/>
    </div>
      </>
  )
}

export default NavbarRoutes