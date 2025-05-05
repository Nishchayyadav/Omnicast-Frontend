import * as React from "react";
import { Forward } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/hooks/use-toast";

export type Payment = {
  id: string;
  name: string;
  email: string;
  phone: string;
};
import { useSession } from "next-auth/react";

type Group = { name: string; color: string };

export function CardsChat({
  groups,
  rawData,
  loading,
}: {
  groups: any[];
  rawData: Record<string, Payment[]>;
  loading: boolean;
}) {
  const {data : session} = useSession();
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi! How can I assist you today?",
    },
    {
      role: "user",
      content: "I'm having issues accessing my dashboard.",
    },
    {
      role: "agent",
      content: "Got it. Are you seeing any error message?",
    },
    {
      role: "user",
      content: "Yes, it says 'Unauthorized access'.",
    },
    {
      role: "agent",
      content: "Thanks for the info. Let me check that for you.",
    },
  ]);

  const [input, setInput] = React.useState("");
  const groupList = groups as Group[];
  const [loadingResponse, setLoadingResponse] = React.useState(false);
  const inputLength = input.trim().length;
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(
    "all"
  );

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3 sm:gap-0">
        <div className="flex items-start sm:items-center space-x-4 ml-3 mt-2">
          <div>
            <p className="text-[14px] sm:text-[16px] font-medium leading-none">
              AI Powered ChatBot
            </p>
            <p className="text-[12px] sm:text-[14px] text-muted-foreground">
              Generate messages, ask questions on your data
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64 px-2">
          <Select onValueChange={(val) => setSelectedGroup(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">
                <div className="flex items-center gap-2">
                  No Groups
                </div>
              </SelectItem>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  All Groups
                </div>
              </SelectItem>
              {(groups || []).map((g) => (
                <SelectItem key={g.name} value={g.name}>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: g.color }}
                    />
                    {g.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden px-4">
        <ScrollArea className="h-full w-full pr-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "whitespace-pre-wrap break-words",
                  "flex w-fit max-w-full sm:max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-[10px] xs:text-xs sm:text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}

            {loadingResponse && (
              <div className="px-3 py-2 rounded-lg max-w-[75%]">
                <ThreeDots
                  visible={true}
                  height="40"
                  width="60"
                  color="#ccc"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (inputLength === 0) return;
          
            const currentInput = input;
            setMessages((prev) => [...prev, { role: "user", content: currentInput }]);
            setInput(""); // Clear input immediately
            setLoadingResponse(true);
          
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-message/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: currentInput,
                    group: selectedGroup,
                    company_id: session?.user.tenant_id,
                    name: session?.user.firstName + " " + session?.user.lastName,
                  }),
                }
              );
          
              if (!res.ok) {
                setMessages((prev) => prev.slice(0, -1));
                throw new Error(`Server error: ${res.status}`);
              }
          
              const data = await res.json();
              setMessages((prev) => [...prev, { role: "agent", content: data.reply }]);
            } catch (error) {
              setMessages((prev) =>
                prev[prev.length - 1]?.role === "user" ? prev.slice(0, -1) : prev
              );
          
              toast({
                title: "Message Failed",
                description: "Please try again or contact support.",
                variant: "destructive",
              });
            } finally {
              setLoadingResponse(false);
            }
          }}          
          className="flex w-full items-center space-x-2 mt-3"
        >
          <Input
            id="message"
            placeholder="Write your query"
            className="flex-1 rounded-full sm:px-6 sm:py-6 px-3 py-3 text-xs xs:text-sm sm:text-base w-full"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            disabled={inputLength === 0 || loadingResponse}
            className="rounded-full sm:px-6 sm:py-6 px-3 py-3"
          >
            <Forward className="size-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
