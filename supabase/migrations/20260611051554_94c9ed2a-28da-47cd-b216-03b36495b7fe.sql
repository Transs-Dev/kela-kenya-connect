
CREATE POLICY "media_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "media_public_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "media_public_update" ON storage.objects FOR UPDATE USING (bucket_id = 'media');
CREATE POLICY "media_public_delete" ON storage.objects FOR DELETE USING (bucket_id = 'media');
