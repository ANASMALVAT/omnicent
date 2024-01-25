import MaxWidthWrapper from "./maxWidthWrapper"
import Link from "next/link"
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server"
import {LoginLink } from "@kinde-oss/kinde-auth-nextjs/server"

import { buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react"
export const Navbar = () => {
    return (
        <nav className=" sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/90  backdrop-blur-lg transition-all ">
            <MaxWidthWrapper>
                <div className=" flex h-14 items-center justify-between border-b border-zinc-200">
                        <Link href={"/"}
                        className="flex text-gray-950  z-40 font-semibold">
                            <span>omnicent</span>
                        </Link>
                    <div className="  items-center space-x-4 sm:flex">
                        <>
                        <Link href={"/pricing"}
                        className={buttonVariants({
                        variant:"ghost",
                        size:"sm"
                        })}
                        >
                        Pricing
                        </Link>
                        <LoginLink 
                        
                        className={buttonVariants({
                        variant:"ghost",
                        size:"sm"
                        })}
                        >
                            Sign in
                        </LoginLink>
                        <RegisterLink 
                        className={buttonVariants({
                        size:"sm"
                        })}
                        >
                        Get Started <ArrowRight className=" ml-2 h-5 w-5"></ArrowRight>
                        </RegisterLink>
                     </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}