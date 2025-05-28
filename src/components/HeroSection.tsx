
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Globe, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <Badge className="mb-6 bg-gradient-to-r from-blockchain-500 to-nft-500 text-white border-0">
          🚀 Next-Gen Digital Identity Platform
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your Identity,
          <span className="bg-gradient-to-r from-blockchain-400 to-nft-400 bg-clip-text text-transparent"> Secured</span>
          <br />
          On The Blockchain
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Create tamper-proof digital identities as NFTs. Verify credentials securely. 
          Earn certificates by watching educational content. Welcome to the future of decentralized identity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-blockchain-500 to-blockchain-600 hover:from-blockchain-600 hover:to-blockchain-700 text-white border-0 px-8 py-3">
            Create Identity NFT
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black px-8 py-3">
            View Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-effect rounded-lg p-6">
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-8 h-8 text-blockchain-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">100% Secure</h3>
            <p className="text-gray-300">Blockchain-verified identities with immutable security</p>
          </div>
          
          <div className="glass-effect rounded-lg p-6">
            <div className="flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-nft-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Instant Verification</h3>
            <p className="text-gray-300">Lightning-fast identity verification in seconds</p>
          </div>
          
          <div className="glass-effect rounded-lg p-6">
            <div className="flex items-center justify-center mb-3">
              <Globe className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Global Access</h3>
            <p className="text-gray-300">Decentralized system accessible worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
