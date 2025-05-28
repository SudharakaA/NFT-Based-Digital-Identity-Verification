
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, MessageCircle, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blockchain-500 to-nft-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">ID</span>
              </div>
              <span className="text-xl font-bold text-white">VerifyNFT</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The future of digital identity verification powered by blockchain technology. 
              Secure, decentralized, and user-owned identity management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Create Identity</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Verify Credentials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Access</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 VerifyNFT. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                ✓ Ethereum
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                ✓ Polygon
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                ✓ IPFS
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
