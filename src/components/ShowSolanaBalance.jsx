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
    <>
      <p style={{display: 'flex', fontSize: '20px'}}>
        Your Solana balance is: <div id="balance" style={{marginLeft: '4px'}}></div>
      </p>
    </>
  );
}

export default ShowSolanaBalance;
