"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/hooks/use-toast";
import { useSession } from "next-auth/react";

export function CommunicationHistory({ groups }: { groups: any[] }) {
  const [selectedGroup, setSelectedGroup] = React.useState<string>("__all__");
  const [responses, setResponses] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { data: session, status } = useSession();



  React.useEffect(() => {
    const fetchData = async () => {
      if (status !== "authenticated" || !session?.user?.email) return;
      try {
        const res = await fetch("/api/communication-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_email: session?.user.email }),
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setResponses(data);
        } else {
          console.log("Expected an array but got:", data);
          // toast({
          //   title: "Upload Failed",
          //   description: "Please try again or contact support.",
          //   variant: "destructive",
          // });
          setResponses([]);
        }
      } catch (err) {
        console.log("Error fetching communication history:", err);
        toast({
          title: "Failed",
          description: "Please try again or contact support.",
          variant: "destructive",
        });
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set interval to re-fetch every 60 seconds
    const interval = setInterval(fetchData, 30000); // 60000 ms = 60 seconds

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [status, session]);

  const filteredResponses =
    selectedGroup === "__all__"
      ? responses
      : responses.filter((r) => r.group === selectedGroup);

  const getGroupColor = (groupName: string) =>
    groups?.find((g) => g.name === groupName)?.color || "#ccc";

  return (
    <Card className="flex flex-col flex-1 overflow-hidden my-5 p-0 rounded-lg mx-3">
      <CardContent className="flex flex-col flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h1 className="ml-[5px] text-sm sm:text-base">Responses</h1>
          </div>
          <Select
            onValueChange={(val) => setSelectedGroup(val)}
            defaultValue="__all__"
          >
            <SelectTrigger className="w-full sm:text-sm text-xs">
              <SelectValue placeholder="Choose a group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Groups</SelectItem>
              {(groups ?? []).map((g) => (
                <SelectItem key={g.name} value={g.name}>
                  <span
                    className="w-2 h-2 rounded-full inline-block mr-2"
                    style={{ backgroundColor: g.color }}
                  />
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-hidden mt-4">
          <ScrollArea className="h-full pr-2">
            <div className="flex flex-col gap-3">
              {loading ? (
                <div className="text-center text-sm text-muted">Loading...</div>
              ) : filteredResponses.length === 0 ? (
                <div className="text-gray-500 text-sm text-center">
                  No responses found.
                </div>
              ) : (
                filteredResponses.map((response, idx) => {
                  const showDot = selectedGroup === "__all__";
                  const dotColor = getGroupColor(response.group);

                  return (
                    <Card key={idx} className="shadow-sm">
                      <CardContent className="p-3 py-1.5 pb-1 flex flex-col gap-1">
                        <div className="flex justify-between items-start gap-4">
                          {/* Left side: sender details */}
                          <div className="flex items-start gap-2">
                            {showDot && (
                              <span
                                className="w-2 h-2 rounded-full mt-1.5"
                                style={{ backgroundColor: dotColor }}
                              />
                            )}
                            <div className="flex flex-col">
                              {["email"].includes(
                                response.channel.toLowerCase()
                              ) ? (
                                <div className="text-sm font-semibold break-words">
                                  {response.sender_email}
                                </div>
                              ) : (
                                <div className="text-sm font-semibold break-words">
                                  {response.sender_number}
                                </div>
                              )}

                              <div className="text-xs text-gray-500 break-words">
                                {["email"].includes(
                                  response.channel.toLowerCase()
                                ) && response.sender_name}
                              </div>
                            </div>
                          </div>

                          {/* Right side: channel */}
                          <div className="text-xs text-gray-500 whitespace-nowrap">
                            • {response.channel}
                          </div>
                        </div>

                        <div className="text-sm mt-1 pl-4">
                          {response.message}
                        </div>
                        <div className="text-xs text-gray-400 mt-3 pl-4">
                          {response.time}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
