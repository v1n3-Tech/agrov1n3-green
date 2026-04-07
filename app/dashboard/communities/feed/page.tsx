import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  MessageCircle, 
  Filter,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Clock,
  Heart,
  MessageSquare,
  Repeat2,
  Bookmark,
  MoreHorizontal,
  Pin,
} from "lucide-react"
import { getUserProfile } from "@/lib/auth/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock feed data - aggregated from all communities
const feedPosts = [
  {
    id: 1,
    author: { name: "John Farmer", username: "johnfarmer", avatar: "", role: "Agro Executive" },
    community: { name: "Crop Farming", slug: "crop-farming", color: "text-green-500" },
    content: "Just harvested my first batch of tomatoes using the drip irrigation system recommended by the community. The yield increased by 40%! Thank you all for the guidance.",
    likes: 45,
    comments: 12,
    shares: 5,
    time: "2 hours ago",
    isPinned: false,
  },
  {
    id: 2,
    author: { name: "Tech Innovator", username: "techinnovator", avatar: "", role: "Expert Advisor" },
    community: { name: "Agro Technology", slug: "agro-technology", color: "text-cyan-500" },
    content: "New drone mapping service launched for Plateau farmers! Contact us for free demo sessions this week. Precision agriculture is the future.",
    likes: 89,
    comments: 34,
    shares: 56,
    time: "4 hours ago",
    isPinned: true,
  },
  {
    id: 3,
    author: { name: "Market Expert", username: "marketexpert", avatar: "", role: "LGPA" },
    community: { name: "Agro Marketing", slug: "agro-marketing", color: "text-blue-500" },
    content: "Current market prices update: Tomatoes N8,000/basket, Irish Potato N12,000/bag, Maize N18,000/bag. Prices expected to rise next month.",
    likes: 156,
    comments: 67,
    shares: 89,
    time: "6 hours ago",
    isPinned: false,
  },
  {
    id: 4,
    author: { name: "Dr. Veterinary", username: "drvet", avatar: "", role: "Expert Advisor" },
    community: { name: "Animal Farming", slug: "animal-farming", color: "text-amber-500" },
    content: "Reminder: Vaccination campaign for Newcastle disease starts next week. All poultry farmers should register at their nearest veterinary office.",
    likes: 67,
    comments: 23,
    shares: 45,
    time: "8 hours ago",
    isPinned: false,
  },
  {
    id: 5,
    author: { name: "Process Expert", username: "processexpert", avatar: "", role: "GCM" },
    community: { name: "Agro Processing", slug: "agro-processing", color: "text-orange-500" },
    content: "Workshop announcement: Learn how to process and package tomato paste for longer shelf life. This Saturday at the community center.",
    likes: 34,
    comments: 12,
    shares: 8,
    time: "12 hours ago",
    isPinned: false,
  },
]

export default async function ActivityFeedPage() {
  const profile = await getUserProfile()
  
  if (!profile) {
    redirect("/sign-in")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-aldrich)] text-foreground">
            Activity Feed
          </h1>
          <p className="text-muted-foreground mt-1">
            Updates from all communities you follow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] rounded-[4px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="rounded-[4px]">
              <SelectItem value="all">All Communities</SelectItem>
              <SelectItem value="my">My Community</SelectItem>
              <SelectItem value="following">Following</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="latest">
            <SelectTrigger className="w-[140px] rounded-[4px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className="rounded-[4px]">
              <SelectItem value="latest">
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Latest
                </span>
              </SelectItem>
              <SelectItem value="trending">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Trending
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Create Post */}
      <div className="rounded-[4px] border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 rounded-[4px]">
            <AvatarImage src={profile.avatar_url || ""} />
            <AvatarFallback className="rounded-[4px] bg-primary/20 text-primary">
              {profile.first_name?.[0] || profile.username?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-secondary/50 rounded-[4px] px-4 py-2.5 text-muted-foreground text-sm cursor-pointer hover:bg-secondary transition-colors">
              Share something with the community...
            </div>
          </div>
          <Button className="rounded-[4px]">
            <Sparkles className="w-4 h-4 mr-2" />
            Post
          </Button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {feedPosts.map((post) => (
          <div 
            key={post.id} 
            className={`rounded-[4px] border ${post.isPinned ? 'border-2 border-primary/30' : 'border-border'} bg-card p-4`}
          >
            {post.isPinned && (
              <div className="flex items-center gap-2 text-xs text-primary mb-3">
                <Pin className="w-3 h-3" />
                <span>Pinned announcement</span>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 rounded-[4px]">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="rounded-[4px] bg-secondary">
                  {post.author.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-semibold text-sm">{post.author.name}</span>
                  <span className="text-muted-foreground text-xs">@{post.author.username}</span>
                  <span className="text-muted-foreground text-xs">in</span>
                  <Link 
                    href={`/dashboard/communities/${post.community.slug}`}
                    className={`text-xs font-medium ${post.community.color} hover:underline`}
                  >
                    {post.community.name}
                  </Link>
                  <Badge variant="outline" className="text-xs py-0 h-5">
                    {post.author.role}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{post.time}</span>
                <p className="mt-2 text-sm">{post.content}</p>
                
                {/* Post Actions */}
                <div className="flex items-center gap-6 mt-4">
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors text-sm">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                    <Repeat2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-orange transition-colors text-sm ml-auto">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="rounded-[4px]">
          Load More Posts
        </Button>
      </div>
    </div>
  )
}
