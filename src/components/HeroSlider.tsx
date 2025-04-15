import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Post {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
}

interface Ad {
  id: string;
  image: string;
  link: string;
  sponsor: string;
}

interface HeroSliderProps {
  posts?: Post[];
  ads?: Ad[];
  autoplaySpeed?: number;
}

const getCategoryColorClass = (category: string) => {
  const lowerCategory = category.toLowerCase();
  return `bg-category-${lowerCategory} shadow-md hover:opacity-90 transition-opacity`;
};

const HeroSlider = ({
  posts = [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2024",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
      excerpt:
        "Discover the cutting-edge technologies and methodologies shaping the future of web development.",
    },
    {
      id: "2",
      title: "Sustainable Living: Small Changes with Big Impact",
      category: "Lifestyle",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
      excerpt:
        "Learn how simple daily habits can contribute to a more sustainable and eco-friendly lifestyle.",
    },
    {
      id: "3",
      title: "The Art of Mindfulness: Finding Peace in a Busy World",
      category: "Wellness",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
      excerpt:
        "Explore practical mindfulness techniques to reduce stress and improve mental wellbeing.",
    },
    {
      id: "4",
      title: "Global Cuisine: A Journey Through Flavors",
      category: "Food",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
      excerpt:
        "Embark on a culinary adventure exploring diverse dishes from around the world.",
    },
    {
      id: "5",
      title: "Digital Nomad Life: Working from Anywhere",
      category: "Work",
      image:
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80",
      excerpt:
        "Discover the realities of the digital nomad lifestyle and tips for remote work success.",
    },
  ],
  ads = [
    {
      id: "ad1",
      image:
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&q=80",
      link: "https://example.com/ad1",
      sponsor: "TechGadgets Pro",
    },
    {
      id: "ad2",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
      link: "https://example.com/ad2",
      sponsor: "CodeMaster Academy",
    },
    {
      id: "ad3",
      image:
        "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1200&q=80",
      link: "https://example.com/ad3",
      sponsor: "DesignHub Tools",
    },
  ],
  autoplaySpeed = 5000,
}: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showAd, setShowAd] = useState(false);

  // Toggle between content and ad every 15 seconds
  useEffect(() => {
    const adInterval = setInterval(() => {
      setShowAd((prev) => !prev);
      if (!showAd) {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }
    }, 15000);

    return () => clearInterval(adInterval);
  }, [ads.length, showAd]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
      }, autoplaySpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, posts.length, autoplaySpeed]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + posts.length) % posts.length,
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative w-full h-[360px] overflow-hidden bg-background rounded-lg shadow-lg border border-muted/30">
        {/* Slider */}
        <AnimatePresence mode="wait">
          {!showAd ? (
            <motion.div
              key={`post-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${posts[currentIndex].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container max-w-4xl px-4 text-center text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Badge
                      className={`mb-4 ${getCategoryColorClass(posts[currentIndex].category)}`}
                    >
                      {posts[currentIndex].category}
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                      {posts[currentIndex].title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                      {posts[currentIndex].excerpt}
                    </p>
                    <Button variant="default" size="lg">
                      Read More
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`ad-${currentAdIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <a
                href={ads[currentAdIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${ads[currentAdIndex].image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container max-w-4xl px-4 text-center text-white">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <Badge variant="secondary" className="mb-4">
                        Sponsored
                      </Badge>
                      <h2 className="text-2xl md:text-4xl font-bold mb-4">
                        {ads[currentAdIndex].sponsor}
                      </h2>
                    </motion.div>
                  </div>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 border-none text-white hover:bg-black/50 z-10 shadow-md hover:scale-110 transition-transform"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 border-none text-white hover:bg-black/50 z-10 shadow-md hover:scale-110 transition-transform"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
