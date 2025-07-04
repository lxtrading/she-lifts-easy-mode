
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Upload, Video, Play, X, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WorkoutVideo {
  id: string;
  title: string;
  url: string;
  uploadDate: string;
  size: number;
}

export const WorkoutVideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<WorkoutVideo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const savedVideos = localStorage.getItem('workoutVideos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }
  }, []);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('Video file must be less than 50MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    if (!videoTitle.trim()) {
      toast.error('Please enter a title for your video');
      return;
    }

    setIsUploading(true);
    
    try {
      const fileName = `workout-${Date.now()}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('workout-videos')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('workout-videos')
        .getPublicUrl(fileName);

      const newVideo: WorkoutVideo = {
        id: Date.now().toString(),
        title: videoTitle,
        url: publicUrl,
        uploadDate: new Date().toLocaleDateString(),
        size: file.size
      };

      const updatedVideos = [...videos, newVideo];
      setVideos(updatedVideos);
      localStorage.setItem('workoutVideos', JSON.stringify(updatedVideos));
      
      setVideoTitle('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast.success('Workout video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteVideo = (videoId: string) => {
    const updatedVideos = videos.filter(video => video.id !== videoId);
    setVideos(updatedVideos);
    localStorage.setItem('workoutVideos', JSON.stringify(updatedVideos));
    toast.success('Video deleted');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="mr-2" size={20} />
          Workout Videos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <div className="text-center space-y-3">
            <Upload className="mx-auto text-gray-400" size={48} />
            <div>
              <h3 className="font-medium mb-2">Upload Workout Video</h3>
              <Input
                type="text"
                placeholder="Enter video title..."
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="mb-3"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                disabled={isUploading}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || !videoTitle.trim()}
                className="w-full"
              >
                {isUploading ? 'Uploading...' : 'Choose Video File'}
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Max file size: 50MB • Supported formats: MP4, MOV, AVI
              </p>
            </div>
          </div>
        </div>

        {/* Video Gallery */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{video.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar size={12} className="mr-1" />
                      {video.uploadDate} • {formatFileSize(video.size)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteVideo(video.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </Button>
                </div>
                
                <div className="relative">
                  <video
                    className="w-full h-48 bg-black rounded-lg object-cover"
                    controls
                    preload="metadata"
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Video size={48} className="mx-auto mb-3 opacity-50" />
            <p>No workout videos uploaded yet</p>
            <p className="text-sm">Record and upload your workouts to track your progress!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
