import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { address } from "../../config/address";
import abi from "../abi/WavePortal.json";
import { TopNavBar } from "../components/TopNavBar";
import { Toastr } from "../components/Toastr";
import wallpaper from "../assets/pose_45.png";
import "./HomePage.scss";
import { ChatBox } from "../components/ChatBox";

export function HomePage() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState<any>([]);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isEnable, setIsEnable] = useState(true);

  const contractAddress: string = address;
  const contractABI: any = abi.abi;

  const change = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setIsEnable(e.target.value.length > 0 ? false : true);
    setValue(e.target.value);
  };

  const getAllWaves = async () => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const waves: any = await wavePortalContract.getAllWaves();

        let wavesCleaned: any = [];
        waves.forEach((wave: any) => {
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
      const { ethereum }: any = window;

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        alert("MetaMask não encontrada!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Conectado", accounts[0]);
      setCurrentAccount(accounts[0]);
      setOpen(true);
      checkIfWalletIsConnected();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setInterval(() => {

    checkIfWalletIsConnected();
    // }, 3000);
  }, []);

  const wave = async () => {
    try {
      const { ethereum }: any = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setValue("");

        let count = await wavePortalContract.getTotalWaves();
        console.log("Recuperado o número de tchauzinhos...", count.toNumber());

        const waveTxn = await wavePortalContract.wave(value);
        console.log("Minerando...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Minerado -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves().then(() => {
          getAllWaves();
        });

        console.log("Total de tchauzinhos recuperado...", count.toNumber());
      } else {
        console.log("Objeto Ethereum não encontrado!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="mainContainer">
      <TopNavBar connect={connectWallet} address={currentAccount} />
      <Toastr isOpen={open} duration={6000} close={handleClose} />

      <div className="w-100 h-100 d-flex justify-content-center align-items-center mt-5">
        <img className="img-fluid wallpaper" src={wallpaper} />
        <ChatBox
          setText={change}
          text={value}
          sendMessage={wave}
          messages={allWaves}
          enableButton={isEnable}
        />
      </div>
    </div>
  );
}
