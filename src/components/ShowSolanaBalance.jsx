import { useConnection, useWallet } from '@solana/wallet-adapter-react';

function ShowSolanaBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();

  async function getBalance() {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      document.getElementById('balance').innerText = (balance / 1000000000).toFixed(2) + ' SOL';
    }
  }

  getBalance();
  return (
    <div className="w-full relative">
      <div
        style={{
          background: '#000000',
          backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)
      `,
          backgroundSize: '20px 20px, 20px 20px, 20px 20px',
          backgroundPosition: '0 0, 0 0, 0 0',
          padding: '32px',
          borderRadius: '20px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.15)',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
        <h2
          style={{
            color: 'white',
            marginBottom: '24px',
            fontSize: '24px',
            fontWeight: '700',
            marginTop: '0',
          }}>
          Wallet Balance
        </h2>
        <p
          style={{
            display: 'flex',
            fontSize: '32px',
            color: 'white',
            fontWeight: '300',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0',
            letterSpacing: '1px',
          }}>
          <div id="balance" style={{ marginLeft: '8px', fontWeight: '600' }}>
            0.00 SOL
          </div>
        </p>
      </div>
    </div>
  );
}

export default ShowSolanaBalance;
