"use client"


import { ChevronDown, ChevronUp, Loader2, ZoomIn, ZoomOut} from "lucide-react";
import {Document, Page,pdfjs} from "react-pdf";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useToast } from "./ui/use-toast";
import {useResizeDetector} from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import {useForm} from "react-hook-form"
import {  z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils";
import SimpleBar from "simplebar-react";

import "simplebar-react/dist/simplebar.min.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps{
    url:string
}



const PdfRenderer = ({url}: PdfRendererProps) => {

    const [numPages,setNumPages] = useState<number>();
    const [currentPage,setCurrentPage] = useState<number>(1);
    const [scale,setScale] = useState<number>(1);
    const {toast} = useToast();
    const {width ,ref} = useResizeDetector();

    


    
    const CustomPageValidator = z.object({
        page:z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages! )
    })
    
    type TCustomPageValidator = z.infer<typeof CustomPageValidator>

    const {register,handleSubmit,setValue,formState:{errors},} = useForm<TCustomPageValidator>({
        defaultValues:{
            page:"1"
        },resolver: zodResolver(CustomPageValidator)
    })

    const handlePageSubmit = ({page}: TCustomPageValidator) => {
        setCurrentPage(Number(page));
        setValue("page",String(page));
    }

    const callZoomIn = () => {
        if(scale < 2){
            setScale(scale => scale + 0.25);
        }
    }
    const callZoomOut = () => {
        if(scale > 1){
            setScale(scale => scale - 0.25);
        }
    }

    const decrementCurrentPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage => currentPage - 1);
        }
    }

    const incrementCurrentPage = () => {
        if(currentPage < numPages! ){
            setCurrentPage(currentPage => currentPage + 1);
        }
    }

    return (
        <div className=" w-full bg-[#F5F5F5]] rounded-md shadow flex flex-col items-center">
            <div className=" h-14 w-full border-b border-zinc-200 flex items center justify-between">
                <div className='flex items-center gap-2'>
                    <Button disabled={currentPage === numPages!}  onClick={incrementCurrentPage} variant="ghost" arial-label="previous page" className=" h-8 hover:bg-transparent border border-zinc-500 hover:border hover:border-zinc-200 hover:text-zinc-100"  >
                        <ChevronDown className="h-4 w-4 text-zinc-200 font-semibold " />
                    </Button>

                    <div className="flex items-center gap-2 ml-1 mr-1">
                        <Input {...register("page")} 
                        className={cn("w-12 h-8",errors.page && "focus-visible:ring-red-900")}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                handleSubmit(handlePageSubmit)();
                            }
                        }}
                        />
                    </div>
                    <p className=" text-zinc-200 text-lg space-x-1 mr-1">
                        <span>/</span>
                        <span>{numPages ?? "x"}</span>
                    </p>

                    <Button disabled={currentPage <= 1} onClick={decrementCurrentPage} variant="ghost" arial-label="next page" className=" h-8 hover:bg-transparent border border-zinc-500 hover:border hover:border-zinc-200 hover:text-zinc-100"  >
                        <ChevronUp className="h-4 w-4 text-zinc-200 font-semibold " />
                    </Button>
                </div>

                <div  className=" w-20  flex gap-2 justify-center items-center h-full">
                    <Button disabled={scale === 2} onClick={callZoomIn} variant="ghost" className=" my-auto h-8 hover:bg-transparent border border-zinc-500 hover:border p-2 py-1 hover:border-zinc-200 hover:text-zinc-100">
                        <ZoomIn className=" text-zinc-200 w-4 h-4" />
                    </Button>
                    <Button disabled={scale === 1} onClick={callZoomOut} variant="ghost" className="my-auto h-8 hover:bg-transparent border border-zinc-500 hover:border p-2 py-1 hover:border-zinc-200 hover:text-zinc-100">
                        <ZoomOut   className="  text-zinc-200 w-4 h-4" />
                    </Button>

                </div>
            </div>

        <div className=" flex-1  w-full max-h-screen ">
            <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
                <div ref={ref}>
                    <Document
                    file={url} 
                    loading={
                        <div className=" flex justify-center">
                            <Loader2  className="my-24 h-6 w-6 animate-spin"/>
                        </div>
                    } 
                    onLoadError={
                        () => {
                            toast({
                                title:"Error Loading file",
                                description:"Please try again later",
                                variant: "destructive"
                            })
                        }
                    }
                    onLoadSuccess={({numPages}) => setNumPages(numPages)}
                    className="max-h-full ">
                        <Page  scale={scale} width={width ? width : 1} pageNumber={currentPage} />
                    </Document>
                </div>
            </SimpleBar>
        </div>

        </div>
    )
}

export default PdfRenderer;