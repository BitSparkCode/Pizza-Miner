import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-4">
            <GraduationCap className="w-10 h-10 text-purple-700" />
          </div>
          <div className="space-y-2 text-gray-600">
            <p className="font-medium">Bern University of Applied Sciences</p>
            <p>Industrial Engineering and Management Science</p>
            <p>Process Analysis and Optimization</p>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Created by Moritz Maier
          </p>
        </div>
      </div>
    </footer>
  );
}