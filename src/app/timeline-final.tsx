import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Management from "@/assets/Management.jpeg";
import Management2 from "@/assets/Management2.jpeg";
import Marketing from "@/assets/Marketing.jpeg";
import Marketing2 from "@/assets/Marketing2.jpeg";
import Operations from "@/assets/Operations.jpeg";
import Operations2 from "@/assets/Operations2.jpeg";
import Sales from "@/assets/Sales.jpeg";
import Sales2 from "@/assets/Sales2.jpeg";
import { useTheme } from "next-themes";
import { GlareCard } from "@/components/ui/glare-card";

export function TimelineDemo() {
  const { theme } = useTheme();
  const data = [
    {
      title: "Marketing Teams",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-base font-normal mb-8">
          Automate outreach and track engagement across all channels in one place.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={Marketing}
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] filter grayscale"
              />
            </GlareCard>
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={Marketing2}
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] filter grayscale"
              />
            </GlareCard>
          </div>
        </div>
      ),
    },
    {
      title: "Sales Teams",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-base font-normal mb-8">
            Close more deals with unified messaging, CRM integrations, and
            instant client communication tools.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={Sales}
                alt="hero template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] filter grayscale"
              />
            </GlareCard>
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={Sales2}
                alt="feature template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] filter grayscale"
              />
            </GlareCard>
          </div>
        </div>
      ),
    },
    {
      title: "Operations",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-base font-normal mb-8">
            Streamline workflows and automate communication
            for faster response times and fewer errors.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={Operations}
                alt="hero template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] filter grayscale"
              />
            </GlareCard>
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={Operations2}
                alt="feature template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] filter grayscale"
              />
            </GlareCard>
          </div>
        </div>
      ),
    },
    {
      title: "Management",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-base font-normal mb-8 ml-0 md:ml-8 lg:ml-0">
            Gain full visibility into performance, team activity, and customer
            experience with rich analytics.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={Management}
                alt="hero template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] filter grayscale"
              />
            </GlareCard>
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={Management2}
                alt="feature template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] filter grayscale"
              />
            </GlareCard>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}