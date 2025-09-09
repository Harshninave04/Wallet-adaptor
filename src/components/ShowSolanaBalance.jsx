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
          borderRadius: '16px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.15)',
          marginBottom: '24px',
          textAlign: 'center',
        }}
        className="p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl mb-6 sm:mb-8">
        <h2
          style={{
            color: 'white',
            fontWeight: '700',
            marginTop: '0',
          }}
          className="mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl">
          Wallet Balance
        </h2>
        <p
          style={{
            display: 'flex',
            color: 'white',
            fontWeight: '300',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0',
            letterSpacing: '1px',
          }}
          className="text-2xl sm:text-3xl lg:text-4xl">
          <div id="balance" style={{ marginLeft: '8px', fontWeight: '600' }}>
            0.00 SOL
          </div>
        </p>
      </div>
    </div>
  );
}

export default ShowSolanaBalance;
