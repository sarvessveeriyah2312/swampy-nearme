'use client';
export const PoojaDescription = ({ description }: { description: string }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-amber-900 mb-3 font-serif flex items-center gap-3">
      <div className="w-2 h-8 bg-amber-600 rounded-full"></div>
      About This Sacred Gathering
    </h2>
    <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200">
      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{description}</p>
    </div>
  </div>
);
