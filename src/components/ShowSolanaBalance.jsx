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
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
  );
}

export default ShowSolanaBalance;
