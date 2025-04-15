import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const categories = [
    { name: "Technology", path: "/category/technology" },
    { name: "Travel", path: "/category/travel" },
    { name: "Food", path: "/category/food" },
    { name: "Lifestyle", path: "/category/lifestyle" },
    { name: "Health", path: "/category/health" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              ModernBlog
            </Link>
          </div>

          {/* Categories - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-foreground hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search and User - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-foreground hover:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="text-foreground hover:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
