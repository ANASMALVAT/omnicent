"use client"


import { ChevronDown, ChevronUp, Loader2, RotateCw, Search} from "lucide-react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from './ui/dropdown-menu'

import PdfFullscreen from "./pdfFullScreen";

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
    const [rotation, setRotation] = useState<number>(0);

    const CustomPageValidator = z.object({
        page:z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages! )
    })
    
    type TCustomPageValidator = z.infer<typeof CustomPageValidator>

    const {register,handleSubmit,setValue,formState:{errors},} = useForm<TCustomPageValidator>({
        defaultValues:{
            page:currentPage.toString()
        },resolver: zodResolver(CustomPageValidator)
    })

    const handlePageSubmit = ({page}: TCustomPageValidator) => {
        setCurrentPage((prev) => { return Number(page)});
        setValue("page",String(page));
    }


    const decrementCurrentPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage => currentPage - 1);
            setValue("page",String(currentPage - 1));
        }
    }


    const incrementCurrentPage = () => {
        if(currentPage < numPages! ){
            setCurrentPage(currentPage => currentPage + 1);
            setValue("page",String(currentPage + 1));
        }
    }

    return (
        <div className=" w-full bg-[#F5F5F5] p-4 rounded-md shadow flex flex-col items-center">
            <div className=" h-14 w-full border-b border-zinc-200 flex items center justify-between">
                <div className='flex items-center gap-2'>
                    <Button disabled={currentPage === numPages!}  onClick={incrementCurrentPage} variant="ghost" arial-label="previous page" className=" h-8 hover:bg-transparent border border-zinc-500 hover:border  hover:border-zinc-800 hover:text-zinc-100"  >
                        <ChevronDown className="h-4 w-4 text-zinc-900 text-lg font-semibold " />
                    </Button>

                    <div className="flex items-center gap-2 ml-1 mr-1">
                        <Input {...register("page")} 
                        className={cn("w-12 h-8 bg-transparent border-zinc-500 text-[16px] hover:border-zinc-800 text-zinc-800",errors.page && "focus-visible:ring-red-900")}
                        onKeyDown={(e) => {

                            if(e.key === "Enter"){
                                handleSubmit(handlePageSubmit)();
                            }
                        }}
                        >
                        </Input>
                    </div>
                    <p className=" text-zinc-950 text-[16px] space-x-1 mr-1 ">
                        <span>/</span>
                        <span>{numPages ?? "x"}</span>
                    </p>

                    <Button disabled={currentPage <= 1} onClick={decrementCurrentPage} variant="ghost" arial-label="next page" className=" h-8 hover:bg-transparent border border-zinc-500 hover:border hover:border-zinc-900 hover:text-zinc-100"  >
                        <ChevronUp className="h-4 w-4 text-zinc-900 font-semibold " />
                    </Button>
                </div>

                <div  className="  flex gap-2 justify-center items-center h-full">
                    
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button
                        className='gap-1.5 border border-gray-500 hover:border-gray-900 h-8 text-gray-700 ring-0 hover:bg-transparent hover:text-zinc-900  hover:bg-none'
                        aria-label='zoom'
                        variant='ghost'>
                        <Search className='h-4 w-4' />
                        {scale * 100}%
                        <ChevronDown className='h-3 w-3 opacity-50 text-gray-200' />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem
                        onSelect={() => setScale(1)}>
                        100%
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => setScale(1.25)}>
                        125%
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => setScale(1.5)}>
                        150%
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => setScale(2)}>
                        200%
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                    
                <Button onClick={() => setRotation(rotation => rotation + 90)} variant="ghost" className=" my-auto h-8 hover:bg-transparent border border-zinc-500 hover:border p-2 py-1 hover:border-zinc-900 hover:text-zinc-900">
                    <RotateCw  className="  text-zinc-800 w-4 h-4"/>
                </Button>

                <PdfFullscreen fileUrl={url} />

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
                        <Page rotate={rotation} scale={scale} width={width ? width : 1} pageNumber={currentPage} />
                    </Document>
                </div>
            </SimpleBar>
        </div>

        </div>
    )
}

export default PdfRenderer;