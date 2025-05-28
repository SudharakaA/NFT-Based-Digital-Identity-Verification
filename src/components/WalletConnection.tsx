
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Copy, Check } from "lucide-react";
import { useWeb3 } from "@/contexts/Web3Context";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const WalletConnection = () => {
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet, balance, chainId } = useWeb3();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (account) {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1: return 'Ethereum';
      case 137: return 'Polygon';
      case 11155111: return 'Sepolia';
      default: return 'Unknown';
    }
  };

  if (isConnected) {
    return (
      <div className="glass-effect rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-300">Connected</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={disconnectWallet}
            className="text-red-400 hover:text-red-300"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-white font-mono text-sm">{formatAddress(account!)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="p-1 h-auto"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </Button>
          </div>
          
          <div className="text-xs text-gray-400">
            <div>Balance: {parseFloat(balance).toFixed(4)} ETH</div>
            {chainId && <div>Network: {getNetworkName(chainId)}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button 
      onClick={connectWallet} 
      disabled={isConnecting}
      variant="outline" 
      className="text-white border-white hover:bg-white hover:text-black"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnection;
