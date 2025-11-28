import { Web3Context } from "./web3Context";
import { useEffect, useState } from "react";
import { getWeb3State } from "../utils/getWeb3State";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";
const Web3Provider = ({children}) => {
    const [web3State, setWeb3State] = useState({
        contractInstance: null,
        slectedAccount: null,
        chainId: null
    })
    const handleWallet = async()=>{
        try{
            const {contractInstance, slectedAccount, chainId} = await getWeb3State()
            console.log(contractInstance, slectedAccount, chainId)
            setWeb3State({contractInstance, slectedAccount, chainId})
        }catch(err){
            console.error(err)
        }

    }
    useEffect(()=>{
        window.ethereum.on('accountsChanged',()=>handleAccountChange(setWeb3State))
        window.ethereum.on('chainChanged',()=>handleChainChange(setWeb3State))

        return()=>{
            window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setWeb3State))
            window.ethereum.removeListener('chainChanged',()=>handleChainChange(setWeb3State))
        }
    },[]) 

    return (
        <>
        
        <Web3Context.Provider value={web3State}>
            {children}
        </Web3Context.Provider>
        <button onClick={handleWallet}>Connect Wallet</button>

        </>
    )
}
export default Web3Provider;