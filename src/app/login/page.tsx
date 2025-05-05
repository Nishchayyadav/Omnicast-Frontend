import { LoginForm } from "@/app/login/login-form"
import Image from "next/image"
import coverImage from '@/assets/cover-image.jpg'
import { ModeToggle } from "@/components/ui/dark-toggle"

export default function LoginPage() {
  return (
    <div className="relative min-h-svh w-full">
      {/* Background Image */}
      <Image
        src={coverImage}
        alt="Background"
        fill
        priority
        className="object-cover brightness-45"
      />

      {/* Foreground Content */}
      <div className="relative z-10 backdrop-blur-md flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
