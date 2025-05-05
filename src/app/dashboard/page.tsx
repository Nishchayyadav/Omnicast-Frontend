"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FirstSection } from "./FirstSection";
import { MiddleSection } from "./MiddleSection";
import LastSection from "./LastSection";
import { Header } from "./navabar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BrainCircuit, CloudUpload, Radio } from "lucide-react";
import { SkeletonDashboard } from "./SkeletonDashboard";
import { MultiStepLoaderDemo } from "./Loader";
import { EmailPasswordDialog } from "./ProfileDialog";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [groups, setGroups] = useState<any[]>([]);
  const [rawData, setRawData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/data", { cache: "no-store" });
      const json = await res.json();
      setGroups(json.group_colors);
      setRawData(json.grouped_customers);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Show dialog if credentials are missing
  useEffect(() => {
    async function checkCredentials() {
      if (status !== "authenticated" || !session?.user?.email) return;

      const res = await fetch("/api/check-email-creds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: session.user.email }),
      });

      const data = await res.json();
      if (!data.email || !data.app_password) {
        setShowDialog(true);
      }
    }

    checkCredentials();
  }, [status, session]);

  return (
    <div className="h-screen p-5 pb-1.5 flex flex-col">
      <div className="mb-4">
        <Header />
        {showDialog && (
          <EmailPasswordDialog autoOpen={true} showTrigger={false} />
        )}
      </div>

      <div className="xl:hidden flex flex-col flex-1 min-h-0">
        <Tabs defaultValue="section1" className="flex flex-col flex-1 min-h-0">
          <TabsList className="grid w-full grid-cols-3 mb-3">
            <TabsTrigger value="section1">
              <CloudUpload className="size-4 block xs:hidden" />
              <span className="hidden sm:block">Data Import</span>
            </TabsTrigger>
            <TabsTrigger value="section2">
              <BrainCircuit className="size-4 block xs:hidden" />
              <span className="hidden sm:block">Audience Intelligence</span>
            </TabsTrigger>
            <TabsTrigger value="section3">
              <Radio className="size-4 block xs:hidden" />
              <span className="hidden sm:block">Engagement Channels</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 flex flex-col min-h-0">
            <TabsContent value="section1" className="flex-1 flex flex-col">
              <FirstSection
                groups={groups}
                rawData={rawData}
                loading={loading}
                fetchData={fetchData}
              />
            </TabsContent>
            <TabsContent
              value="section2"
              className="flex-1 flex flex-col min-h-0"
            >
              <MiddleSection
                groups={groups}
                rawData={rawData}
                loading={loading}
              />
            </TabsContent>
            <TabsContent
              value="section3"
              className="flex-1 flex flex-col min-h-0"
            >
              <LastSection
                groups={groups}
                rawData={rawData}
                loading={loading}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="hidden xl:grid grid-cols-[2.5fr_4fr_2.5fr] gap-4 flex-1 min-h-0 overflow-hidden">
        <FirstSection
          groups={groups}
          rawData={rawData}
          loading={loading}
          fetchData={fetchData}
        />
        <MiddleSection groups={groups} rawData={rawData} loading={loading} />
        <LastSection groups={groups} rawData={rawData} loading={loading} />
      </div>
    </div>
  );
}
