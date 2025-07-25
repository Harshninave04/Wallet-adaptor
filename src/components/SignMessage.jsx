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
    <div
      style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
        Sign Message
      </h3>
      <div style={{ marginBottom: '16px' }}>
        <input
          id="message"
          type="text"
          placeholder="Message"
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
        onClick={handleClick}
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
        Sign Message
      </button>
    </div>
  );
}

export default SignMessage;
