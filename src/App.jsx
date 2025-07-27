import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import RequestAirdrop from './components/RequestAirdrop';
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useMemo } from 'react';
import ShowSolanaBalance from './components/ShowSolanaBalance';
import SignMessage from './components/SignMessage';
import SendingSolana from './components/SendingSolana';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
      }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                maxWidth: '80%',
                margin: '0 auto',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '24px',
                padding: '40px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
              }}>
              <h1
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: '36px',
                  fontWeight: '700',
                  marginBottom: '40px',
                  marginTop: '0',
                  letterSpacing: '1px',
                }}>
                Solana Wallet
              </h1>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '40px',
                  flexWrap: 'wrap',
                }}>
                <WalletMultiButton
                  style={{
                    // backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    border: 'none',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)',
                  }}
                />
                <WalletDisconnectButton
                  style={{
                    // backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    border: 'none',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </div>

              <ShowSolanaBalance />
              <RequestAirdrop />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '24px',
                  marginTop: '40px',
                }}>
                <SignMessage />
                <SendingSolana />
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
