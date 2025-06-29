import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border text-muted-foreground">
      <div className="container px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start gap-3">
           <Link
				to='/'
				className='text-2xl border h-10 bg-primary/20   shadow-sm rounded-md pr-2 font-extrabold tracking-tight text-primary flex items-center justify-center gap-1'
			>
				<span className='bg-primary h-full  text-white flex justify-center items-center  px-2  rounded-l-md'>
					DSA
				</span>
				<span className='text-foreground'>Battle</span>
			</Link>
          <p className="text-sm leading-relaxed max-w-sm">
            Sharpen your DSA skills with quality problems, live battles, and a competitive leaderboard.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center  md:items-start mx-auto  gap-3">
          <h3 className="font-semibold text-foreground text-base text-start">Explore</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/problems" className="hover:text-primary transition-colors">Problems</Link></li>
            <li><Link to="/contests" className="hover:text-primary transition-colors">Contests</Link></li>
            <li><Link to="/battle" className="hover:text-primary transition-colors">Battle Mode</Link></li>
            <li><Link to="/discuss" className="hover:text-primary transition-colors">Discuss</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start mx-auto  gap-3">
          <h3 className="font-semibold text-foreground text-base">Follow Us</h3>
          <div className="flex gap-5">
            <a href="https://github.com/rdmondal100" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5 hover:text-primary transition-colors" />
            </a>
            <a href="https://x.com/rdmondal100" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-primary transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/ridaymondal100" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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
