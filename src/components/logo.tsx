// import { appConfig } from "@/config/app";
import { Satellite, SatelliteDish } from "lucide-react";
import { Icons } from "./icons";
import { AuroraText } from "./magicui/aurora-text";

export function Logo() {
    return (
        <>
            {/* <Icons.logo className="h3-6 w-6" /> */}
            <SatelliteDish className="lg:size-7 hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"/>
            <span className="font-bold text-2xl lg:text-3xl hover:cursor-pointer hover:scale-102 transition-all duration-300 ease-in-out"><AuroraText>Dashboard</AuroraText></span>
        </>
    )
}