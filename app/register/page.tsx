"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, UserPlus, ArrowLeft, ChevronDown, Check, Sprout, Tractor, ShoppingCart, Factory, Scale, Palmtree, Cpu, Heart, Megaphone, Shield, BookOpen, GraduationCap, Building2, Truck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const communities = [
  { name: "Crop Farming", icon: Sprout },
  { name: "Animal Farming", icon: Tractor },
  { name: "Agro Marketing", icon: ShoppingCart },
  { name: "Agro Processing", icon: Factory },
  { name: "Management & Legislation", icon: Scale },
  { name: "Agro Tourism", icon: Palmtree },
  { name: "Agro Technology", icon: Cpu },
  { name: "Agro Health Care", icon: Heart },
  { name: "Agro Media & Branding", icon: Megaphone },
  { name: "Agro Security", icon: Shield },
  { name: "Agro Literature", icon: BookOpen },
  { name: "Motivation & Training", icon: GraduationCap },
  { name: "Agro Real Estate", icon: Building2 },
  { name: "Agro Logistics", icon: Truck }
]

const localGovernments = [
  "Barkin Ladi", "Bassa", "Bokkos", "Jos East", "Jos North", "Jos South",
  "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang",
  "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"
]

// Custom Dropdown Component
function CustomDropdown({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder,
  type = "lga"
}: { 
  label: string
  value: string
  onChange: (value: string) => void
  options: typeof communities | string[]
  placeholder: string
  type?: "lga" | "community"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isCommunity = type === "community"
  const displayValue = isCommunity 
    ? (options as typeof communities).find(c => c.name === value)?.name 
    : value

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="text-sm text-foreground">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-11 bg-secondary/50 border rounded-[4px] px-3 text-left flex items-center justify-between transition-all duration-200 ${
            isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-border/60 hover:border-border'
          }`}
        >
          <span className={value ? 'text-foreground' : 'text-muted-foreground/60'}>
            {displayValue || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border/60 rounded-[4px] shadow-xl shadow-black/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="max-h-[280px] overflow-y-auto scrollbar-thin">
              {isCommunity ? (
                (options as typeof communities).map((community) => {
                  const Icon = community.icon
                  const isSelected = value === community.name
                  return (
                    <button
                      key={community.name}
                      type="button"
                      onClick={() => {
                        onChange(community.name)
                        setIsOpen(false)
                      }}
                      className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-all duration-150 ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
                      <span className="flex-1 text-sm">{community.name}</span>
                      {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
                    </button>
                  )
                })
              ) : (
                (options as string[]).map((lga) => {
                  const isSelected = value === lga
                  return (
                    <button
                      key={lga}
                      type="button"
                      onClick={() => {
                        onChange(lga)
                        setIsOpen(false)
                      }}
                      className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-all duration-150 ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary-foreground' : 'text-orange-400'}`} />
                      <span className="flex-1 text-sm">{lga}</span>
                      {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    localGovernment: "",
    community: "",
    password: "",
    confirmPassword: "",
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [step, setStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative bg-card overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Decorative Gradient */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 relative">
              <Image
                src="/images/greenvine-logo.png"
                alt="GreenV1n3"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-[family-name:var(--font-aldrich)] text-2xl">
              Agro<span className="text-primary">V1n3</span>
            </span>
          </Link>

          <h1 className="font-[family-name:var(--font-aldrich)] text-3xl xl:text-4xl text-foreground mb-4">
            Become an<br />
            <span className="text-primary">Agro Executive</span>
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed mb-8">
            Join thousands of young Nigerians transforming agriculture. Register to access exclusive opportunities and grow your agribusiness career.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              "Access to 14 agriculture communities",
              "Personal wallet & V1n3 token rewards",
              "Training & certification programs",
              "Connect with investors & partners"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 relative">
              <Image
                src="/images/greenvine-logo.png"
                alt="GreenV1n3"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-[family-name:var(--font-aldrich)] text-lg">
              Agro<span className="text-primary">V1n3</span>
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Back Link */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h2 className="font-[family-name:var(--font-aldrich)] text-2xl text-foreground mb-2">
              Create Account
            </h2>
            <p className="text-muted-foreground mb-6">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </p>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-secondary'}`} />
              <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`} />
            </div>

            {/* Form */}
            <form className="space-y-4">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm text-foreground">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="h-11 bg-secondary/50 border-border/60 rounded-[4px] placeholder:text-muted-foreground/60 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-foreground">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-11 bg-secondary/50 border-border/60 rounded-[4px] placeholder:text-muted-foreground/60 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm text-foreground">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-11 bg-secondary/50 border-border/60 rounded-[4px] placeholder:text-muted-foreground/60 focus:border-primary"
                    />
                  </div>

                  <CustomDropdown
                    label="Local Government Area"
                    value={formData.localGovernment}
                    onChange={(value) => setFormData({ ...formData, localGovernment: value })}
                    options={localGovernments}
                    placeholder="Select your LGA"
                    type="lga"
                  />

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full h-11 rounded-[4px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-2"
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <CustomDropdown
                    label="Choose Your Community"
                    value={formData.community}
                    onChange={(value) => setFormData({ ...formData, community: value })}
                    options={communities}
                    placeholder="Select a community"
                    type="community"
                  />

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        className="h-11 bg-secondary/50 border-border/60 rounded-[4px] placeholder:text-muted-foreground/60 focus:border-primary pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm text-foreground">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="h-11 bg-secondary/50 border-border/60 rounded-[4px] placeholder:text-muted-foreground/60 focus:border-primary pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-0.5 border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-foreground/80 hover:text-foreground transition-colors">
                        Terms of Service
                      </Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-foreground/80 hover:text-foreground transition-colors">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-11 rounded-[4px] border-border/60 hover:bg-secondary/50 hover:text-white"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-11 rounded-[4px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Register
                    </Button>
                  </div>
                </>
              )}
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-xs text-muted-foreground">
                  Or register with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-[4px] border-border/60 bg-secondary/30 hover:bg-secondary/50 hover:text-white text-foreground gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-[4px] border-border/60 bg-secondary/30 hover:bg-secondary/50 hover:text-white text-foreground gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
