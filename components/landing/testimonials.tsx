"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Aminu Hassan",
    role: "Crop Farmer, Jos North",
    community: "Crop Farming",
    content: "GreenV1n3 connected me with investors who funded my maize farm. Now I supply to 3 major markets in Plateau State. The platform changed everything for me.",
    rating: 5,
    avatar: "AH",
  },
  {
    name: "Grace Danladi",
    role: "Agro Marketer, Pankshin",
    community: "Agro Marketing",
    content: "The marketplace feature is amazing! I sell poultry products directly to buyers without middlemen. My income has tripled since I joined.",
    rating: 5,
    avatar: "GD",
  },
  {
    name: "Emmanuel Okoro",
    role: "Tech Enthusiast, Jos South",
    community: "Agro Technology",
    content: "As a software developer, I never thought I would be involved in agriculture. GreenV1n3 showed me how tech can transform farming in Nigeria.",
    rating: 5,
    avatar: "EO",
  },
  {
    name: "Fatima Yusuf",
    role: "Animal Farmer, Barkin Ladi",
    community: "Animal Farming",
    content: "The training programs helped me understand modern livestock management. My goat farm is now one of the most successful in my LGA.",
    rating: 5,
    avatar: "FY",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Hear from Our <span className="text-primary">Agro Executives</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from real users who are transforming their lives through agriculture on GreenV1n3.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative p-6 bg-card border border-border/50 rounded hover:border-primary/30 transition-colors"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 pr-12">
                {`"${testimonial.content}"`}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-secondary rounded text-primary">
                    {testimonial.community}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card border border-border rounded">
            <p className="text-3xl lg:text-4xl font-bold text-primary">4.9</p>
            <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded">
            <p className="text-3xl lg:text-4xl font-bold text-accent">8,234</p>
            <p className="text-sm text-muted-foreground mt-1">Active Users</p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded">
            <p className="text-3xl lg:text-4xl font-bold text-primary">95%</p>
            <p className="text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded">
            <p className="text-3xl lg:text-4xl font-bold text-accent">17</p>
            <p className="text-sm text-muted-foreground mt-1">LGAs Covered</p>
          </div>
        </div>
      </div>
    </section>
  )
}
