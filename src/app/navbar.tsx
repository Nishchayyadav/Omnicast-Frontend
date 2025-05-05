import { Menu, SatelliteDish } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import Link from "next/link";
import { SheetDemo } from "./side-sheet";


const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-3 lg:px-6 py-3 bg-black/60 backdrop-blur-md rounded-full max-w-6xl mx-auto mt-4 border border-white/10">
      <BorderBeam
        duration={15}
        size={200}
        reverse
        className="from-transparent via-neutral-400 to-transparent"
      />
      <div className="text-white font-bold text-lg sm:text-xl md:text-2xl flex items-center gap-2 tracking-tighter">
        <span className="text-xl ">
          <Link href="/">
            <SatelliteDish className=" size-6 sm:size-7 md:size-9 pb-1 mr-1 hover:scale-110 transition-all duration-500" />
          </Link>
        </span>
        <Link
          href={"/"}
          className="hover:cursor-pointer hover:scale-105 transition-all duration-300 "
        >
          OmniCast
        </Link>
      </div>
      <div className="items-center gap-6 text-neutral-400 text-md font-semibold lg:flex hidden">
        <div className="flex items-center gap-1 cursor-pointer hover:text-white/80 hover:cursor-pointer hover:scale-105 transition-all duration-300">
          Features
        </div>
        <span className="hover:text-white/80 hover:cursor-pointer hover:scale-105 transition-all duration-300">
          About
        </span>
        <span className="hover:text-white/80 hover:cursor-pointer hover:scale-105 transition-all duration-300">
          Pricing
        </span>
        <span className="hover:text-white/80 hover:cursor-pointer hover:scale-105 transition-all duration-300">
          Blog
        </span>
        <span className="hover:text-white/80 hover:cursor-pointer hover:scale-105 transition-all duration-300">
          Changelog
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-neutral-300 text-md hover:cursor-pointer font-semibold md:block hidden hover:scale-105 transition-all duration-300">
          <Link href={"/login"}>Log In</Link>
        </button>
        <Button className="bg-white text-neutral-700 rounded-md px-4 py-1 text-md font-semibold hover:cursor-pointer md:block hidden hover:scale-105 transition-all duration-300 rounded-full">
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
        <div className="lg:hidden block">
          <SheetDemo />
        </div>
      </div>
    </div>
  );
};

export default Navbar;