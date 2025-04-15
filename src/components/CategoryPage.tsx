import React from "react";
import { useParams } from "react-router-dom";
import BlogGrid from "./BlogGrid";
import Navigation from "./Navigation";
import ResponsiveNav from "./ResponsiveNav";
import { Badge } from "./ui/badge";

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

// Sample posts data for different categories
const allPosts: BlogPost[] = [
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
    title: "Sustainable Living: Small Changes with Big Impact",
    excerpt:
      "Learn how simple daily habits can contribute to a more sustainable and eco-friendly lifestyle. Discover practical tips for reducing your carbon footprint.",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    author: {
      name: "Emma Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    date: "May 8, 2023",
    readTime: "9 min read",
  },
  {
    id: "7",
    title: "The Art of Mindfulness: Finding Peace in a Busy World",
    excerpt:
      "Explore practical mindfulness techniques to reduce stress and improve mental wellbeing. Learn how to incorporate mindfulness into your daily routine.",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    author: {
      name: "Ryan Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
    },
    date: "May 5, 2023",
    readTime: "6 min read",
  },
  {
    id: "8",
    title: "Global Cuisine: A Journey Through Flavors",
    excerpt:
      "Embark on a culinary adventure exploring diverse dishes from around the world. Discover new recipes and cooking techniques from different cultures.",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    author: {
      name: "Olivia Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
    },
    date: "April 30, 2023",
    readTime: "8 min read",
  },
  {
    id: "9",
    title: "Digital Nomad Life: Working from Anywhere",
    excerpt:
      "Discover the realities of the digital nomad lifestyle and tips for remote work success. Learn how to balance work and travel while staying productive.",
    category: "Travel",
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
    author: {
      name: "Thomas Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas",
    },
    date: "May 12, 2023",
    readTime: "7 min read",
  },
];

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const formattedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  // Filter posts by category
  const filteredPosts = allPosts.filter(
    (post) =>
      post.category.toLowerCase() === formattedCategoryName.toLowerCase(),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <Badge className="mb-2 px-3 py-1 text-sm bg-category-technology">
            Category
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold">
            {formattedCategoryName}
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore our latest articles about{" "}
            {formattedCategoryName.toLowerCase()}
          </p>
        </div>

        {filteredPosts.length > 0 ? (
          <BlogGrid posts={filteredPosts} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium">
              No posts found in this category
            </h2>
            <p className="text-muted-foreground mt-2">
              Check back later for new content or explore other categories
            </p>
          </div>
        )}
      </div>

      <ResponsiveNav />
    </div>
  );
};

export default CategoryPage;
