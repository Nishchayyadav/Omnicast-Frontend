import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "@/components/magicui/final-beam";
import { AnimatedListDemo } from "@/components/magicui/final-list";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";

const files = [
  {
    name: "Logs.json",
    body: "Includes all customer interactions through WhatsApp, essential for support and sales insights.",
  },
  {
    name: "Emails.csv",
    body: "Analytics from email campaigns for marketing automation and performance tracking.",
  },
  {
    name: "Feedback.txt",
    body: "Real-time feedback from customers collected through multi-channel interactions.",
  },
  {
    name: "Scores.xlsx",
    body: "AI-generated lead qualification scores used by outreach and BD teams.",
  },
  {
    name: "Updates.log",
    body: "Transactional message history for order updates, delivery status, and escalations.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Unified Inbox",
    description:
      "All your customer conversations in one place across channels.",
    href: "#",
    cta: "Explore Inbox",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Real-Time Alerts",
    description:
      "Stay updated with smart notifications for leads, escalations, and replies.",
    href: "#",
    cta: "View Alerts",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Channel Integrations",
    description: "Connect with WhatsApp, Email, Voice, Social Media, and more.",
    href: "#",
    cta: "Configure Channels",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 scale-90 sm:scale-100"/>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Campaign Scheduler",
    description:
      "Plan, schedule, and automate your messaging campaigns with ease.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Launch Campaign",
    background: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="absolute right-0 top-10 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
      />
    ),
  },
];

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
