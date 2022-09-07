import { createContext, useState, useEffect } from "react";
import { ethers, Contract, providers } from "ethers";
import Abi from "../src/frontend/contractData/Todo.json";
import { TODO_CONTRACT_ADDRESS } from "../constants";

interface ITodo {
  title: string;
  isCompleted: boolean;
  isDeleted: boolean;
}
type TodoContextType = {
  todos: ITodo[];
  walletConnected: boolean;
  loading: boolean;
  setLoading: boolean;
  todoContract: any;
  connectWallet: () => void;
  fetchTodos: () => void;
  // addTodo: (text: string) => void;
  // saveTodo: (todo: ITodo) => void;
  // updateTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider: any = ({ children }) => {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState<boolean>(false);
  const [todoContract, setTodoContract] = useState<any>(null);
  //todos tracks list of tasks
  const [todos, setTodos] = useState([]);

  const getProviderOrSigner = async (needSigner = false) => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(account);
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    // const provider = await web3ModalRef.current.connect();
    // const web3Provider = new providers.Web3Provider(provider);
    const provider = new providers.Web3Provider(window.ethereum);

    // // If user is not connected to the Rinkeby network, let them know and throw an error
    // const { chainId } = await web3Provider.getNetwork();
    // if (chainId !== 4) {
    //   window.alert("Change the network to Rinkeby");
    //   throw new Error("Change network to Rinkeby");
    // }

    if (needSigner) {
      const signer = provider.getSigner();
      return signer;
    }
    return provider;
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      const signer = await getProviderOrSigner(true);
      console.log(signer);

      // Get the address associated to the signer which is connected to  MetaMask
      setWalletConnected(true);

      const todoContract = new Contract(TODO_CONTRACT_ADDRESS, Abi.abi, signer);

      setTodoContract(todoContract);

      // let todos = await todoContract?.getPersonalTodos();
      // console.log(todos);

      // let refactoredTodo = todos.map(function (todo: any) {
      //   return { title: todo[0], isCompleted: todo[1], isDeleted: todo[2] };
      // });

      // let filteredTodos = refactoredTodo.filter(
      //   (todo: ITodo) => !todo.isDeleted
      // );

      // // console.log(filteredTodos);
      // console.log(refactoredTodo);

      // setTodos(filteredTodos);

      // fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  //GET TODOS
  // if (todoContract) {
  //   // fetchTodos();
  // }

  async function fetchTodos() {
    console.log("1234565789");

    console.log(todoContract);

    let todos = await todoContract?.getPersonalTodos();
    console.log(todos);

    let refactoredTodo = todos?.map((todo: any) => {
      return { title: todo[0], isCompleted: todo[1], isDeleted: todo[2] };
    });

    let filteredTodos = refactoredTodo?.filter(
      (todo: ITodo) => !todo.isDeleted
    );

    // // console.log(filteredTodos);
    // console.log(refactoredTodo);

    setTodos(filteredTodos);

    console.log(filteredTodos);
  }

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      // web3ModalRef.current = new Web3Modal({
      //   network: "rinkeby",
      //   providerOptions: {},
      //   disableInjectedProvider: false,
      // });
      connectWallet();
    }
  }, [walletConnected]);

  useEffect(() => {
    console.log("contract");
    fetchTodos();
  }, [todoContract]);

  console.log(todoContract);
  console.log(todos);
  console.log(loading);

  return (
    <TodoContext.Provider
      value={{
        todos,
        walletConnected,
        loading,
        setLoading,
        connectWallet,
        todoContract,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
