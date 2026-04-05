"use client"

import { Users, UserCircle, Building, Network, Award } from "lucide-react"

const roles = [
  {
    icon: Building,
    title: "State Coordinating Council",
    abbr: "SCC",
    description: "Central body overseeing all activities across the state and beyond. The highest decision-making authority.",
    color: "bg-accent/20 text-accent",
    level: 1,
  },
  {
    icon: Network,
    title: "LGPA Forum",
    abbr: "Forum",
    description: "Meeting point for all LGPAs from 17 local governments to appraise performance and carry out evaluations.",
    color: "bg-primary/20 text-primary",
    level: 2,
  },
  {
    icon: UserCircle,
    title: "Local Government Program Administrators",
    abbr: "LGPA",
    description: "Selected youth delegates responsible for mobilizing and managing Agro Executives in their local governments.",
    color: "bg-emerald-500/20 text-emerald-400",
    level: 3,
  },
  {
    icon: Users,
    title: "Community Managers",
    abbr: "GCM",
    description: "Selected by LGPAs to manage participants at the grouping level within each of the 14 communities.",
    color: "bg-blue-500/20 text-blue-400",
    level: 4,
  },
  {
    icon: Award,
    title: "Agro Executives",
    abbr: "AE",
    description: "Thousands of young people who register, participate, and benefit from the AgroV1n3 program.",
    color: "bg-amber-500/20 text-amber-400",
    level: 5,
  },
]

export function Structure() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            Operational Structure
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            How <span className="text-primary">GreenV1n3</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            A well-organized hierarchy ensures effective coordination across all 17 local governments in Plateau State.
          </p>
        </div>

        {/* Structure Visual */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-primary to-amber-500/50" />

          {/* Roles */}
          <div className="space-y-6 lg:space-y-0">
            {roles.map((role, index) => (
              <div
                key={role.title}
                className={`
                  relative lg:flex lg:items-center lg:gap-8
                  ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}
                `}
              >
                {/* Card */}
                <div className={`
                  relative flex-1 p-6 bg-card border border-border/50 rounded
                  hover:border-primary/50 hover:shadow-lg transition-all
                  ${index % 2 === 0 ? "lg:mr-auto lg:text-right" : "lg:ml-auto lg:text-left"}
                  lg:max-w-md
                `}>
                  <div className={`
                    flex items-center gap-4
                    ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}
                  `}>
                    <div className={`w-12 h-12 rounded flex items-center justify-center ${role.color}`}>
                      <role.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
                        <span className="px-2 py-0.5 text-xs font-medium bg-secondary rounded">
                          {role.abbr}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{role.description}</p>
                </div>

                {/* Center Node - Desktop */}
                <div className="hidden lg:flex items-center justify-center w-12">
                  <div className={`
                    w-10 h-10 rounded-full border-4 border-background
                    flex items-center justify-center font-bold text-sm
                    ${role.color}
                  `}>
                    {role.level}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1 max-w-md" />
              </div>
            ))}
          </div>
        </div>

        {/* LGA Count */}
        <div className="mt-16 p-6 bg-card border border-border rounded max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">17</p>
              <p className="text-sm text-muted-foreground mt-1">Local Governments</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent">10,000+</p>
              <p className="text-sm text-muted-foreground mt-1">Target Agro Executives</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
