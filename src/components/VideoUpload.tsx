
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Play, X, FileVideo } from "lucide-react";
import { useWeb3 } from "@/contexts/Web3Context";
import { toast } from "@/components/ui/use-toast";

const VideoUpload = () => {
  const { isConnected } = useWeb3();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !isConnected) return;

    setIsUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Video uploaded successfully!",
        description: "Your video has been uploaded and is ready for processing",
      });
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your video",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isConnected) {
    return (
      <Card className="glass-effect border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileVideo className="w-5 h-5 mr-2" />
            Video Upload
          </CardTitle>
          <CardDescription>
            Please connect your wallet to upload videos
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileVideo className="w-5 h-5 mr-2" />
          Upload Educational Content
        </CardTitle>
        <CardDescription>
          Upload videos to earn blockchain certificates upon completion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedFile ? (
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">Drag and drop your video here, or</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Choose File
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: MP4, MOV, AVI, WebM (Max 100MB)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              {preview && (
                <video
                  src={preview}
                  controls
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <Button
                onClick={removeFile}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileVideo className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white truncate max-w-48">
                  {selectedFile.name}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {formatFileSize(selectedFile.size)}
              </span>
            </div>

            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-blockchain-500 to-nft-500 hover:from-blockchain-600 hover:to-nft-600"
            >
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUpload;
