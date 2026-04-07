import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { getUserProfile } from "@/lib/auth/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock events data
const upcomingEvents = [
  {
    id: 1,
    title: "Soil Testing Workshop",
    description: "Learn how to test and improve your soil health for better crop yields. Bring your soil samples for free analysis.",
    community: { name: "Crop Farming", slug: "crop-farming", color: "text-green-500", bgColor: "bg-green-500/10" },
    date: "Apr 12, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "LGA Agricultural Office, Langtang North",
    type: "Workshop",
    isVirtual: false,
    attendees: 45,
    maxAttendees: 60,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Modern Irrigation Webinar",
    description: "Join our experts as they discuss the latest irrigation techniques and water management strategies.",
    community: { name: "Crop Farming", slug: "crop-farming", color: "text-green-500", bgColor: "bg-green-500/10" },
    date: "Apr 15, 2026",
    time: "3:00 PM - 5:00 PM",
    location: "Online (Zoom)",
    type: "Webinar",
    isVirtual: true,
    attendees: 120,
    maxAttendees: 500,
    isFeatured: false,
  },
  {
    id: 3,
    title: "GreenV1n3 AgriTech Hackathon 2026",
    description: "48-hour hackathon to build innovative solutions for Plateau farmers. Prizes worth N5M to be won!",
    community: { name: "Agro Technology", slug: "agro-technology", color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
    date: "Apr 25-27, 2026",
    time: "9:00 AM Start",
    location: "GreenV1n3 Innovation Hub, Jos",
    type: "Hackathon",
    isVirtual: false,
    attendees: 78,
    maxAttendees: 100,
    isFeatured: true,
  },
  {
    id: 4,
    title: "Poultry Vaccination Campaign",
    description: "Free Newcastle disease vaccination for all registered poultry farmers in Plateau State.",
    community: { name: "Animal Farming", slug: "animal-farming", color: "text-amber-500", bgColor: "bg-amber-500/10" },
    date: "Apr 18-22, 2026",
    time: "8:00 AM - 4:00 PM",
    location: "Various Veterinary Offices",
    type: "Campaign",
    isVirtual: false,
    attendees: 234,
    maxAttendees: null,
    isFeatured: false,
  },
  {
    id: 5,
    title: "Agricultural Marketing Masterclass",
    description: "Learn how to market your farm products effectively and access new markets.",
    community: { name: "Agro Marketing", slug: "agro-marketing", color: "text-blue-500", bgColor: "bg-blue-500/10" },
    date: "May 2, 2026",
    time: "11:00 AM - 1:00 PM",
    location: "Online (Google Meet)",
    type: "Masterclass",
    isVirtual: true,
    attendees: 89,
    maxAttendees: 200,
    isFeatured: false,
  },
  {
    id: 6,
    title: "Tomato Processing Workshop",
    description: "Hands-on training on processing and packaging tomato paste for longer shelf life.",
    community: { name: "Agro Processing", slug: "agro-processing", color: "text-orange-500", bgColor: "bg-orange-500/10" },
    date: "May 5, 2026",
    time: "9:00 AM - 3:00 PM",
    location: "Community Center, Barkin Ladi",
    type: "Workshop",
    isVirtual: false,
    attendees: 32,
    maxAttendees: 40,
    isFeatured: false,
  },
]

export default async function EventsPage() {
  const profile = await getUserProfile()
  
  if (!profile) {
    redirect("/sign-in")
  }

  const featuredEvents = upcomingEvents.filter(e => e.isFeatured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-aldrich)] text-foreground">
            Community Events
          </h1>
          <p className="text-muted-foreground mt-1">
            Workshops, webinars, and meetups across all communities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] rounded-[4px]">
              <SelectValue placeholder="Community" />
            </SelectTrigger>
            <SelectContent className="rounded-[4px]">
              <SelectItem value="all">All Communities</SelectItem>
              <SelectItem value="crop-farming">Crop Farming</SelectItem>
              <SelectItem value="agro-technology">Agro Technology</SelectItem>
              <SelectItem value="animal-farming">Animal Farming</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="upcoming">
            <SelectTrigger className="w-[140px] rounded-[4px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="rounded-[4px]">
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past Events</SelectItem>
              <SelectItem value="virtual">Virtual Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold font-[family-name:var(--font-aldrich)] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange" />
            Featured Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {featuredEvents.map((event) => (
              <div 
                key={event.id}
                className="relative overflow-hidden rounded-[4px] border-2 border-orange/30 bg-gradient-to-br from-orange/10 to-transparent p-6"
              >
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange text-orange-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-[4px] bg-orange/20 border border-orange/30 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-orange uppercase">{event.date.split(" ")[0]}</span>
                    <span className="text-xl font-bold font-[family-name:var(--font-aldrich)] text-orange">
                      {event.date.split(" ")[1]?.replace(",", "")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/dashboard/communities/${event.community.slug}`}
                      className={`text-xs font-medium ${event.community.color} hover:underline`}
                    >
                      {event.community.name}
                    </Link>
                    <h3 className="text-lg font-semibold font-[family-name:var(--font-aldrich)] mt-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        {event.isVirtual ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        {event.isVirtual ? "Virtual" : event.location.split(",")[0]}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ""} attending
                      </span>
                    </div>
                    <div className="mt-4">
                      <Button className="rounded-[4px]">
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold font-[family-name:var(--font-aldrich)]">
          April 2026
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-[4px] w-8 h-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-[4px]">
            Today
          </Button>
          <Button variant="outline" size="icon" className="rounded-[4px] w-8 h-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* All Events List */}
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div 
            key={event.id}
            className="flex items-start gap-4 p-4 rounded-[4px] border border-border bg-card hover:border-primary/50 transition-colors"
          >
            {/* Date Box */}
            <div className="w-14 h-14 rounded-[4px] bg-secondary flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-xs text-muted-foreground uppercase">
                {event.date.split(" ")[0]}
              </span>
              <span className="text-lg font-bold font-[family-name:var(--font-aldrich)]">
                {event.date.split(" ")[1]?.replace(",", "").replace("-", "")}
              </span>
            </div>
            
            {/* Event Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={`${event.community.bgColor} ${event.community.color} border-current text-xs`}>
                  {event.community.name}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {event.type}
                </Badge>
                {event.isVirtual && (
                  <Badge variant="outline" className="text-xs">
                    <Video className="w-3 h-3 mr-1" />
                    Virtual
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold mt-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                {event.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {event.attendees} attending
                </span>
              </div>
            </div>
            
            {/* Action */}
            <Button variant="outline" size="sm" className="rounded-[4px] flex-shrink-0">
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
