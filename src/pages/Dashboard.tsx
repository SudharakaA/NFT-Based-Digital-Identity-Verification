
import { useWeb3 } from "@/contexts/Web3Context";
import WalletConnection from "@/components/WalletConnection";
import VideoUpload from "@/components/VideoUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Award, Video, Users } from "lucide-react";

const Dashboard = () => {
  const { isConnected, account } = useWeb3();

  const stats = [
    {
      title: "Videos Watched",
      value: "12",
      icon: Video,
      color: "text-blue-400"
    },
    {
      title: "Certificates Earned",
      value: "8",
      icon: Award,
      color: "text-yellow-400"
    },
    {
      title: "Identity Verified",
      value: isConnected ? "Yes" : "No",
      icon: Shield,
      color: isConnected ? "text-green-400" : "text-red-400"
    },
    {
      title: "Reputation Score",
      value: "85",
      icon: Users,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-gray-300">
            Manage your digital identity, upload content, and track your achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet & Upload */}
          <div className="lg:col-span-1 space-y-6">
            <WalletConnection />
            <VideoUpload />
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-effect border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardDescription className="text-gray-400">
                        {stat.title}
                      </CardDescription>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription>
                  Your latest interactions and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isConnected ? (
                    <>
                      <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <Shield className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white text-sm">Wallet Connected</p>
                          <p className="text-gray-400 text-xs">
                            {account?.slice(0, 10)}...{account?.slice(-4)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-white text-sm">Certificate Earned</p>
                          <p className="text-gray-400 text-xs">Blockchain Fundamentals</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Connect your wallet to see activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
