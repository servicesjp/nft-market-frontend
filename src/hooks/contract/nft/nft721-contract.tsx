import { useContractWrite } from "wagmi"
import { NFT721, RPC_PROVIDER } from "@/constants/env"
import { nft } from "@/hooks/types/contracts/nft";
import { contractWrapperTwo } from "@/modules/utils";
import { useContext } from "react"
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider"
import { NFT721_ABI } from "@/constants/abi/NFT721_ABI"
import { ethers } from "ethers"


export const NFT721Contract = () => {
  const { chain }: any = useContext(WalletConnectContext)
  const { writeAsync: contractWrite, status: contractWriteState } = useContractWrite({
    address: NFT721[chain?.id],
    abi: NFT721_ABI,
  })
  async function RedeemNFT721(voucher: any, isStableCoin: boolean, amount: any = 0){
    const args = isStableCoin ? {
        functionName: nft.redeem,
        args: [voucher],
      }: {
        functionName: nft.redeem,
        args: [voucher],
        value: amount,
      }
    return await contractWrite(args)
  }

  async function TokenURINFT721(chainId: number ,tokenId: any){
    return await contractWrapperTwo(async () => {
      return await readContractNFT721(chainId).tokenURI(tokenId)
    })
  }

  async function BalanceOfNFT721(chainId: number ,owner: any){
    return await contractWrapperTwo(async () => {
      return await readContractNFT721(chainId).balanceOf(owner)
    })
  }

  async function OwnerOfNFT721(chainId: number ,tokenId: any){
    return await contractWrapperTwo(async () => {
      return await readContractNFT721(chainId).ownerOf(tokenId)
    })
  }

  async function SetApprovalForAllNFT721(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: nft.setApprovalForAll,
      args: [...values],
    };
    return await contractWrite(args)
  }

  
  
  return { RedeemNFT721, TokenURINFT721, BalanceOfNFT721, OwnerOfNFT721, SetApprovalForAllNFT721 }
}


export const readContractNFT721 = (chainId: number) => { 
 const provider = getProviderNFT721(chainId)
  const data =  new ethers.Contract(
    NFT721[chainId],
    NFT721_ABI,
    provider
    );
    return data
  };

export const getProviderNFT721 = (chainId: number) => {
  return  new ethers.providers.JsonRpcProvider(RPC_PROVIDER[chainId])
}
