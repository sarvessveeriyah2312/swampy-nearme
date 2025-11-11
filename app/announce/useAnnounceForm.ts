'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useAnnounceForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pooja_date: '',
    location_address: '',
    location_lat: 0,
    location_lng: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setFormData((prev) => ({ ...prev, location_lat: lat, location_lng: lng }));

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            const address = data.display_name || 'Location found';
            setFormData((prev) => ({ ...prev, location_address: address }));
            toast({
              title: 'Location Captured',
              description: 'Your address has been auto-filled from your coordinates',
            });
          } catch {
            toast({
              title: 'Location Warning',
              description: 'Coordinates set, but address lookup failed',
              variant: 'destructive',
            });
          }
        },
        () => {
          toast({
            title: 'Location Error',
            description: 'Could not access your location. Please enter it manually.',
            variant: 'destructive',
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('poojas')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            pooja_date: new Date(formData.pooja_date).toISOString(),
            location_address: formData.location_address,
            // Only include lat/lng if they exist
            location_lat: formData.location_lat || null,
            location_lng: formData.location_lng || null,
            status: 'approved',
          },
        ])
        .select();

      if (error) throw error;

      toast({
        title: 'Pooja announced successfully!',
        description: 'Your pooja has been added to the platform',
      });

      router.push(data && data[0] ? `/pooja/${data[0].id}` : '/poojas');
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to announce pooja. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleGetLocation, handleSubmit, loading, router };
};
