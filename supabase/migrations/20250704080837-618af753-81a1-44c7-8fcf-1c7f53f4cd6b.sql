
-- Create storage buckets for profile pictures and workout videos
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('profile-pictures', 'profile-pictures', true),
  ('workout-videos', 'workout-videos', true);

-- Create policies for profile pictures bucket
CREATE POLICY "Anyone can view profile pictures" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-pictures');

CREATE POLICY "Anyone can upload profile pictures" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-pictures');

CREATE POLICY "Anyone can update their profile pictures" ON storage.objects
  FOR UPDATE USING (bucket_id = 'profile-pictures');

CREATE POLICY "Anyone can delete their profile pictures" ON storage.objects
  FOR DELETE USING (bucket_id = 'profile-pictures');

-- Create policies for workout videos bucket
CREATE POLICY "Anyone can view workout videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'workout-videos');

CREATE POLICY "Anyone can upload workout videos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'workout-videos');

CREATE POLICY "Anyone can update their workout videos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'workout-videos');

CREATE POLICY "Anyone can delete their workout videos" ON storage.objects
  FOR DELETE USING (bucket_id = 'workout-videos');
