import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers, Contract, ethers } from "ethers";
import { useEffect, useRef, useState, useContext } from "react";
import { TODO_CONTRACT_ADDRESS } from "../constants";
import abi from "../src/frontend/contractData/Todo.json";
import { AddTodo } from "../components/addTodo/addTodo";
import { TodoContainer } from "../components/todos/todos";
import { TodoContext } from "../context/context";

const Home: NextPage = () => {
  // // walletConnected keep track of whether the user's wallet is connected or not
  // const [walletConnected, setWalletConnected] = useState(false);
  // // loading is set to true when we are waiting for a transaction to get mined
  // const [loading, setLoading] = useState(false);

  // //todos tracks list of tasks
  // const [todos, setTodos] = useState([]);

  // // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  // //  const web3ModalRef = useRef();

  // // console.log(abi.abi);

  // const getProviderOrSigner = async (needSigner = false) => {
  //   const accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   const account = accounts[0];
  //   console.log(account);
  //   // Connect to Metamask
  //   // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
  //   // const provider = await web3ModalRef.current.connect();
  //   // const web3Provider = new providers.Web3Provider(provider);
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);

  //   // // If user is not connected to the Rinkeby network, let them know and throw an error
  //   // const { chainId } = await web3Provider.getNetwork();
  //   // if (chainId !== 4) {
  //   //   window.alert("Change the network to Rinkeby");
  //   //   throw new Error("Change network to Rinkeby");
  //   // }

  //   if (needSigner) {
  //     const signer = provider.getSigner();
  //     return signer;
  //   }
  //   return provider;
  // };

  // /*
  //   connectWallet: Connects the MetaMask wallet
  // */
  // const connectWallet = async () => {
  //   try {
  //     // Get the provider from web3Modal, which in our case is MetaMask
  //     // When used for the first time, it prompts the user to connect their wallet
  //     await getProviderOrSigner();
  //     setWalletConnected(true);

  //     // checkIfAddressInWhitelist();
  //     // getNumberOfWhitelisted();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  //   if (!walletConnected) {
  //     // Assign the Web3Modal class to the reference object by setting it's `current` value
  //     // The `current` value is persisted throughout as long as this page is open
  //     // web3ModalRef.current = new Web3Modal({
  //     //   network: "rinkeby",
  //     //   providerOptions: {},
  //     //   disableInjectedProvider: false,
  //     // });
  //     connectWallet();
  //   }
  // }, [walletConnected]);

  // console.log(walletConnected);

  const { connectWallet, walletConnected, loading } = useContext(TodoContext);

  function setButton() {
    if (loading) {
      return "Loading...";
    } else if (walletConnected && loading === false) {
      return "Connected";
    } else {
      return "Connect Wallet";
    }
  }

  return (
    <div className={styles.fullbody}>
      <div className={styles.main}>
        <h1>TASK MANAGER</h1>

        <div>
          <button onClick={connectWallet}>
            {/* {walletConnected ? "Connected" : "Connect Wallet"} */}
            {setButton()}
          </button>
        </div>
      </div>
      <AddTodo />
      <TodoContainer />
    </div>
  );
};

export default Home;
