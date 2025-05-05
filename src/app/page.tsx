"use client";

import Image from "next/image";
import coverImage from "@/assets/cover-image.jpg";
import Navbar from "./navbar";
import Globe from "@/components/globe";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { BentoDemo } from "./bentogrid";
import { TimelineDemo } from "./timeline-final";
import { RippleDemo } from "@/components/magicui/final-ripple";
import ContactFormPreview from "./contact-form";
import FooterSection from "@/components/sections/footer/default";
import { LineShadowTextDemo } from "@/components/text-wrapper";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-black">
      {/* Hero Section */}
      <div className="relative w-full h-[90vh]">
        {/* Background Image */}
        <Image
          src={coverImage}
          alt="Background"
          fill
          priority
          className="object-cover brightness-50"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />

        {/* Navbar floating on top */}
        <div className="fixed top-0 left-0 w-full z-30 px-4 sm:px-6">
          <Navbar />
        </div>

        {/* Hero Text */}
        <div className="relative z-20 min-h-full flex flex-col lg:flex-row items-center justify-center lg:justify-around sm:justify-end gap-10 lg:pl-11 pl-0 pt-32 lg:pt-0">
          <div className="flex flex-col lg:items-start items-center justify-center max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tighter md:text-7xl sm:text-6xl">
              Redefining <AuroraText>Reach</AuroraText>
            </h1>
            <p className="text-white/70 mt-2 text-sm sm:text-xl max-w-2xl mb-5 sm:mb-10 lg:text-left text-center">
              Unified platform for customer journeys across voice, chat, and
              mail.
            </p>
            <div>
              <Link href={"/login"}>
              <RainbowButton className="text-md sm:text-xl md:text-2xl px-4 py-4 sm:px-7 rounded-full font-bold hover:cursor-pointer hover:scale-105 transition-all duration-700">
                {" "}
                Get Started{" "}
              </RainbowButton>
              </Link>
            </div>
          </div>
          <div className="transition-all duration-700 ease-in-out">
            <Globe className="w-[300px] xs:w-[350px] sm:w-[400px] lg:w-[600px]" />
          </div>
        </div>
      </div>

      {/* Animation Section */}
      <div className="w-full bg-black px-4 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mb-24 sm:mb-40  md:mb-54">
          <h1 className="text-4xl font-bold tracking-tighter md:text-[48px] sm:text-5xl mt-[-50px] sm:mt-0 mb-15 text-center">
            Powerful Features, Integrated Seamlessly
          </h1>
          <BentoDemo />
        </div>

        <div className="w-full max-w-7xl overflow-hidden">
          <div className="flex items-center justify-center md:-mb-16">
            <LineShadowTextDemo />
          </div>
          <div>
            <TimelineDemo />
          </div>
        </div>

        <div className="w-full max-w-7xl mt-20 px-4 sm:px-6">
          <div className="flex flex-col-reverse lg:flex-row-reverse rounded-2xl shadow-md bg-muted overflow-hidden">
            {/* Contact Form */}
            <div className="w-full lg:w-1/2 p-0 sm:p-6 md:p-10 flex items-center">
              <ContactFormPreview />
            </div>

            {/* Ripple */}
            <div className="w-full lg:w-1/2 p-0 sm:p-6 md:p-10 flex items-center">
              <RippleDemo />
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mt-10 px-4 sm:px-6 bg-black">
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
