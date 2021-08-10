import Greeter from "src/artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "src/artifacts/contracts/Token.sol/Token.json";
import { ethers } from "ethers";
import { useState } from "react";

console.log("Greeter.abi", Greeter.abi);

declare global {
  interface Window {
    // TODO: should eventually type this... not sure how yet
    ethereum: any;
  }
}

// Update with the contract address logged out to the CLI when it was deployed
const greeterAddressLocalhost = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddressLocalhost = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const greeterRopstenAddress = "0x57D9A56E5Fd3298b8e7620ef35bC5F8e75a0aFd9";
const greeterAddress = greeterAddressLocalhost;
const tokenAddress = tokenAddressLocalhost;

function App() {
  const [greeting, setGreetingValue] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState(null);

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      console.log("contract", contract);
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount} type="button">
          Request Account
        </button>
        <button onClick={fetchGreeting} type="button">
          Fetch Greeting
        </button>
        <button onClick={setGreeting} type="button">
          Set Greeting
        </button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
        />

        <br />
        <br />
        <button onClick={getBalance} type="button">
          Get Balance
        </button>
        <button onClick={sendCoins} type="button">
          Send Coins
        </button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </header>
    </div>
  );
}

export default App;
