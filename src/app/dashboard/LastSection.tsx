"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Radio, Send, Square, SquareCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/hooks/use-toast";
import { useSession } from "next-auth/react";

type Group = { name: string; color: string };
type GroupMember = { id: string; name: string; email: string; phone: string };
type Groups = Record<string, GroupMember[]>;

import { Phone, Mail, MessageCircle, MessageSquareText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunicationHistory } from "./CommunicationHistory";

const channels = [
  { name: "WhatsApp", icon: MessageCircle, type: "whatsapp" },
  { name: "SMS", icon: MessageSquareText, type: "sms" },
  { name: "Email", icon: Mail, type: "email" },
  { name: "Call", icon: Phone, type: "call" },
];

export type Payment = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function LastSection({
  groups,
  rawData,
  loading,
}: {
  groups: any[];
  rawData: Record<string, Payment[]>;
  loading: boolean;
}) {
  const groupList = groups as Group[];
  const contacts = rawData as Groups;
  const { data: session } = useSession();
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = React.useState<string | null>(
    null
  );
  const [selectedPeople, setSelectedPeople] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string>("");
  const [isSending, setIsSending] = React.useState(false); // loader state

  const handlePersonToggle = (id: string) => {
    setSelectedPeople((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  const [openDialogName, setOpenDialogName] = React.useState<string | null>(
    null
  );
  const allContacts = Object.values(contacts || {}).flat();
  const contactList =
    selectedGroup === "__all__"
      ? allContacts
      : contacts?.[selectedGroup || ""] ?? [];

  const filteredPeople = contactList.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAllSelected =
    filteredPeople.length > 0 &&
    filteredPeople.every((p) => selectedPeople.includes(p.id));
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedPeople((prev) =>
        prev.filter((id) => !filteredPeople.some((p) => p.id === id))
      );
    } else {
      setSelectedPeople((prev) => [
        ...prev,
        ...filteredPeople.map((p) => p.id).filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const handleConnectClick = async (channelName: string) => {
    if (!selectedGroup || !selectedChannel) return;

    const groupMembers = contacts[selectedGroup] || [];
    const recipients = groupMembers
      .filter((member) => selectedPeople.includes(member.id))
      .map((member) => ({
        name: member.name,
        phone_number: member.phone,
        email: member.email,
      }));
    const messageData = {
      channel: selectedChannel.toLowerCase(),
      message,
      recipients,
      user_email: session?.user?.email,
    };

    setIsSending(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send_bulk_messages/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );

      if (!res.ok) throw new Error("Failed to send message");

      toast({
        title: "Message Sent",
        description: `Sent to ${recipients.length} people via ${selectedChannel}`,
      });

      // Close dialog on success
      setOpenDialogName(null);
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader className="hidden lg:block lg:border-b pb-3">
          <CardTitle className="text-md font-light text-neutral-800 dark:text-neutral-300 flex gap-2 items-center">
            <Radio className="size-4" /> Engagement Channels
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 min-h-0 p-0">
          <ScrollArea className="h-full w-full flex-1">
            <div className="flex flex-col gap-4 p-4 border mx-3 mb-3 rounded-lg">
              <div className="flex items-center justify-between gap-2">
                {/* Message Input */}
                <div className="w-full">
                  <h1 className="ml-[5px] text-sm sm:text-base">
                    Channels Deck
                  </h1>
                </div>

                {/* Group Selector */}
                <div className="w-full">
                  <Select onValueChange={(val) => setSelectedGroup(val)}>
                    <SelectTrigger className="w-full sm:text-sm text-xs">
                      <SelectValue placeholder="Choose a group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All Groups</SelectItem>
                      {(groupList || []).map((g) => (
                        <SelectItem key={g.name} value={g.name}>
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: g.color }}
                          />
                          {g.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={4}
              />

              {/* Channel Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-3 mt-1">
                {channels.map(({ name, icon: Icon, type }) => (
                  <Dialog
                    key={name}
                    open={openDialogName === name}
                    onOpenChange={(isOpen) =>
                      setOpenDialogName(isOpen ? name : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full flex gap-2 items-center justify-center rounded-xl"
                        onClick={() => setSelectedChannel(name)}
                        disabled={
                          !selectedGroup ||
                          (name !== "Call" && message.trim() === "") ||
                          (selectedGroup === "__all__" &&
                            filteredPeople.length === 0)
                        }
                      >
                        {Icon && <Icon className="size-4" />}
                        <span className="hidden sm:inline">{name}</span>
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[80vh] sm:max-w-[500px] max-w-[320px] xs:max-w-[400px] overflow-y-auto text-sm sm:text-base">
                      <DialogHeader>
                        <DialogTitle className="text-md sm:text-lg font-bold">
                          {name} – Select Contacts from{" "}
                          <strong>
                            {selectedGroup === "__all__"
                              ? "All Groups"
                              : selectedGroup}
                          </strong>
                        </DialogTitle>
                      </DialogHeader>

                      {/* Search + Select All */}
                      <div className="flex justify-between items-center gap-2 ml-[-2px] mt-4 flex-row-reverse">
                        <input
                          type="text"
                          placeholder="Search contacts"
                          className="border p-2 rounded-md flex-grow"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                          className="w-fit"
                          onClick={toggleSelectAll}
                          disabled={filteredPeople.length === 0}
                        >
                          {isAllSelected ? (
                            <Square className="size-4" />
                          ) : (
                            <SquareCheck className="size-4" />
                          )}
                        </button>
                      </div>

                      {/* Filtered Contact List */}
                      <div className="flex flex-col gap-2 mt-1">
                        {filteredPeople.map((person) => (
                          <label
                            key={person.id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPeople.includes(person.id)}
                              onChange={() => handlePersonToggle(person.id)}
                            />
                            <span>
                              {person.name} (
                              {type === "sms" ||
                              type === "call" ||
                              type === "whatsapp"
                                ? person.phone
                                : person.email}
                              )
                            </span>
                          </label>
                        ))}
                      </div>

                      {/* Footer */}
                      <DialogFooter className="mt-4">
                      <Button onClick={() => handleConnectClick(name)} disabled={isSending}>
                          {isSending ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="animate-spin" />
                              Sending...
                            </div>
                          ) : (
                            <>
                              <Send />
                              Connect
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
            <CommunicationHistory groups={groups} />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
