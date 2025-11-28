import {ethers} from "ethers"
import abi from "../constant/abi.json"

export const getWeb3State = async () => {
    try{
        if(!window.ethereum){
        throw new Error("No wallet found. Please install Metamask")
        }
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })
        const slectedAccount = accounts[0]

        const chainIdHex = await window.ethereum.request({
            method:'eth_chainId'
        })
        const chainId = parseInt(chainIdHex,16)
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contractAddress = "0xb9406ebf4c7a33aefabef9745c287f4992f87c4a"

        const contractInstance = new ethers.Contract(contractAddress,abi,signer)
        return {contractInstance, slectedAccount, chainId}

    }catch(err){
        console.error(err)  

    }
}