import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ABI } from "./../ABI";
import abi from "./utils/WavePortal.json";
import { LeftSide, RightSide } from "./components";
import "./App.css";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [value, setValue] = useState("");

  const contractAddress = ABI;
  const contractABI = abi.abi;

  const change = (event) => {
    setValue(event.target.value);
  };

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Objeto Ethereum não existe!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Garanta que possua a Metamask instalada!");
        return;
      } else {
        console.log("Temos o objeto ethereum", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Encontrada a conta autorizada:", account);
        setCurrentAccount(account);
        getAllWaves();
      } else {
        console.log("Nenhuma conta autorizada foi encontrada");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("MetaMask encontrada!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Conectado", accounts[0]);
      checkIfWalletIsConnected();
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      checkIfWalletIsConnected();
    }, 600);
  }, []);

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setValue("");

        getAllWaves();

        let count = await wavePortalContract.getTotalWaves();
        console.log("Recuperado o número de tchauzinhos...", count.toNumber());

        const waveTxn = await wavePortalContract.wave(value);
        console.log("Minerando...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Minerado -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Total de tchauzinhos recuperado...", count.toNumber());
      } else {
        console.log("Objeto Ethereum não encontrado!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <LeftSide isAccount={currentAccount} callFunction={connectWallet} />

      <RightSide
        initialValue={value}
        controlValue={change}
        callFunction={wave}
        data={allWaves}
      />
    </div>
  );
}
