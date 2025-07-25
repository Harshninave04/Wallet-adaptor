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
    <div
      style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        marginBottom: '24px',
      }}>
      <h3
        style={{
          color: 'white',
          marginBottom: '16px',
          fontSize: '18px',
          fontWeight: '600',
          marginTop: '0',
        }}>
        Send Solana
      </h3>
      <div style={{ marginBottom: '12px' }}>
        <input
          id="to"
          type="text"
          placeholder="Recipient Address"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <input
          id="amount"
          type="text"
          placeholder="Amount"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <button
        onClick={sendTokens}
        style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          width: '100%',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.3)')}
        onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.2)')}>
        Send Solana
      </button>
    </div>
  );
}


export default SendingSolana;
