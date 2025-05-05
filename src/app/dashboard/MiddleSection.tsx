import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { Component } from "./charts";
import { CardsChat } from "./chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export type Payment = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export function MiddleSection({
  groups,
  rawData,
  loading,
}: {
  groups: any[];
  rawData: Record<string, Payment[]>;
  loading: boolean;
}) {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      {" "}
      {/* changed overflow-y-auto to overflow-hidden */}
      <CardHeader className="hidden lg:block lg:border-b pb-3">
        <CardTitle className="text-md font-light text-neutral-800 dark:text-neutral-300 flex gap-2 items-center">
          <BrainCircuit className="size-4" /> Audience Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0 p-0">
        {" "}
        {/* remove internal padding */}
        <ScrollArea className="h-full w-full flex-1">
          {" "}
          {/* ensure this is full height */}
          <div className="flex flex-col gap-3 p-4 pt-0">
            {" "}
            {/* apply padding inside content */}
            <div className="rounded-md">
              {loading ? (
                <Skeleton className="w-full h-[50vh]" />
              ) : Object.keys(rawData ?? {}).length > 0 ? (
                <Component
                  groups={groups}
                  rawData={rawData}
                  loading={loading}
                />
              ) : (
                <div className="h-[50vh] w-full flex items-center justify-center border rounded-md">
                  No results.
                </div>
              )}
            </div>
            <div className="rounded-md flex-grow">
              <CardsChat groups={groups} rawData={rawData} loading={loading} />
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
