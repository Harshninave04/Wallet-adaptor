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
    <>
      <input id="to" type="text" placeholder="Recipient Address" />
      <input id="amount" type="text" placeholder="Amount" />
      <button onClick={sendTokens}>Send Solana</button>
    </>
  );
}

export default SendingSolana;
