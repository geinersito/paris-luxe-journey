-- FIX-FLEET-IMAGES-01
-- The Fleet page (Flota) was showing wrong vehicle exterior images:
--   Berlina → AMG coupe  (photo-1618843479313-40f8afb4b4d8)
--   Van     → camper van (photo-1527786356703-4b100091cd2c)
--
-- Replace with correct Mercedes vehicle photos from Unsplash:
--   Berlina → black Mercedes-Benz E-Class sedan (photo-1559167628-9394a8576f33)
--   Van     → black Mercedes-Benz van on road   (photo-1578557904035-f68542b3770e)
--
-- Rollback:
--   UPDATE public.vehicles SET image_url = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&q=80'
--     WHERE id = 'd290f1ee-6c54-4b01-90e6-d701748f0851';
--   UPDATE public.vehicles SET image_url = 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop&q=80'
--     WHERE id = 'd290f1ee-6c54-4b01-90e6-d701748f0852';

UPDATE public.vehicles
SET image_url = 'https://images.unsplash.com/photo-1559167628-9394a8576f33?w=800&h=600&fit=crop&q=80'
WHERE id = 'd290f1ee-6c54-4b01-90e6-d701748f0851';

UPDATE public.vehicles
SET image_url = 'https://images.unsplash.com/photo-1578557904035-f68542b3770e?w=800&h=600&fit=crop&q=80'
WHERE id = 'd290f1ee-6c54-4b01-90e6-d701748f0852';
