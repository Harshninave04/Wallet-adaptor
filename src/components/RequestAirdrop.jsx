import { useConnection, useWallet } from '@solana/wallet-adapter-react';

function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  async function requestAirdrop() {
    const amount = document.getElementById('amount').value;
    if (!amount) {
      alert('Please enter an amount');
      return;
      }
      
    await connection.requestAirdrop(wallet.publicKey, amount * 1000000000)

    console.log(`Airdropping ${amount} tokens...`);
    alert(`Airdropped ${amount} tokens successfully to ${wallet.publicKey.toBase58()}`);
  }
  return (
    <>
      <input
        id="amount"
        type="text"
        placeholder="Amount"
        style={{ color: 'white', backgroundColor: 'black', padding: '10px', marginRight: '4px' }}
      />
      <button
        onClick={requestAirdrop}
        style={{ color: 'green', backgroundColor: 'greenyellow', padding: '10px' }}>
        Request Airdrop
      </button>
    </>
  );
}

export default RequestAirdrop;
