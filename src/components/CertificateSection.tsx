
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Award, Clock, Users } from "lucide-react";

const courses = [
  {
    title: "Blockchain Fundamentals",
    description: "Learn the basics of blockchain technology and cryptocurrency",
    duration: "2 hours",
    students: "1,234",
    certificate: "Blockchain Foundation Certificate",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop"
  },
  {
    title: "Smart Contract Development",
    description: "Master Solidity and build your first smart contracts",
    duration: "4 hours",
    students: "856",
    certificate: "Smart Contract Developer Certificate",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=250&fit=crop"
  },
  {
    title: "DeFi & Web3 Applications",
    description: "Explore decentralized finance and Web3 ecosystem",
    duration: "3 hours",
    students: "2,145",
    certificate: "DeFi Specialist Certificate",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop"
  }
];

const CertificateSection = () => {
  return (
    <section id="certificates" className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-nft-500 to-purple-500 text-white border-0">
            📚 Learn & Earn
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Watch. Learn. Get Certified.
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete educational content and receive blockchain-verified certificates as NFTs. 
            Build your verifiable skill portfolio while learning cutting-edge technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <Card key={index} className="glass-effect border-gray-700 hover:glow-border transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-white text-xl">{course.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-nft-500/20 to-purple-500/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center text-nft-400 mb-1">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Certificate NFT</span>
                  </div>
                  <p className="text-sm text-gray-300">{course.certificate}</p>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-nft-500 to-purple-500 hover:from-nft-600 hover:to-purple-600 text-white">
                  Start Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
