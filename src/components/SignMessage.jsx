import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

function SignMessage() {
  const { publicKey, signMessage } = useWallet();

  const handleClick = async () => {
    if (!publicKey) throw new Error('Wallet not connected');
    if (!signMessage) throw new Error('Wallet does not support signing messages!');

    const message = document.getElementById('message').value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      throw new Error('Signature verification failed');
    }

    alert('Message Signed successfully!', `Message signature: ${bs58.encode(signature)}`);
  };
  return (
    <>
      <input
        id="message"
        type="text"
        placeholder="Message"
        style={{ color: 'white', backgroundColor: 'black', padding: '10px', marginRight: '4px' }}
      />
      <button
        onClick={handleClick}
        style={{ color: 'green', backgroundColor: 'greenyellow', padding: '10px' }}>
        Sign Message
      </button>
    </>
  );
}

export default SignMessage;
