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
            <RequestAirdrop />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
