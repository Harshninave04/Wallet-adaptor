import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Download } from 'lucide-react';
import { useState } from 'react';

function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const requestAirdrop = async () => {
    if (!wallet.publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const airdropAmount = parseFloat(amount);
    if (airdropAmount > 2) {
      alert('Maximum airdrop amount is 2 SOL');
      return;
    }

    setLoading(true);
    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        airdropAmount * LAMPORTS_PER_SOL,
      );
      await connection.confirmTransaction(signature);
      alert(`Successfully airdropped ${airdropAmount} SOL!`);
      setAmount('');
    } catch (error) {
      console.error('Airdrop failed:', error);
      alert('Airdrop failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
        <Download size={24} className="text-green-600" />
        Request Airdrop
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (SOL)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (max 2 SOL)"
            max="2"
            min="0.1"
            step="0.1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <button
          onClick={requestAirdrop}
          disabled={loading || !wallet.connected}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
          {loading ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              Requesting...
            </>
          ) : (
            <>
              <Download size={20} />
              Request Airdrop
            </>
          )}
        </button>
      </div>
    </div>
  );
}


export default RequestAirdrop;
