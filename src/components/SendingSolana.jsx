import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

function SendingSolana() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const sendTokens = async () => {
    let to = document.getElementById('to').value;
    let amount = document.getElementById('amount').value;

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    );

    await wallet.sendTransaction(transaction, connection);
    alert(`Sent ${amount} SOL to ${to}`);
  };

  return (
    <div className="relative w-full h-full">
      {/* Glowing background effect */}
      {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 rounded-3xl blur-xl opacity-75 animate-pulse"></div> */}

      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8 rounded-xl border border-purple-500/20 backdrop-blur-xl shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-lg"></div>

        {/* Header */}
        <div className="relative mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
            Send Solana
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">Transfer SOL to any wallet address</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6 relative">
          {/* Recipient Address Field */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2 sm:mb-3">
              Recipient Address
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <input
                id="to"
                type="text"
                placeholder="Enter wallet address..."
                className="relative w-full px-3 py-3 sm:px-6 sm:py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl sm:rounded-2xl text-white placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm font-mono text-xs sm:text-sm pr-10 sm:pr-12"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Amount Field */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2 sm:mb-3">
              Amount (SOL)
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <input
                id="amount"
                type="text"
                placeholder="0.00"
                className="relative w-full px-3 py-3 sm:px-6 sm:py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl sm:rounded-2xl text-white placeholder-slate-400 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm text-base sm:text-lg font-semibold pr-16 sm:pr-20"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
                <span className="text-xs font-medium text-slate-400 bg-slate-700/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg">
                  SOL
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Send Button */}
          <div className="pt-2 sm:pt-4">
            <button
              onClick={sendTokens}
              className="group relative w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>Send Solana</span>
              </div>

              {/* Button shine effect */}
              <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
            </button>
          </div>
        </div>

        {/* Security indicator */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-700/50">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Secured by Solana Network</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendingSolana;
