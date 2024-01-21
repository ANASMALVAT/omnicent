"use client"

import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { useState } from "react";
import { Button } from "./button";

import Dropzone from "react-dropzone"
import { File, Cloud } from "lucide-react";
import { Progress } from "./progress";


const UploadDropZone = () => {

    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const startSimulatedProgress = () => {
        setUploadProgress(0)
    
        const interval = setInterval(() => {
          setUploadProgress((prevProgress) => {
            if (prevProgress >= 90) {
              clearInterval(interval)
              return prevProgress
            }
            return prevProgress + 5
          })
        }, 500)
    
        return interval
      }
    
    return  <Dropzone multiple={false} onDrop={(acceptedFiles) => { 
        
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();
        clearInterval(progressInterval);
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
                                    <Progress value={50} className=" " />
                                </div>
                            ):(
                                <div></div>
                            )}

                        </div>

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