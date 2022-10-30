import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

import { address } from "../../config/address"
import abi from "../abi/WavePortal.json"

import wallpaper from "../assets/pose_45.png"

import { TopNavBar } from "../components/TopNavBar"
import { Toastr } from "../components/Toastr"
import { ChatBox } from "../components/ChatBox"

import "./HomePage.scss"

export function HomePage() {
  const [currentAccount, setCurrentAccount] = useState("")
  const [postsList, setPostsList] = useState<any>([])
  const [post, setPost] = useState("")
  const [open, setOpen] = useState(false)
  const [isEnable, setIsEnable] = useState(true)

  const contractAddress: string = address
  const contractABI: any = abi.abi

  const getUserEvent = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setIsEnable(
      e.target.value.length > 0 && currentAccount.length > 0 ? false : true
    )
    setPost(e.target.value)
  }

  const getAllPosts = async () => {
    try {
      const { ethereum }: any = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        const waves: any = await wavePortalContract.getAllWaves()
        let wavesCleaned: any = []

        waves.forEach((wave: any) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          })
        })

        setPostsList(wavesCleaned)
      } else {
        console.log("Objeto Ethereum não existe!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum }: any = window

      if (!ethereum) {
        console.log("Garanta que possua a Metamask instalada!")
        return
      }

      const accounts = await ethereum.request({ method: "eth_accounts" })
      getAllPosts()
      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log("Encontrada a conta autorizada:", account)
        setCurrentAccount(account)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window

      if (!ethereum) {
        alert("MetaMask não encontrada!")
        return
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      setCurrentAccount(accounts[0])
      setOpen(true)
      checkIfWalletIsConnected()
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async () => {
    try {
      const { ethereum }: any = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        setPost("")

        let count = await wavePortalContract.getTotalWaves()

        const waveTxn = await wavePortalContract.wave(post)

        await waveTxn.wait()

        count = await wavePortalContract.getTotalWaves().then(() => {
          getAllPosts()
        })
      } else {
        console.log("Objeto Ethereum não encontrado!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className='mainContainer'>
      <TopNavBar connect={connectWallet} address={currentAccount} />
      <Toastr isOpen={open} duration={6000} close={handleClose} />

      <div className='w-100 h-100 d-flex justify-content-center align-items-center mt-5'>
        <img className='img-fluid wallpaper' src={wallpaper} />
        <ChatBox
          setText={getUserEvent}
          text={post}
          sendMessage={sendMessage}
          messages={postsList}
          enableButton={isEnable}
        />
      </div>
    </div>
  )
}
