# 🚀 Solana Wallet Adapter — React Integration

A production-ready React starter implementation for integrating Solana Wallet Adapter into any dApp.  
With this setup, users can:

- 🔌 Connect / disconnect Solana wallets
- 💸 Send SOL transactions
- 🎁 Request testnet airdrops
- 🧰 Easily switch to any supported wallet provider

Built with **React** + **Solana Web3.js** + **Wallet Adapter**.

---

## 📦 Tech Stack

| Technology                          | Purpose                          |
|-------------------------------------|----------------------------------|
| **React**                           | Frontend UI                      |
| **@solana/web3.js**                 | Blockchain connection & transactions |
| **@solana/wallet-adapter**          | Wallet integration               |
| **@solana/wallet-adapter-react-ui** | Pre-built wallet UI components   |

---

## ✨ Features

- ✔ Connect multiple wallets (Phantom, Solflare, Backpack, etc.)
- ✔ Send SOL to any valid Solana address
- ✔ Request airdrop (Devnet/Testnet)
- ✔ Auto wallet reconnection
- ✔ Fully typed & modular structure
- ✔ Hook-based API for easy integration in components

---

## 🔧 Installation

Install the core dependencies:

```bash
npm install @solana/web3.js \
  @solana/wallet-adapter-base \
  @solana/wallet-adapter-react \
  @solana/wallet-adapter-react-ui \
  @solana/wallet-adapter-wallets
```

Also install peer dependencies:

```bash
npm install react react-dom
```

---

## 🧩 Usage

### 1️⃣ Wrap your app with the Wallet Provider

```tsx
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletConnectionProvider = ({ children }: { children: React.ReactNode }) => {
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
```

### 2️⃣ Use wallet actions inside components

#### Connect Button

```tsx
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const ConnectWallet = () => <WalletMultiButton />;
```

#### Send SOL

```tsx
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

export const SendSol = async (receiverAddress: string, amountSol: number) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  if (!publicKey) {
    throw new Error("Wallet not connected");
  }

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(receiverAddress),
      lamports: amountSol * LAMPORTS_PER_SOL,
    })
  );

  const sig = await sendTransaction(transaction, connection);
  console.log("Transaction Signature:", sig);
  return sig;
};
```

#### Airdrop SOL

```tsx
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const AirdropSol = async () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  if (!publicKey) {
    throw new Error("Wallet not connected");
  }

  const signature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(signature);
  console.log("Airdrop Signature:", signature);
};
```

---

## 🧪 Supported Networks

| Network | Status                  |
|---------|-------------------------|
| **Devnet** | ✔ Recommended for testing |
| **Testnet** | ✔                       |
| **Mainnet** | ✔ (requires real SOL)   |

Switch networks by updating the `network` constant:

```tsx
const network = WalletAdapterNetwork.Mainnet; // Example: Switch to Mainnet
```

---

## 🗂 Folder Structure (Recommended)

```
src/
├─ providers/
│  └─ WalletConnectionProvider.tsx
├─ components/
│  ├─ ConnectWallet.tsx
│  ├─ SendSol.tsx
│  └─ AirdropSol.tsx
└─ App.tsx
```

---

## 📌 Notes

- To request airdrops, use **Devnet** or **Testnet** (Mainnet does not support them).
- Always validate receiver addresses before sending funds to prevent errors.
- Phantom wallet does not support Testnet airdrops — stick to Devnet for compatibility.

---

## 🤝 Contribution

Contributions, suggestions, and PRs are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

MIT License — free to use in personal and commercial projects.

---

⭐ **If this project helped you — consider starring the repo!**

