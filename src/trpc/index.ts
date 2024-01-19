import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {publicProcedure, router} from "./trpc"
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const appRouter = router({

authCallBack: publicProcedure.query(async () => {
    const {getUser} = getKindeServerSession();
    const user = getUser();
    if(!user.id || !user.email){
        throw new TRPCError({code: "UNAUTHORIZED"})
    }

    const userDB = db.user.findFirst({
        where :{
            id:user.id
        }
    })
    if(!userDB){
        const res = await db.user.create({
            data :{
                id:user.id,
                email:user.email
            }
        })
    }

    return {success: true};
    })
})

export type AppRouter = typeof appRouter;