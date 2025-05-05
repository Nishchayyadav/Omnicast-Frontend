"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  Loader2,
  MailPlus,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/hooks/use-toast";
import { useEffect, useState, useTransition } from "react";

export function EmailPasswordDialog({ autoOpen = false, showTrigger = true }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false); // for controlling dialog state
  // const [popup, setPopUp] = useState(false);
  // ...other state.

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  async function handleSend() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/email-auth", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("appEmail", email);
        localStorage.setItem("appPassword", password);
        setOpen(false); // close dialog
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      setError(true);
      toast({
        title: "Upload Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setEmail("");
            setPassword("");
            setError(false);
            setLoading(false);
          }
        }}
      >
        {showTrigger && (
          <DialogTrigger asChild>
            <div className="flex gap-2.5 items-center">
              <MailPlus className="size-4 dark:text-neutral-400 text-neutral-500" />{" "}
              Add Mail
            </div>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[425px] max-w-[320px] pt-10">
          <Alert variant="default">
            <Info className="h-4 w-4 text-green-800" />
            <AlertTitle className="mb-1">Important</AlertTitle>
            <AlertDescription>
              If you're using Gmail, Outlook, or other providers with 2FA, use
              an 'app-specific password' instead of your actual password.
            </AlertDescription>
          </Alert>

          <DialogHeader className="flex flex-row items-center justify-between mt-2">
            <DialogTitle>Enter Email Credentials</DialogTitle>
            <Badge className="dark:bg-green-700 bg-green-200 dark:text-white text-black border dark:border-green-300 border-green-600 rounded-lg">
              Secured
            </Badge>
          </DialogHeader>

          <DialogDescription>
            Enter the company email and password to connect your account.
          </DialogDescription>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Company Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  email === "" && error
                    ? "Email is required"
                    : "you@company.com"
                }
                className={
                  email === "" && error
                    ? "border-red-500 placeholder:text-red-400"
                    : ""
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">App Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={
                  password === "" && error
                    ? "App password is required"
                    : "••••••••"
                }
                className={
                  password === "" && error
                    ? "border-red-500 placeholder:text-red-400"
                    : ""
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-end gap-3 flex-col">
            <Button
              variant={error ? "outline" : "default"}
              onClick={handleSend}
              disabled={loading}
              className={`mt-4 flex items-center gap-2 hover:cursor-pointer ${
                error
                  ? "border-red-500 text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                  : ""
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 text-gray-500" />
              ) : error ? (
                <TriangleAlert className="h-4 w-4 text-red-600" />
              ) : null}
              {loading ? "Sending..." : error ? "Try Again" : "Send"}
            </Button>
            <div className="text-xs text-muted-foreground">
              Need help?{" "}
              <a
                href="https://support.google.com/mail/answer/185833?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Learn how to generate an app password
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
