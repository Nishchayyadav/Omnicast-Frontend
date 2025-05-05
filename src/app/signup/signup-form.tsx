"use client";

import { SatelliteDish } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Image from "next/image";
import salesforceicon from "@/assets/salesforce.png";
import { signIn } from "next-auth/react";
import { toast } from "@/components/hooks/use-toast";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const body = {
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            company_name: formData.get("companyName"),
            email: formData.get("email"),
            password: formData.get("password"),
          };

          const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          if (res.ok) {
            // Redirect to login or auto-login
            await signIn("credentials", {
              email: body.email,
              password: body.password,
              callbackUrl: "/dashboard",
            });
          } else {
            toast({
              title: "Login failed",
              description: "Please check your email or password.",
              variant: "destructive",
            });
          }
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <SatelliteDish className="size-7" />
              </div>
              <span className="sr-only">OmniCast.ai</span>
            </Link>

            <h1 className="text-xl font-bold text-center">Create your OmniCast account</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3 grid-cols-2">
              <div>
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  required
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  className="mt-3"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Al Akaria"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="text-muted-foreground relative z-10 px-2">Or</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => signIn("salesforce")}
            >
              <Image
                src={salesforceicon}
                alt="Salesforce"
                width={20}
                height={20}
                className=""
              />
              with Salesforce
            </Button>
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => signIn("google")}
            >
              <IconBrandGoogleFilled className="size-4" />
              with Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking sign up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
