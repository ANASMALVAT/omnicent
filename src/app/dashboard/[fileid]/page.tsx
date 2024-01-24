import ChatWrapper from "@/components/chat/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";



interface pageProps {
    params :{
        fileid: string
    }
}

const Page = async ({params} : pageProps) => {

    const {fileid} = params;

    const {getUser} = getKindeServerSession();

    const user = getUser();

    if(!user || !user.id){
        redirect(`/auth-callback?origin=dashboard/${fileid}`)
    }

    const file =  await db.file.findFirst({
        where:{
            id:fileid,
            userId:user.id
        }
    })

    if(!file) notFound();

    return (
        <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
        <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
          <div className='flex-1 xl:flex'>
            <div className='px-2 py-3 sm:px-2 lg:pl-3 xl:flex-1 xl:pl-3'>
              <PdfRenderer url={file.url} />
            </div>
          </div>
  
          <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
            <ChatWrapper fileId={file.id} />
          </div>
        </div>
      </div>
    )

}

export default Page;