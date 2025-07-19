
function App() {

  function handleConnect() {
    const amount = document.getElementById('amount').value;
    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    // Simulate a wallet connection and airdrop
    console.log(`Airdropping ${amount} tokens...`);
    alert(`Airdropped ${amount} tokens successfully!`);
    }
 

  return (
    <>
      <div>
        <h1>Welcome to Wallet adaptor!</h1>
        <p>
          This is a simple wallet adaptor example using React. You can connect
          your wallet and interact with it.
        </p>
        <input id="amount" type="text" placeholder="Amount" />
        <button onClick={handleConnect}>Airdrop</button>
      </div>
    </>
  )
}

export default App
