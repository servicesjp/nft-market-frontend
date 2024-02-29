import { useContractWrite } from "wagmi"
import { EXPERIENCE, RPC_PROVIDER } from "@/constants/env"
import { experience } from "@/hooks/types/contracts/experience"
import { useContext } from "react"
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider"
import { ethers } from "ethers"
import { EXPERIENCE_ABI } from "@/constants/abi/EXPERIENCE_ABI"
import { contractWrapperTwo } from "@/modules/utils"


export const ExperienceContract = () => {
  const { chain }: any = useContext(WalletConnectContext)
  const { writeAsync: contractWrite } = useContractWrite({
    address: EXPERIENCE[chain?.id],
    abi: EXPERIENCE_ABI,
  })
  async function createEvent(event: any){
    const args: { functionName: string; args: any[] } = {
      functionName: experience.createEvent,
      args: [event],
    };
    return await contractWrite(args)
  }

  async function eventApproval(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: experience.eventApproval,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function enterEventAndBurnTicket(eventId: any){
    const args: { functionName: string; args: any[] } = {
      functionName: experience.enterVenueAndBurnTickets,
      args: [eventId],
    };
    return await contractWrite(args)
  }
  async function burnTicketsandRefund(eventId: any){
    const args: { functionName: string; args: any[] } = {
      functionName: experience.burnTicketsandRefund,
      args: [eventId],
    };
    return await contractWrite(args)
  }
  async function updateTimeOfEvent(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: experience.updateTimeOfEvent,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function buyTicket(values: any[], isStableCoin: boolean, amount: any = 0){
    const args = isStableCoin ? {
        functionName: experience.buyTicket,
        args: [...values],
      }: {
        functionName: experience.buyTicket,
        args: [...values],
        value: amount,
      }
    return await contractWrite(args)
  }

  async function cancelTickets(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: experience.cancelTickets,
      args: [...values],
    };
    return await contractWrite(args)
  }

  async function burnTicketsAndEscrow(uniqueEvent: string){
    const args: { functionName: string; args: any[] } = {
      functionName: experience.burnTicketsAndEscrow,
      args: [uniqueEvent],
    };
    return await contractWrite(args)
  }

  async function balanceOfTicket(chainId: number ,values: any[]){
    return await contractWrapperTwo(async () => {
      return await readContractExp(chainId).balanceOf(...values)
    })
  }
  async function eventInfo(chainId: number ,uniqueEvent: string){
    return await contractWrapperTwo(async () => {
      return await readContractExp(chainId).eventInfo(uniqueEvent)
    })
  }

  async function ticketInfo(chainId: number ,uniqueEvent: string){
    return await contractWrapperTwo(async () => {
      return await readContractExp(chainId).ticketInfo(uniqueEvent)
    })
  }

  async function buyerInfo(chainId: number ,values: any[]){
    return await contractWrapperTwo(async () => {
      return await readContractExp(chainId).buyerInfo(...values)
    })
  }
  async function SetApprovalForAllNFTExperience(values: any[]){
    const args: { functionName: string; args: any[] } = {
      functionName: experience.setApprovalForAll,
      args: [...values],
    };
    return await contractWrite(args)
  }
  
  return { createEvent, SetApprovalForAllNFTExperience, eventApproval,updateTimeOfEvent, buyerInfo, enterEventAndBurnTicket,burnTicketsandRefund, buyTicket, cancelTickets, burnTicketsAndEscrow, balanceOfTicket, eventInfo, ticketInfo }
}

export const readContractExp = (chainId: number) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER[chainId])
  const data =  new ethers.Contract(
  EXPERIENCE[chainId],
    EXPERIENCE_ABI,
    provider
    );
    return data
  };
