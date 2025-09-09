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
        padding: '16px',
      }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                maxWidth: '95%',
                margin: '0 auto',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '20px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
              }}
              className="sm:max-w-[90%] lg:max-w-[80%] sm:rounded-3xl sm:p-8 lg:p-10">
              <h1
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  marginTop: '0',
                  letterSpacing: '1px',
                }}
                className="sm:text-3xl lg:text-4xl sm:mb-8 lg:mb-10">
                Solana Wallet
              </h1>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                }}
                className="sm:gap-4 sm:mb-8 lg:mb-10">
                <WalletMultiButton
                  style={{
                    borderRadius: '8px',
                    border: 'none',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)',
                  }}
                  className="sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
                />
                <WalletDisconnectButton
                  style={{
                    borderRadius: '8px',
                    border: 'none',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)',
                  }}
                  className="sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
                />
              </div>

              <div className="mb-6 sm:mb-8">
                <ShowSolanaBalance />
              </div>

              <div className="mb-6 sm:mb-8">
                <RequestAirdrop />
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: '16px',
                  marginTop: '24px',
                }}
                className="grid-cols-1 lg:grid-cols-2 sm:gap-6 sm:mt-8 lg:mt-10">
                <div className="w-full">
                  <SignMessage />
                </div>
                <div className="w-full">
                  <SendingSolana />
                </div>
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
