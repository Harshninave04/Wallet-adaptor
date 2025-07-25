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
        message: `Successfully airdropped ${airdropAmount} SOL to your wallet!` 
      });
      setAmount('');
    } catch (error) {
      console.error('Airdrop failed:', error);
      setStatus({ 
        type: 'error', 
        message: 'Airdrop failed. Network may be congested, please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = ['0.5', '1.0', '2.0'];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 shadow-2xl border border-purple-500/20 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
            <Coins size={28} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Devnet Airdrop</h2>
            <p className="text-purple-300 text-sm">Get testnet SOL for development</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-purple-300 uppercase tracking-wide">Network</p>
          <p className="text-purple-400 font-semibold">Solana Devnet</p>
        </div>
      </div>

      {/* Wallet Status */}
      <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-3">
          <Wallet size={20} className={wallet.connected ? "text-green-400" : "text-red-400"} />
          <div className="flex-1">
            <p className="text-white font-medium">
              {wallet.connected ? 'Wallet Connected' : 'Wallet Not Connected'}
            </p>
            {wallet.publicKey && (
              <p className="text-slate-400 text-sm font-mono">
                {wallet.publicKey.toString().slice(0, 8)}...{wallet.publicKey.toString().slice(-8)}
              </p>
            )}
          </div>
          <div className={`w-3 h-3 rounded-full ${wallet.connected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-3">
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
              className="w-full bg-slate-800/50 border border-slate-700/50 text-white text-xl font-semibold px-6 py-4 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all placeholder-slate-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 font-semibold">
              SOL
            </div>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2">
          <span className="text-sm text-purple-300 py-2">Quick select:</span>
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className="px-3 py-1 bg-slate-700/50 hover:bg-purple-600/30 text-purple-300 hover:text-white text-sm rounded-lg border border-slate-600/50 hover:border-purple-500/50 transition-all"
            >
              {quickAmount}
            </button>
          ))}
        </div>
      </div>

      {/* Status Messages */}
      {status.message && (
        <div className={`mb-4 p-4 rounded-xl border flex items-center gap-3 ${
          status.type === 'success' 
            ? 'bg-green-900/30 border-green-500/30 text-green-400' 
            : 'bg-red-900/30 border-red-500/30 text-red-400'
        }`}>
          {status.type === 'success' ? (
            <CheckCircle size={20} className="text-green-400" />
          ) : (
            <AlertCircle size={20} className="text-red-400" />
          )}
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

      {/* Request Button */}
      <button
        onClick={requestAirdrop}
        disabled={loading || !wallet.connected}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <RefreshCw size={24} className="animate-spin" />
            Processing Request...
          </>
        ) : (
          <>
            <Coins size={24} />
            Request Airdrop
          </>
        )}
      </button>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
        <div className="flex items-center justify-between text-sm">
          <div className="text-slate-400">
            <p>• Maximum: 2 SOL per request</p>
            <p>• Rate limited to prevent abuse</p>
          </div>
          <div className="text-right text-slate-400">
            <p className="text-xs">Testnet Only</p>
            <p className="text-xs">No Real Value</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestAirdrop;