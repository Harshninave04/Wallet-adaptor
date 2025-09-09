import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

function SignMessage() {
  const { publicKey, signMessage } = useWallet();

  const handleClick = async () => {
    if (!publicKey) throw new Error('Wallet not connected');
    if (!signMessage) throw new Error('Wallet does not support signing messages!');

    const message = document.getElementById('message').value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      throw new Error('Signature verification failed');
    }

    alert('Message Signed successfully!', `Message signature: ${bs58.encode(signature)}`);
  };

  return (
    <div className="relative w-full h-full">
      {/* Animated background glow */}
      {/* <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div> */}

      <div className="relative bg-black p-4 sm:p-6 lg:p-8 rounded-xl border border-pink-500/20 backdrop-blur-xl shadow-2xl">
        {/* Header Section */}
        <div className="relative mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg transform hover:rotate-6 transition-transform duration-300">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-pink-200 to-red-200 bg-clip-text text-transparent mb-2">
            Sign Message
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">Cryptographically sign any message</p>
        </div>

        {/* Message Input Section */}
        <div className="relative mb-6 sm:mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-3 sm:mb-4">
            Your Message
          </label>

          <div className="group relative">
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl sm:rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Text area for message */}
            <textarea
              id="message"
              placeholder="Enter your message to sign..."
              rows="4"
              className="relative w-full px-3 py-3 sm:px-6 sm:py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl sm:rounded-2xl text-white placeholder-slate-400 focus:border-pink-400/50 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none text-sm sm:text-base"
            />

            {/* Character indicator */}
            <div className="absolute bottom-2 right-3 sm:bottom-3 sm:right-4 flex items-center space-x-2">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          {/* Message info */}
          <div className="mt-2 sm:mt-3 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <svg
                className="w-3 h-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs">Message will be UTF-8 encoded</span>
            </div>
          </div>
        </div>

        {/* Signature Process Visualization */}
        {/* <div className="mb-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Ed25519 Signature Ready</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure</span>
            </div>
          </div>
        </div> */}

        {/* Sign Button */}
        <button
          onClick={handleClick}
          className="group relative w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 hover:from-pink-500 hover:via-red-500 hover:to-orange-500 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 overflow-hidden mt-2 sm:mt-3">
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>Sign Message</span>
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white/70 rounded-full animate-spin opacity-0 group-active:opacity-100 transition-opacity duration-200"></div>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
        </button>

        {/* Security Footer */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-700/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs text-slate-400">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Verified Signature</span>
            </div>
            <div className="flex items-center justify-center sm:justify-end space-x-2">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Base58 Encoded</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignMessage;
