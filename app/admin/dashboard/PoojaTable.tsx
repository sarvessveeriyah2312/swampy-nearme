'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, MapPin, Trash2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Pooja } from '@/lib/supabase';

interface PoojaTableProps {
  poojas: Pooja[];
  loading: boolean;
  handleDelete: (id: string) => void;
}

export function PoojaTable({ poojas, loading, handleDelete }: PoojaTableProps) {
  if (loading)
    return <p className="text-center text-gray-600 py-8">Loading poojas...</p>;

  if (poojas.length === 0)
    return <p className="text-center text-gray-600 py-8">No poojas yet</p>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {poojas.map((pooja) => (
            <TableRow key={pooja.id}>
              <TableCell className="font-medium">
                <Link href={`/pooja/${pooja.id}`} className="text-blue-600 hover:underline">
                  {pooja.title}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div className="text-sm">
                    <p>{format(new Date(pooja.pooja_date), 'MMM d, yyyy')}</p>
                    <p className="text-gray-500">{format(new Date(pooja.pooja_date), 'h:mm a')}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{pooja.location_address}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                  <CheckCircle className="h-3 w-3" />
                  {pooja.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(pooja.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
