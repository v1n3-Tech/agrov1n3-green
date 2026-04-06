import Link from "next/link"
import Image from "next/image"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-10 h-10 relative">
            <Image
              src="/images/greenvine-logo.png"
              alt="GreenV1n3"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[family-name:var(--font-aldrich)] text-xl">
            <span className="text-primary">Agro</span>
            <span className="text-orange-400">V1n3</span>
          </span>
        </Link>
        
        <div className="bg-card border border-border/60 rounded-[5px] p-8 space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-semibold">Authentication Error</h1>
          
          <p className="text-muted-foreground">
            Something went wrong during authentication. This could be due to an expired link or invalid credentials.
          </p>
          
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/sign-in">
              <Button className="w-full">Try Again</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
