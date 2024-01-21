"use client"

import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { useState } from "react";
import { Button } from "./button";

import Dropzone from "react-dropzone"
import { Cloud } from "lucide-react";


const UploadDropZone = () => {
    return  <Dropzone multiple={false} onDrop={(acceptedFiles) => {

        console.log(acceptedFiles);
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