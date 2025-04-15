import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Mail } from "lucide-react";

interface SidebarProps {
  popularPosts?: Array<{
    id: string;
    title: string;
    image: string;
    date: string;
    views: number;
  }>;
}

const Sidebar = ({ popularPosts = [] }: SidebarProps) => {
  // Default popular posts if none provided
  const defaultPosts = [
    {
      id: "1",
      title: "The Future of Web Development in 2024",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80",
      date: "May 15, 2024",
      views: 1250,
    },
    {
      id: "2",
      title: "How AI is Transforming Content Creation",
      image:
        "https://images.unsplash.com/photo-1677442135136-760c813a743d?w=300&q=80",
      date: "May 10, 2024",
      views: 980,
    },
    {
      id: "3",
      title: "Essential UX Principles for Modern Websites",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&q=80",
      date: "May 5, 2024",
      views: 845,
    },
  ];

  const postsToDisplay = popularPosts.length > 0 ? popularPosts : defaultPosts;

  return (
    <div className="sticky top-4 w-full space-y-6 bg-background">
      {/* Popular Posts Section */}
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl">Popular Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {postsToDisplay.map((post) => (
            <div
              key={post.id}
              className="flex items-start space-x-3 group cursor-pointer"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="mx-1">•</span>
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full mt-2 group">
            View All Popular Posts
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl">Subscribe to Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get the latest posts and updates delivered straight to your inbox.
            </p>
            <div className="space-y-2">
              <Input placeholder="Your email address" type="email" />
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ad Space */}
      <Card className="overflow-hidden border-dashed hover:shadow-md transition-all duration-300 hover:border-primary/30">
        <div className="relative">
          <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
            Sponsored
          </Badge>
          <div className="p-4 text-center space-y-4 bg-muted/30">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=adspace"
                alt="Sponsor"
                className="w-12 h-12"
              />
            </div>
            <div>
              <h4 className="font-medium">Premium Membership</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Unlock exclusive content and features with our premium
                membership.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              Learn More
            </Button>
          </div>
        </div>
      </Card>

      {/* Author Section */}
      <Card className="hover:shadow-md transition-all duration-300">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=author"
                alt="Author"
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Alex Brennan</h3>
              <p className="text-sm text-muted-foreground">
                Senior Editor & Content Strategist
              </p>
            </div>
            <Separator />
            <p className="text-sm">
              Writing about technology, design trends, and digital culture for
              over a decade.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Profile
              </Button>
              <Button variant="outline" size="sm">
                Articles
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
