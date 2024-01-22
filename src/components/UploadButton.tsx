"use client"

import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone"
import { File, Cloud , Loader2} from "lucide-react";
import { Progress } from "./ui/progress";
import {useUploadThing} from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";


const UploadDropZone = () => {

    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const {toast} = useToast(); 
    const router = useRouter();
    const {startUpload} = useUploadThing("pdfUploader");


    const {data: fileCount,  isLoading} =  trpc.getUserFilesCount.useQuery();


    const {mutate: startPolling} = trpc.getFile.useMutation({
        onSuccess :(file) => {
            router.push(`/dashboard/${file.id}`)
        },
        retry:true,
        retryDelay: 750
    })

    const startSimulatedProgress = () => {
        setUploadProgress(0)
        const interval = setInterval(() => {
          setUploadProgress((prevProgress) => {
            if (prevProgress >= 95) {
              clearInterval(interval)
              return prevProgress
            }
            return prevProgress + 5
          })
        }, 500)
        return interval
    }

    const fileUploadLimit = () => {
        return toast({
            title:"Reached the file upload limit",
            description:"You can upload only 10 files, please delete previous files to upload new.",
            variant:"destructive"
        })
    }

    const uploadIssue = () => {
        return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant:"destructive"
        })
    }
    
    return  <Dropzone multiple={false} onDrop={async (acceptedFiles) => { 
        
        if(fileCount! >= 10){
            fileUploadLimit();
            return null;
        }

        setIsUploading(true);
        const progressInterval = startSimulatedProgress()

        const res = await startUpload(acceptedFiles);
        
        if(!res){
            uploadIssue();
        }

        const [fileResponse] = res!;


        const key = fileResponse?.key;

        if(!key){
            uploadIssue();
        }

        clearInterval(progressInterval)
        setUploadProgress(100);
        startPolling({key});
        
        }} >
            
             {({getRootProps,getInputProps, acceptedFiles}) => (
                <div
                {...getRootProps()}
                className='border h-64 m-4 border-dashed border-gray-300 rounded-lg'
                >
                    <div className='flex items-center justify-center h-full w-full'>
                        <label
                        htmlFor='dropzone-file'
                        className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
                        >
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <Cloud className=" mb-2 text-sm text-zinc-700" />
                            <p className='mb-2 text-sm text-zinc-700'>
                            <span className='font-semibold'>
                            Click to upload
                            </span>{' '}
                            or drag and drop
                            </p>
                            <p className="text-xs text-zinc-500">PDF up to 4MB</p>
                            {
                            acceptedFiles && acceptedFiles[0] ? (
                                <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x mt-2 divide-zinc-200'>
                                    <div className='px-3 py-2 h-full grid place-items-center'>
                                        <File className='h-4 w-4 text-blue-500' />
                                    </div>
                                    <div className='px-3 py-2 h-full text-sm truncate'>
                                        {acceptedFiles[0].name}
                                    </div>
                                </div>
                            ) : (null) }

                            {isUploading ? (
                                <div className=" w-full mt-4 max-w-xs mx-auto">
                                    <Progress value={uploadProgress} className=" " />
                                </div>
                            ):(
                                null
                            )}
                            {
                            uploadProgress === 100 ?
                                (
                                    <div className=" flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2  ">
                                        <Loader2 className=" w-3 h-3 animate-spin" />
                                    </div>
                                )
                                :
                                (null)
                            }
                        </div>
                        {/* <input 
                        {...getInputProps()}
                            type="file"
                            id="dropzone-file"
                            className="hidden"
                        >
                        </input> */}
                        </label>
                    </div>
                </div>
             )}
            </Dropzone>
}

const UploadButton = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <Dialog  
            
            open={isOpen}
            onOpenChange={(v) => {
            if(!v){
                 setIsOpen(v);
            }
        }}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button  > Upload PDF</Button>
            </DialogTrigger>

            <DialogContent className=" bg-white">
                <UploadDropZone />
            </DialogContent>
        </Dialog>
    )

}

export default UploadButton;