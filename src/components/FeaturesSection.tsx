
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, Coins, Users, Lock, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "NFT Identity Minting",
    description: "Create your unique, tamper-proof digital identity as an NFT stored securely on the blockchain.",
    color: "text-blockchain-400"
  },
  {
    icon: FileCheck,
    title: "On-Chain Verification",
    description: "Decentralized authentication system that verifies identities without central authorities.",
    color: "text-green-400"
  },
  {
    icon: Lock,
    title: "Immutable & Secure",
    description: "Leverage Ethereum/Polygon blockchain technology for maximum transparency and security.",
    color: "text-nft-400"
  },
  {
    icon: Coins,
    title: "IPFS Storage",
    description: "Store metadata securely on IPFS for enhanced privacy and decentralized access.",
    color: "text-yellow-400"
  },
  {
    icon: Award,
    title: "Digital Certificates",
    description: "Watch educational content and earn blockchain-verified certificates upon completion.",
    color: "text-blue-400"
  },
  {
    icon: Users,
    title: "Reputation System",
    description: "Build your decentralized reputation based on verified achievements and interactions.",
    color: "text-purple-400"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Revolutionary Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our NFT-based identity system transforms digital verification 
            and credential management through cutting-edge blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect border-gray-700 hover:glow-border transition-all duration-300 group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
