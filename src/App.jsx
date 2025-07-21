import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import RequestAirdrop from './components/RequestAirdrop';
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
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
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                display: 'flex',
                maxWidth: '400px',
              }}>
              <WalletMultiButton style={{ marginLeft: '16px', height: '40px', width: 'auto' }} />
              <WalletDisconnectButton
                style={{ marginLeft: '16px', height: '40px', width: 'auto' }}
              />
            </div>
            <ShowSolanaBalance />
            <RequestAirdrop />
            <span ><p>Sign Message</p></span>
            <SignMessage />
            <span><p>Send Solana</p></span>
            <SendingSolana />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
