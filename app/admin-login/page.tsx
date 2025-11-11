'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.email === 'admin@swamiye.com' && formData.password === 'admin123') {
      localStorage.setItem('admin-auth', 'true');
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin dashboard',
      });
      router.push('/admin/dashboard');
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-blue-300 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
            <p className="text-center text-amber-100 text-sm">Swamiye NearMe Administration</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@swamiye.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 font-semibold"
                disabled={loading}
                size="lg"
              >
                {loading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>
            </form>

            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Email: admin@swamiye.com</p>
              <p>Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
