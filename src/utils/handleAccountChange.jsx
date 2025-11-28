export const handleAccountChange = async(setWeb3State) => {
    const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })
    const slectedAccount = accounts[0]
    setWeb3State((prevState)=>({...prevState, slectedAccount}))

}