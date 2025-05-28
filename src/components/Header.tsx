
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import WalletConnection from "./WalletConnection";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blockchain-500 to-nft-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ID</span>
            </div>
            <span className="text-xl font-bold text-white">VerifyNFT</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#certificates" className="text-gray-300 hover:text-white transition-colors">Certificates</a>
            <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <WalletConnection />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#certificates" className="text-gray-300 hover:text-white transition-colors">Certificates</a>
              <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
              <div className="mt-4">
                <WalletConnection />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
