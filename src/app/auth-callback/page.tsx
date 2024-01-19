"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

const Page = async () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');

    trpc.authCallBack.useQuery(undefined,{
        onSuccess: (data) => {
            if(data.success){
                router.push(origin? `/${origin}` : "/dashboard")
                
            }
        },
        onError: (err) => {
            if(err.data?.code === 'UNAUTHORIZED'){
                router.push("/sign-in");
            }
        },
        retry:true,
        retryDelay:500,
    })

    return (
        <div className=" w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-200"></Loader2>
                <h3 className=" font-semibold text-xl"> Setting up your account....</h3>
                <p>you will be redirected automatically!</p>
            </div>
        </div>
    )
}

export default Page;