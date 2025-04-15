import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
}

interface AdSpace {
  id: string;
  image: string;
  link: string;
  sponsor: string;
}

interface BlogGridProps {
  posts?: BlogPost[];
  ads?: AdSpace[];
}

const BlogGrid = ({
  posts = defaultPosts,
  ads = defaultAds,
}: BlogGridProps) => {
  // Insert ads after every 3 posts
  const contentWithAds = [];
  let adIndex = 0;

  posts.forEach((post, index) => {
    contentWithAds.push({ type: "post", content: post });

    // Insert ad after every 3 posts
    if ((index + 1) % 3 === 0 && adIndex < ads.length) {
      contentWithAds.push({ type: "ad", content: ads[adIndex] });
      adIndex++;
    }
  });

  return (
    <div className="w-full bg-background py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentWithAds.map((item, index) => {
          if (item.type === "post") {
            const post = item.content as BlogPost;
            return <BlogPostCard key={`post-${post.id}`} post={post} />;
          } else {
            const ad = item.content as AdSpace;
            return <AdCard key={`ad-${ad.id}`} ad={ad} />;
          }
        })}
      </div>
    </div>
  );
};

const getCategoryColorClass = (category: string) => {
  const lowerCategory = category.toLowerCase();
  return `bg-category-${lowerCategory} hover:opacity-90 transition-opacity`;
};

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:translate-y-[-5px]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge
          className={`absolute top-3 left-3 shadow-md ${getCategoryColorClass(post.category)}`}
        >
          {post.category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary cursor-pointer transition-colors">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {post.excerpt}
        </p>
      </CardContent>

      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {post.author.name}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.date}
          </span>
          <span className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {post.readTime}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

const AdCard = ({ ad }: { ad: AdSpace }) => {
  return (
    <Card className="overflow-hidden border-dashed border-2 h-full hover:shadow-md transition-all duration-300 hover:border-primary/30">
      <div className="relative h-full">
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">
            Sponsored
          </Badge>
          <img
            src={ad.image}
            alt={`Advertisement by ${ad.sponsor}`}
            className="w-full h-full object-cover min-h-[250px]"
          />
          <div className="absolute bottom-3 right-3 text-xs text-white bg-black/50 px-2 py-1 rounded">
            {ad.sponsor}
          </div>
        </a>
      </div>
    </Card>
  );
};

// Default data for preview
const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2023",
    excerpt:
      "Explore the cutting-edge technologies and methodologies that are shaping the future of web development. From WebAssembly to Edge Computing, discover what's next.",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    author: {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    date: "May 15, 2023",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Mastering React Hooks: A Comprehensive Guide",
    excerpt:
      "Learn how to leverage the power of React Hooks to write cleaner, more efficient functional components. This guide covers everything from useState to custom hooks.",
    category: "Development",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    date: "April 28, 2023",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "The Psychology of User Experience: Designing for Emotion",
    excerpt:
      "Discover how understanding human psychology can help you create more engaging and effective user experiences. Learn practical techniques for emotional design.",
    category: "UX Design",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    author: {
      name: "Michael Torres",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    date: "May 2, 2023",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Building Scalable APIs with GraphQL and Node.js",
    excerpt:
      "Learn how to design and implement robust, scalable APIs using GraphQL and Node.js. This tutorial covers schema design, resolvers, and best practices.",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    author: {
      name: "Jessica Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
    },
    date: "May 10, 2023",
    readTime: "10 min read",
  },
  {
    id: "5",
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt:
      "Understand the strengths and weaknesses of CSS Grid and Flexbox, and learn when to use each layout system for optimal results in your web projects.",
    category: "CSS",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    author: {
      name: "David Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
    date: "April 22, 2023",
    readTime: "7 min read",
  },
  {
    id: "6",
    title: "Optimizing Web Performance: A Deep Dive",
    excerpt:
      "Explore advanced techniques for improving web performance, from code splitting to resource prioritization. Learn how to measure and optimize for real-world conditions.",
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    author: {
      name: "Emma Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    date: "May 8, 2023",
    readTime: "9 min read",
  },
  {
    id: "7",
    title: "Introduction to TypeScript for JavaScript Developers",
    excerpt:
      "Make the transition from JavaScript to TypeScript with this beginner-friendly guide. Learn about static typing, interfaces, and other key TypeScript features.",
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    author: {
      name: "Ryan Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
    },
    date: "May 5, 2023",
    readTime: "6 min read",
  },
  {
    id: "8",
    title: "Accessibility in Web Design: Best Practices",
    excerpt:
      "Learn how to create websites that are accessible to all users, including those with disabilities. This guide covers WCAG guidelines, ARIA roles, and testing tools.",
    category: "Accessibility",
    image:
      "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=800&q=80",
    author: {
      name: "Olivia Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
    },
    date: "April 30, 2023",
    readTime: "8 min read",
  },
  {
    id: "9",
    title: "The Complete Guide to Modern CSS Animation",
    excerpt:
      "Master the art of CSS animation with this comprehensive guide. Learn about keyframes, transitions, and how to create smooth, performant animations for the web.",
    category: "CSS",
    image:
      "https://images.unsplash.com/photo-1550063873-ab792950096b?w=800&q=80",
    author: {
      name: "Thomas Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas",
    },
    date: "May 12, 2023",
    readTime: "7 min read",
  },
];

const defaultAds: AdSpace[] = [
  {
    id: "ad1",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    link: "https://example.com/ad1",
    sponsor: "TechGadgets Pro",
  },
  {
    id: "ad2",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    link: "https://example.com/ad2",
    sponsor: "CodeMaster Academy",
  },
  {
    id: "ad3",
    image:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&q=80",
    link: "https://example.com/ad3",
    sponsor: "DesignHub Tools",
  },
];

export default BlogGrid;
