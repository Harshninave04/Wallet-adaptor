import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Coins, Wallet, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const requestAirdrop = async () => {
    if (!wallet.publicKey) {
      setStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    const airdropAmount = parseFloat(amount);
    if (airdropAmount > 2) {
      setStatus({ type: 'error', message: 'Maximum airdrop amount is 2 SOL' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        airdropAmount * LAMPORTS_PER_SOL,
      );
      await connection.confirmTransaction(signature);
      setStatus({
        type: 'success',
        message: `Successfully airdropped ${airdropAmount} SOL to your wallet!`,
      });
      setAmount('');
    } catch (error) {
      console.error('Airdrop failed:', error);
      setStatus({
        type: 'error',
        message: 'Airdrop failed. Network may be congested, please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = ['0.5', '1.0', '2.0'];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-purple-500/20 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
            <Coins size={20} className="sm:w-7 sm:h-7 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Devnet Airdrop</h2>
            <p className="text-purple-300 text-xs sm:text-sm">Get testnet SOL for development</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-purple-300 uppercase tracking-wide">Network</p>
          <p className="text-purple-400 font-semibold text-sm sm:text-base">Solana Devnet</p>
        </div>
      </div>

      {/* Wallet Status */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-3">
          <Wallet
            size={18}
            className={`sm:w-5 sm:h-5 ${wallet.connected ? 'text-green-400' : 'text-red-400'}`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm sm:text-base">
              {wallet.connected ? 'Wallet Connected' : 'Wallet Not Connected'}
            </p>
            {wallet.publicKey && (
              <p className="text-slate-400 text-xs sm:text-sm font-mono truncate">
                {wallet.publicKey.toString().slice(0, 8)}...{wallet.publicKey.toString().slice(-8)}
              </p>
            )}
          </div>
          <div
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              wallet.connected ? 'bg-green-400' : 'bg-red-400'
            } animate-pulse flex-shrink-0`}></div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-2 sm:mb-3">
            Airdrop Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              max="2"
              min="0.1"
              step="0.1"
              className="w-full bg-slate-800/50 border border-slate-700/50 text-white text-lg sm:text-xl font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all placeholder-slate-500"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-purple-400 font-semibold text-sm sm:text-base">
              SOL
            </div>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs sm:text-sm text-purple-300 py-2">Quick select:</span>
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className="px-2 sm:px-3 py-1 bg-slate-700/50 hover:bg-purple-600/30 text-purple-300 hover:text-white text-xs sm:text-sm rounded-lg border border-slate-600/50 hover:border-purple-500/50 transition-all">
              {quickAmount}
            </button>
          ))}
        </div>
      </div>

      {/* Status Messages */}
      {status.message && (
        <div
          className={`mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl border flex items-start gap-3 ${
            status.type === 'success'
              ? 'bg-green-900/30 border-green-500/30 text-green-400'
              : 'bg-red-900/30 border-red-500/30 text-red-400'
          }`}>
          {status.type === 'success' ? (
            <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-xs sm:text-sm font-medium break-words">{status.message}</p>
        </div>
      )}

      {/* Request Button */}
      <button
        onClick={requestAirdrop}
        disabled={loading || !wallet.connected}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 sm:gap-3">
        {loading ? (
          <>
            <RefreshCw size={20} className="sm:w-6 sm:h-6 animate-spin" />
            <span className="text-sm sm:text-base">Processing Request...</span>
          </>
        ) : (
          <>
            <Coins size={20} className="sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base">Request Airdrop</span>
          </>
        )}
      </button>

      {/* Footer Info */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-xs sm:text-sm">
          <div className="text-slate-400 space-y-1">
            <p>• Maximum: 2 SOL per request</p>
            <p>• Rate limited to prevent abuse</p>
          </div>
          <div className="text-left sm:text-right text-slate-400 space-y-1">
            <p className="text-xs">Testnet Only</p>
            <p className="text-xs">No Real Value</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestAirdrop;
