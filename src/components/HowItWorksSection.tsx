
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, FileImage, Shield, Award } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Link your MetaMask or compatible Web3 wallet to get started with the platform.",
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "02",
    icon: FileImage,
    title: "Create Identity NFT",
    description: "Mint your unique digital identity as an NFT with your verified information stored on IPFS.",
    color: "from-purple-500 to-purple-600"
  },
  {
    number: "03",
    icon: Shield,
    title: "Verify On-Chain",
    description: "Your identity is verified and stored immutably on the blockchain for maximum security.",
    color: "from-green-500 to-green-600"
  },
  {
    number: "04",
    icon: Award,
    title: "Earn Certificates",
    description: "Watch educational content and automatically receive blockchain certificates upon completion.",
    color: "from-orange-500 to-orange-600"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get started with your decentralized identity in just four simple steps. 
            Our streamlined process makes blockchain identity accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="glass-effect border-gray-700 text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:animate-pulse`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-nft-500 to-nft-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection lines for desktop */}
        <div className="hidden lg:block relative -mt-32 mb-20">
          <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blockchain-500 to-nft-500 opacity-30"></div>
          <div className="absolute top-8 left-1/2 right-1/4 h-0.5 bg-gradient-to-r from-blockchain-500 to-nft-500 opacity-30 transform translate-x-8"></div>
          <div className="absolute top-8 left-3/4 right-0 h-0.5 bg-gradient-to-r from-blockchain-500 to-nft-500 opacity-30 transform translate-x-16"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
