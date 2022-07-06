// import Form from "./Form/Forms";
import Web3 from 'web3'
import { infoWallet } from './interface'
import "./App.css";
import { useState } from 'react';

export default function App() {
  const [infoMetaMaskWallet, setInfoMetaMaskWallet] = useState<infoWallet>()

  const getWeb3 = async () => {
    return new Promise(async (resolve, rejects) => {
      const web3 = new Web3(window.ethereum)

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts'})
        resolve(web3)
        console.log('bbbbbbbbbbbbbbbbb');
      } catch (error) {
        if (error instanceof Error) {
          rejects(error.message)
      }
      }

    })
  }

  const handleConnectWalletMetaMask = async () => {
    const web3: any = await getWeb3()
    console.log("🚀 ~ file: App.tsx ~ line 26 ~ useEffect ~ web3", web3)

    const walletAddress = await web3.eth.requestAccounts()    // request address wallet
    console.log("🚀 ~ file: App.tsx ~ line 27 ~ handleConnectWalletMetaMask ~ walletAddress", walletAddress)

    const walletBalanceInWei = await web3.eth.getBalance(walletAddress[0])  // return số dư của address wallet
    console.log("🚀 ~ file: App.tsx ~ line 31 ~ handleConnectWalletMetaMask ~ walletBalanceInWei", walletBalanceInWei)
    const walletBalanceIneth : any = Web3.utils.fromWei('100', 'kwei') // chuyển đổi gtri wei -> ETH
    console.log("🚀 ~ file: App.tsx ~ line 30 ~ handleConnectWalletMetaMask ~ walletBalanceIneth", walletBalanceIneth)

    const balanceInEthFormat = Math.round((walletBalanceIneth * 1000) / 1000)
    console.log("🚀 ~ file: App.tsx ~ line 33 ~ handleConnectWalletMetaMask ~ balanceInEthFormat", balanceInEthFormat)

    setInfoMetaMaskWallet({
      address: walletAddress,
      balance: balanceInEthFormat || walletBalanceIneth
    })
  }

  return (
      <>
      {/* <div style={{width: '60%', margin: '0 auto'}}>
        <Form/>
      </div> */}

      <button onClick={handleConnectWalletMetaMask}>Connect Wallet</button>
      {infoMetaMaskWallet && (
        <div>
          <p>Address Wallet: {infoMetaMaskWallet.address}</p>
          <p>Balance ETH: {infoMetaMaskWallet.balance}</p>
        </div>
      )}
      </>
  );
};
