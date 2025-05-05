"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CloudUpload } from "lucide-react";
import { ButtonDialog } from "./dialog";
import { DataTableDemo } from "./table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export type Payment = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

function SkeletonTable(){
  return ( <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[80px]" />
      </div>
    ))}
  </div>);
}

export function FirstSection({
  groups,
  rawData,
  loading,
  fetchData
}: {
  groups: any[];
  rawData: Record<string, Payment[]>;
  loading: boolean;
  fetchData: () => Promise<void>;
}) {
  React.useEffect(() => {
    console.log("Groups: ", groups);
    console.log("Raw Data: ", rawData);
  }, [groups, rawData]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);

  // Function to handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="hidden lg:block lg:border-b pb-3">
        <CardTitle className="text-md font-light text-neutral-800 dark:text-neutral-300 flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <CloudUpload className="size-4" /> Data Import
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-2">
        <ScrollArea className="h-full w-full flex-1">
          <div className="flex flex-col gap-4 px-0 sm:p-4 pt-0">
            <div className="flex justify-between items-center">
              <div className="text-base sm:text-lg font-bold text-neutral-800 dark:text-neutral-300 pl-1">
                Contacts
              </div>
              <ButtonDialog isOpen={isDialogOpen} onClose={handleDialogClose} handler={setIsDialogOpen} onUpdate={fetchData}/>
            </div>
            {loading ? <SkeletonTable /> : <DataTableDemo groups={groups} rawData={rawData}/>}
            
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}



