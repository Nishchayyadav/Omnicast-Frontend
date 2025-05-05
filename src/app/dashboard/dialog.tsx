"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus, Loader2, AlertTriangle } from "lucide-react";
import { Plus, CheckCircle, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "@/components/hooks/use-toast";


export function ButtonDialog({
  onUpdate,
  isOpen,
  onClose,
  handler
}: {
  onUpdate?: () => Promise<void>;
  isOpen: boolean; onClose: () => void;
  handler: (value: React.SetStateAction<boolean>) => void;
}) {
  // if (!isOpen) return null;
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error" | "error-upload"
  >("idle");
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState(false);
  const [groupColor, setGroupColor] = useState("#ffffff");
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = useSession();
  const tenantId = session?.user.tenant_id;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      alert("Only .json files are allowed.");
      setUploadStatus("error");
      return;
    }

    setJsonFile(file);
    setUploadStatus("success"); // ✅ file is valid
  };

  const handleSubmit = async () => {
    if (!jsonFile || !groupName || !session?.user || !tenantId) {
      if (!groupName) setGroupNameError(true);
      if (!jsonFile) setUploadStatus("error");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", jsonFile);
    formData.append("name", groupName);
    formData.append("color", groupColor);
    formData.append("email", session?.user.email);
    formData.append("first_name", session?.user.firstName);
    formData.append("last_name", session?.user.lastName);
  
    try {
      setLoading(true);
      setUploadStatus("idle"); 
  
      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload/?tenant_id=${tenantId}`,
        { method: "POST", body: formData }
      );
  
      if (!uploadRes.ok) throw new Error("Upload failed");
  
      // Fetch updated data after upload
      const dataRes = await fetch("/api/data");
      const updatedData = await dataRes.json();
  
      onUpdate?.(); // Update with new data
      setUploadStatus("success"); // Mark as success
      setGroupName(""); // Reset group name
      setGroupColor("#ffffff"); // Reset group color
      setJsonFile(null); // Reset file
  
      onClose?.(); 
  
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error-upload"); // Mark as error
      toast({
        title: "Upload Failed",
        description: "Please try again or contact support.",
        variant: 'destructive',
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm rounded-full hover:scale-102 transition-all duration-500 hover:cursor-pointer" onClick={() => {handler(true);}}>
          <CirclePlus /> <span className="hidden sm:block">Add Contacts</span>
        </Button>
      </DialogTrigger>

      {isOpen ? (<DialogContent className="sm:max-w-[425px] xs:max-w-[350px] max-w-[320px]">
        <DialogHeader>
          <DialogTitle>Add New Group</DialogTitle>
          <DialogDescription>
            Upload a .json file and define group details.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group-name" className="text-right">
              Name
            </Label>
            <Input
              id="group-name"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                if (e.target.value) setGroupNameError(false);
              }}
              placeholder={
                groupNameError ? "Enter the group name" : "Marketing Team"
              }
              className={`col-span-3 ${groupNameError ? "border-red-500" : ""}`}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group-color" className="text-right">
              Color
            </Label>
            <div className="ml-1 relative col-span-3">
              <input
                id="group-color"
                type="color"
                value={groupColor}
                onChange={(e) => setGroupColor(e.target.value)}
                className="absolute top-0 left-0 w-4 h-4 opacity-0 cursor-pointer"
              />
              <div
                className="w-4 h-4 rounded-full border border-gray-300 cursor-pointer"
                style={{ backgroundColor: groupColor }}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full items-center">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <Button
                variant="outline"
                className="rounded-full w-8 h-8 p-0"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadStatus === "success" ? (
                  <CheckCircle className="text-green-600" />
                ) : uploadStatus === "error" ? (
                  <XCircle className="text-red-500" />
                ) : (
                  <Plus />
                )}
              </Button>
            </div>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              variant={uploadStatus === "error-upload" ? "outline" : "default"}
              className={
                uploadStatus === "error-upload"
                  ? "text-red-600 border-red-600"
                  : ""
              }
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : uploadStatus === "error-upload" ? (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Send Again
                </>
              ) : (
                "Save Group"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>) : null}
    </Dialog>
  );
}
