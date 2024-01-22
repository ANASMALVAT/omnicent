"use client"

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import Link from "next/link";
import {ArrowRight} from "lucide-react"
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {motion} from "framer-motion"
import { useInView } from 'react-intersection-observer';

export default function Home() {

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    initial: { x: '-100%' }, // Off-screen to the left
    animate: { x: 0 } // On-screen
  };

  const imageVariantsRight = {
    initial: { x: '100%' }, // Off-screen to the left
    animate: { x: 0 } // On-screen
  };

  const imageTransition = {
    duration: 1, // Animation duration in seconds
    ease: "easeInOut" // Easing function, you can use other easing functions as well
  };

  const sentenceVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1, // Optional delay before the typewriter effect starts
        type: 'spring', // You can use other transition types like "tween", "spring", etc.
        stiffness: 100,
      },
    },
  };

  return (
    <><MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center  bg-[#3971EC]">

      <motion.h1 
        initial="initial"
        animate="animate"
        variants={sentenceVariants}
        className="max-w-4xl text-5xl text-center font-bold md:text-6xl lg:text-7xl text-zinc-200">
        Chat with your <span className="text-orange-300">PDF</span> like human.
      </motion.h1>

      <motion.p
        initial="initial"
        animate="animate"
        variants={sentenceVariants}
        className="mt-10 max-w-prose text-zinc-200 sm:text-lg">
          Omnicent allows you to interact with your PDF documents. Simply upload your file and start asking questions.
      </motion.p>

      <Link className={buttonVariants({
        size:"lg",
        className:" hover:bg-white   mt-5 z-10  text-zinc-900 bg-zinc-200  transition-opacity duration-1000"
      })}
       href={""} target="_blank">
        Get started <ArrowRight className=" text-zinc-900 ml-2 h-5 w-5"></ArrowRight>
      </Link>
    </MaxWidthWrapper>

    <div>
      <div className=" relative isolate">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80  ">
          <div 
          style={{
            clipPath:"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
          className=" relative left-[calc(50%-11rem)] aspect-[1155/678] w-[46.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f12711] to-[#1fddff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      <div>
        <motion.div
        initial="initial"
        animate="animate"
        variants={imageVariants}
        transition={imageTransition}
        className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24 ">
            <div className=" -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg-m-4 lg:rounded-2xl lg:p-4 ">
              <Image
                src={"/dashboard-preview.jpg"}
                alt=""
                width={1364}
                height={866}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 shadow-2xl ring-1 ring-gray-900/10"
              ></Image>
            </div>
          </div>
        </motion.div>
        <div>
          <div className=" relative isolate">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80  ">
              <div 
              style={{
                clipPath:"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
              className=" relative right-[calc(50%-13rem)] aspect-[1155/678] w-[46.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1fddff] to-[#f12711] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className=" mx-auto mb-32 mt-21 max-w-5xl sm:mt-56">
      <div className="mb-12 px-6 lg:px-8">
        <div className=" mx-auto max-w-2xl sm:text-center">
            <motion.h2
            initial="initial"
            ref={ref}
            animate={inView ? "animate" : "initial"}
            variants={sentenceVariants}
            className="mt-2 font-bold text-4xl text-zinc-200 sm:text-5xl">
              Talk to PDF in minutes
            </motion.h2>
            <motion.p 
              initial="initial"
              ref={ref}
              animate={inView ? "animate" : "initial"}
              variants={sentenceVariants} className="mt-4 text-lg text-zinc-200">
              Interact with your PDF like google search with omnicent.
            </motion.p>
        </div>
      </div> 
      <motion.ol
      initial="initial"
      ref={ref}
      animate={inView ? "animate" : "initial"}
      variants={sentenceVariants}
      className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
        <li className=" md:flex-1">
          <div  className=" flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0  md:pl-0 md:pt-4"> 
          <span className=" text-lg font-medium text-zinc-200"> Step 1</span>
          <span className=" text-[15px] font-medium text-zinc-200"> Sign up for an account</span>
          <span className=" mt-2 text-zinc-300"> Check out our demo and choose your {' '}  <br></br><Link href={"/pricing"} className="text-blue-500 underline underline-offset-2"> pro plan</Link></span>
          </div>
        </li>
        <li className=" md:flex-1">
          <div  className=" flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0  md:pl-0 md:pt-4"> 
          <span className=" text-lg font-medium text-zinc-200"> Step 2</span>
          <span className=" text-[15px] font-medium text-zinc-200"> Upload your PDF file</span>
          <span className=" mt-2 text-zinc-300"> We&apos;ll process your file and make it ready for you to interact with.</span>
          </div>
        </li>
        <li className=" md:flex-1">
          <div  className=" flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0  md:pl-0 md:pt-4"> 
          <span className=" text-lg font-medium text-zinc-200"> Step 3</span>
          <span className=" text-[15px] font-medium text-zinc-200"> It&apos; that simple. Try out omniGPT today.</span>
          <span className=" mt-2 text-zinc-300"> It really takes less than a minute.</span>
          </div>
        </li>
      </motion.ol>

      <motion.div
        initial="initial"
        animate={inView ? "animate" : "initial"}
        ref={ref}
        variants={imageVariantsRight}
        transition={imageTransition}
        className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24 ">
            <div className=" -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg-m-4 lg:rounded-2xl lg:p-4 ">
              <Image
                src={"/file-upload-preview.jpg"}
                alt=""
                width={1364}
                height={866}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 shadow-2xl ring-1 ring-gray-900/10"
              ></Image>
            </div>
          </div>
        </motion.div>

    </div>

    </>
  )
}
