# 🚀 Solana Wallet Adapter — React Integration

A production-ready React starter implementation for integrating Solana Wallet Adapter into any dApp.
With this setup, users can:

🔌 Connect / disconnect Solana wallets

💸 Send SOL transactions

🎁 Request testnet airdrops

🧰 Easily switch to any supported wallet provider


Built with React + Solana Web3.js + Wallet Adapter.


---

📦 Tech Stack

Technology	Purpose

React	Frontend UI
@solana/web3.js	Blockchain connection & transactions
@solana/wallet-adapter	Wallet integration
@solana/wallet-adapter-react-ui	Pre-built wallet UI components



---

✨ Features

✔ Connect multiple wallets (Phantom, Solflare, Backpack, etc.)
✔ Send SOL to any valid Solana address
✔ Request airdrop (Devnet/Testnet)
✔ Auto wallet reconnection
✔ Fully typed & modular structure
✔ Hook-based API for easy integration in components


---

🔧 Installation

npm install @solana/web3.js \
 @solana/wallet-adapter-base \
 @solana/wallet-adapter-react \
 @solana/wallet-adapter-react-ui \
 @solana/wallet-adapter-wallets

Also install peer dependencies:

npm install react react-dom


---

🧩 Usage

1️⃣ Wrap your app with the Wallet Provider

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletConnectionProvider = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = "https://api.devnet.solana.com";

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

2️⃣ Use wallet actions inside components

Connect Button

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const ConnectWallet = () => <WalletMultiButton />;

Send SOL

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

export const SendSol = async (receiverAddress: string, amountSol: number) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey!,
      toPubkey: new PublicKey(receiverAddress),
      lamports: amountSol * LAMPORTS_PER_SOL,
    })
  );

  const sig = await sendTransaction(transaction, connection);
  console.log("Transaction Signature:", sig);
};

Airdrop SOL

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const AirdropSol = async () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  await connection.requestAirdrop(publicKey!, 1 * LAMPORTS_PER_SOL);
};


---

🧪 Supported Networks

Network	Status

Devnet	✔ Recommended for testing
Testnet	✔
Mainnet	✔ (requires real SOL)


Switch by changing:

WalletAdapterNetwork.Devnet ➜ WalletAdapterNetwork.Mainnet


---

🗂 Folder Structure (recommended)

src/
 ├─ providers/
 │   └─ WalletConnectionProvider.tsx
 ├─ components/
 │   ├─ ConnectWallet.tsx
 │   ├─ SendSol.tsx
 │   └─ AirdropSol.tsx
 └─ App.tsx


---

📌 Notes

To airdrop SOL, you must use Devnet/Testnet (not Mainnet).

Always validate addresses before sending funds.

Phantom wallet does not support Testnet airdrops — use Devnet instead.



---

🤝 Contribution

Contributions, suggestions and PRs are welcome!


---

📄 License

MIT License — feel free to use this setup in personal and commercial projects.


---

⭐ If this project helped you — consider starring the repo!

