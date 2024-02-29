import { useContractWrite } from "wagmi"
import { NFT1155, RPC_PROVIDER } from "@/constants/env"
import { nft } from "@/hooks/types/contracts/nft";
import { contractWrapperTwo } from "@/modules/utils";
import { useContext } from "react"
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider"
import { NFT1155_ABI } from "@/constants/abi/NFT1155_ABI";
import { ethers } from "ethers"

export const NFT1155Contract = () => {
  const { chain }: any = useContext(WalletConnectContext)
  const { writeAsync: contractWrite, status: contractWriteState } = useContractWrite({
    address: NFT1155[chain?.id],
    abi: NFT1155_ABI,
  })
  async function RedeemNFT1155(voucher: any, isStableCoin: boolean, amount: any = 0){
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

  async function TokenURINFT1155(chainId: number,tokenId: any){
    return await contractWrapperTwo(async () => {
      return await readContract(chainId).tokenURI(tokenId)
    })
  }

  async function BalanceOfNFT1155(chainId: number,values: any[]){
    return await contractWrapperTwo(async () => {
      return await readContract(chainId).balanceOf(...values)})
  }

  async function SetApprovalForAllNFT1155(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: nft.setApprovalForAll,
      args: [...values],
    };
    return await contractWrite(args)
  }
const readContract = (chainId: number) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER[chainId])
  const data =  new ethers.Contract(
    NFT1155[chainId],
    NFT1155_ABI,
    provider
    );
    return data
  };

  
  return { RedeemNFT1155, TokenURINFT1155, BalanceOfNFT1155, SetApprovalForAllNFT1155 }
}
