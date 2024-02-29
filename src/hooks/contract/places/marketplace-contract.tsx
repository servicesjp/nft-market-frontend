import { useContractWrite } from "wagmi"
import { MARKETPLACE_ABI } from "@/constants/abi/MARKETPLACE_ABI"
import { MARKETPLACE, RPC_PROVIDER } from "@/constants/env"
import { marketplace } from "@/hooks/types/contracts/marketplace";
import { useContext } from "react"
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider"
import { ethers } from "ethers"
import { contractWrapperTwo } from "@/modules/utils"


export const MarketplaceContract = () => {
  const { chain }: any = useContext(WalletConnectContext)
  const { writeAsync: contractWrite } = useContractWrite({
    address: MARKETPLACE[chain?.id],
    abi: MARKETPLACE_ABI,
  })
  
  async function ListItemMarket(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: marketplace.listItem,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function CancelListingMarket(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: marketplace.cancelListing,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function BuyItemMarket(values: any[], amount:any){
    const args: { functionName: string; args: any[], value: any } = {
      functionName: marketplace.buyItem,
      args: [...values],
      value: amount,
    };
    return await contractWrite(args)
  }

  async function BuyItemWithERC20Market(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: marketplace.buyItemWithERC20,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function CreateOfferMarket(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: marketplace.createOffer,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function CancelOfferMarket(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: marketplace.cancelOffer,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function AcceptOfferMarket(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: marketplace.acceptOffer,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function GetListItemDetails(chainId: number,values: any[]){
    return await contractWrapperTwo(async () => {
      return await readContract(chainId).listings(...values)})
  }

  async function GetListItemOffer(chainId: number,values: any[]){
    console.log(readContract(chainId))
    return await contractWrapperTwo(async () => {
      return await readContract(chainId).offers(...values)})
  }


  const readContract = (chainId: number) => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER[chainId])
    const data =  new ethers.Contract(
      MARKETPLACE[chainId],
      MARKETPLACE_ABI,
      provider
      );
      return data
    };
  
  return { contractWrite, ListItemMarket, CancelListingMarket, BuyItemMarket, BuyItemWithERC20Market, CreateOfferMarket, CancelOfferMarket, AcceptOfferMarket, GetListItemDetails, GetListItemOffer }
}
