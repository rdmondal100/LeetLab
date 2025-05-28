import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border  text-muted-foreground">
      <div className="container px-3 py-12 flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-16 justify-between items-center sm:items-start text-center sm:text-left">
        
        {/* Brand Section */}
        <div className="max-w-sm flex flex-col gap-3 items-center sm:items-start">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2">
            <span className="bg-primary text-foreground px-2 py-0.5 rounded-md shadow-sm">
              DSA
            </span>
            <span className="text-muted-foreground">Battle</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Sharpen your DSA skills with quality problems, live battles, and a competitive leaderboard.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-foreground text-base mb-1">Explore</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/problems" className="hover:text-primary transition-colors">Problems</Link>
            </li>
            <li>
              <Link to="/contests" className="hover:text-primary transition-colors">Contests</Link>
            </li>
            <li>
              <Link to="/battle" className="hover:text-primary transition-colors">Battle Mode</Link>
            </li>
            <li>
              <Link to="/discuss" className="hover:text-primary transition-colors">Discuss</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <h3 className="font-semibold text-foreground text-base">Follow Us</h3>
          <div className="flex gap-5 mt-1">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5 hover:text-primary transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-primary transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground container">
        © {new Date().getFullYear()} DSA Battle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
