'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import NinVerification from './NinVerification';

export default function NinVerificationBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock function to verify NIN - replace with actual API call
  const verifyNin = async (nin: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, consider NINs starting with '1' as valid
    return nin.startsWith('1');
  };

  if (!isBannerOpen) return null;

  return (
    <>
      <div className="relative bg-[#16A34A] overflow-hidden">
        <div className="relative p-3 sm:p-4 md:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-14 2xl:gap-4">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-white/20 p-1.5 2xl:p-2 backdrop-blur-sm">
                  <AlertTriangle className="h-5 w-5 2xl:h-6 2xl:w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0 pr-8 sm:pr-0">
                <h3 className="text-sm 2xl:text-base font-semibold text-white mb-0.5 sm:mb-1">
                  Complete Your NIN Verification
                </h3>
                <p className="text-xs 2xl:text-sm text-green-50 leading-relaxed">
                  Unlock full access to government services and features by verifying your National Identity Number.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 sm:ml-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 2xl:px-5 2xl:py-2.5 border border-transparent text-xs 2xl:text-sm font-semibold rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 whitespace-nowrap"
              >
                Verify NIN Now
              </button>

              <button
                type="button"
                className="flex-shrink-0 rounded-lg p-1 2xl:p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white absolute top-3 right-3 sm:static"
                onClick={() => setIsBannerOpen(false)}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-4 w-4 2xl:h-5 2xl:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <NinVerification
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerify={verifyNin}
      />
    </>
  );
}
