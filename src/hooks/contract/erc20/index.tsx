import { ERC20_ABI } from "@/constants/abi/ERC20_ABI";
import { GAS_LIMIT } from "@/constants/env";
import { erc20 } from "@/hooks/types/contracts/erc20"
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { contractWrapper } from "@/modules/utils";
import { ethers } from "ethers";
import { useContext } from "react"
import { writeContract } from "wagmi/actions"
export const ERC20Contract = () => {
  const { signer, chain }: any = useContext(WalletConnectContext)
    async function approveTokens(contractErc20: any, values: any[]) {
      return contractWrapper(async () => {
          return await ContractERC20(contractErc20).approve(...values, {
            gasLimit: GAS_LIMIT[chain?.id],
            gasPrice: ethers.utils.parseUnits("10", "gwei")
          });
      })
    }

    async function ApproveTokens(contractErc20: any, values: any[]) {
      return await writeContract({
        address: contractErc20, 
        abi: ERC20_ABI,
        functionName: erc20.approve,
        args: [...values]
      })
    }
    async function balanceOf(contractErc20: string, userAddress: string) {
        return contractWrapper(async () => {
            return await ContractERC20(contractErc20).balanceOf(userAddress)
        })
      }
      const ContractERC20 = (contractErc20: any) => {
        return new ethers.Contract(
          contractErc20,
          ERC20_ABI,
          signer
        );
      };
    return { approveTokens,ApproveTokens, balanceOf };
}