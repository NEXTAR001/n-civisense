'use client';

import { useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface NinVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (nin: string) => Promise<boolean>;
}

const NinVerification: React.FC<NinVerificationProps> = ({ isOpen, onClose, onVerify }) => {
  const [nin, setNin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [verificationData, setVerificationData] = useState<any>(null);

  const handleSubmit = async () => {
    if (!nin.trim() || isLoading || nin.length !== 11) {
      console.log('Invalid NIN input:', { nin, length: nin.length, isLoading });
      return false;
    }
    
    setIsLoading(true);
    const requestBody = { nin: nin.trim() };
    console.log('Starting NIN verification with:', { requestBody });
    
    try {
      console.log('Sending request to /api/nin');
      const response = await fetch('/api/nin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Received response with status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
        console.log('Parsed response data:', data);
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }
      
      if (response.ok) {
        if (data.success) {
          console.log('NIN verification successful');
          setVerificationStatus('success');
          setVerificationData({
            name: data.data?.fullName || 'N/A',
            nin: nin,
            status: 'Verified',
            issueDate: data.data?.issueDate || new Date().toLocaleDateString(),
            ...(data.data || {})
          });
          return true;
        } else {
          console.error('Verification failed with success:false', data);
          throw new Error(data.message || 'Verification failed (success: false)');
        }
      } else {
        console.error('HTTP Error:', response.status, data);
        throw new Error(data.message || `Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error('NIN verification error:', error);
      setVerificationStatus('error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Call onVerify with the result
  const handleVerify = async () => {
    console.log('Starting verification process...');
    try {
      const result = await handleSubmit();
      if (result && typeof onVerify === 'function') {
        console.log('Calling onVerify callback with NIN:', nin);
        await onVerify(nin);
      } else {
        console.log('Verification not successful or onVerify is not a function');
      }
      return result;
    } catch (error) {
      console.error('Error in handleVerify:', error);
      throw error;
    }
  };

  const resetForm = () => {
    setNin('');
    setVerificationStatus('idle');
    setVerificationData(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 2xl:p-4">
      <div className="bg-white rounded-md 2xl:rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-4 right-4 2xl:top-5 2xl:right-5 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 2xl:p-8">
          {verificationStatus === 'idle' && (
            <>
              <div className="mb-5 2xl:mb-6">
                <h3 className="text-xl 2xl:text-2xl font-bold text-gray-900 mb-1.5 2xl:mb-2">Verify Your NIN</h3>
                <p className="text-sm 2xl:text-base text-gray-500">
                  Enter your 11-digit National Identification Number to verify your identity.
                </p>
              </div>

              <div className="space-y-5 2xl:space-y-6">
                <div>
                  <label htmlFor="nin" className="block text-xs 2xl:text-sm font-medium text-gray-700 mb-2">
                    NIN Number
                  </label>
                  <input
                    type="text"
                    id="nin"
                    value={nin}
                    onChange={(e) => setNin(e.target.value.replace(/\D/g, ''))}
                    onKeyPress={handleKeyPress}
                    placeholder="12345678901"
                    className="w-full px-3 py-2.5 2xl:px-4 2xl:py-3 border border-gray-200 rounded-lg 2xl:rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base 2xl:text-lg tracking-wider"
                    maxLength={11}
                  />
                  <p className="mt-1.5 2xl:mt-2 text-xs text-gray-400">Must be exactly 11 digits</p>
                </div>

                <div className="flex gap-2 2xl:gap-3 pt-1 2xl:pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="flex-1 px-3 py-2.5 2xl:px-4 2xl:py-3 text-xs 2xl:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg 2xl:rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleVerify}
                    className="flex-1 px-3 py-2.5 2xl:px-4 2xl:py-3 bg-green-600 text-white text-xs 2xl:text-sm font-semibold rounded-lg 2xl:rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled={isLoading || nin.length !== 11}
                  >
                    {isLoading ? 'Verifying...' : 'Verify Now'}
                  </button>
                </div>
              </div>
            </>
          )}

          {verificationStatus === 'success' && verificationData && (
            <div className="text-center py-4 2xl:py-6">
              <div className="mx-auto flex items-center justify-center h-14 w-14 2xl:h-16 2xl:w-16 rounded-full bg-green-50 mb-5 2xl:mb-6">
                <CheckCircle className="h-7 w-7 2xl:h-8 2xl:w-8 text-green-600" />
              </div>
              
              <h3 className="text-xl 2xl:text-2xl font-bold text-gray-900 mb-1.5 2xl:mb-2">Verification Successful!</h3>
              <p className="text-sm 2xl:text-base text-gray-500 mb-6 2xl:mb-8">Your identity has been verified</p>
              
              <div className="bg-gray-50 rounded-lg 2xl:rounded-md p-4 2xl:p-6 text-left space-y-2.5 2xl:space-y-3 mb-6 2xl:mb-8">
                <div className="flex justify-between">
                  <span className="text-xs 2xl:text-sm text-gray-500">Name</span>
                  <span className="text-xs 2xl:text-sm font-medium text-gray-900">{verificationData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs 2xl:text-sm text-gray-500">NIN</span>
                  <span className="text-xs 2xl:text-sm font-medium text-gray-900">{verificationData.nin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs 2xl:text-sm text-gray-500">Status</span>
                  <span className="text-xs 2xl:text-sm font-medium text-green-600">{verificationData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs 2xl:text-sm text-gray-500">Issue Date</span>
                  <span className="text-xs 2xl:text-sm font-medium text-gray-900">{verificationData.issueDate}</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="w-full px-4 py-2.5 2xl:py-3 bg-green-600 text-white text-xs 2xl:text-sm font-semibold rounded-lg 2xl:rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
              >
                Done
              </button>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="text-center py-4 2xl:py-6">
              <div className="mx-auto flex items-center justify-center h-14 w-14 2xl:h-16 2xl:w-16 rounded-full bg-red-50 mb-5 2xl:mb-6">
                <XCircle className="h-7 w-7 2xl:h-8 2xl:w-8 text-red-600" />
              </div>
              
              <h3 className="text-xl 2xl:text-2xl font-bold text-gray-900 mb-1.5 2xl:mb-2">Verification Failed</h3>
              <p className="text-sm 2xl:text-base text-gray-500 mb-6 2xl:mb-8">
                We couldn't verify your NIN. Please check the number and try again.
              </p>
              
              <button
                onClick={resetForm}
                className="w-full px-4 py-2.5 2xl:py-3 bg-green-600 text-white text-xs 2xl:text-sm font-semibold rounded-lg 2xl:rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NinVerification;