"use client"

import { trpc } from "@/app/_trpc/client"
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"
import { Loader2, MessageSquare } from "lucide-react"
import SingleMessage from "./SingleMessage"
import Skeleton from "react-loading-skeleton"
import { useContext } from "react"
import { ChatContext } from "@/app/context/ChatContext"

interface MessageProps {
    fileId: string
}


const Messages = ({fileId}: MessageProps) => {

    const {isLoading: isAiThinking} = useContext(ChatContext);

    const {data, isLoading, fetchNextPage} = trpc.getFileMessages.useInfiniteQuery({
        fileId,
        limit:INFINITE_QUERY_LIMIT
    },{
        getNextPageParam:(lastpage) => lastpage?.nextCursor,
        keepPreviousData:true
    })

    const messages = data?.pages.flatMap((page) => page.messages);
    
    const loadingMessage = 
    {
        createdAt: new Date().toISOString(),
        id: 'loading-message',
        isUserMessage: false,
        text: (
            <span className="flex h-full items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
            </span>
        )
    }

    const combinedMessages = [
        ...(isAiThinking ? [loadingMessage] : []),
        ...(messages ?? [])
    ]


    return(
        <div className='flex w-full max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
            {
                combinedMessages && combinedMessages.length > 0 ? 
                (

                    combinedMessages.map((message,i)=> {
                        const isNextMessageSamePerson = combinedMessages[i - 1]?.isUserMessage === combinedMessages[i]?.isUserMessage

                        if(i === combinedMessages.length - 1){
                            return <SingleMessage key={i} isNextMessageSamePerson={isNextMessageSamePerson} message={message} />
                        }else{
                            return <SingleMessage key={i} isNextMessageSamePerson={isNextMessageSamePerson} message={message} />
                        }
                    })
                ) : isLoading ?
                (   
                    <div className='w-full flex flex-col gap-2'>
                        <Skeleton className='h-16' />
                        <Skeleton className='h-16' />
                        <Skeleton className='h-16' />
                        <Skeleton className='h-16' />
                    </div>
                ) :

                (
                    <div className='flex-1 flex flex-col items-center justify-center gap-2'>
                    <MessageSquare className='h-8 w-8 text-blue-500' />
                        <h3 className='font-semibold text-xl'>
                        You&apos;re ready to chat!
                        </h3>
                        <p className='text-zinc-500 text-sm'>
                        Ask your first question to get started.
                        </p>
                  </div>
                )
            }
        </div>
    )
}
export default Messages;