import { COLLECTION_NFT721_ABI } from "@/constants/abi/COLLECTION_NFT721_ABI";
import { COLLECTION_NFT721_BYTECODE } from "@/constants/bytecode/COLLECTION_NFT721_BYTECODE";
import { contractWrapper } from "@/modules/utils";
import { ethers } from "ethers";

const NFT721CollectionContract = () => {
    async function deploy(signer: any, values: any) {
        return contractWrapper(async () => {
          let deploy = await new ethers.ContractFactory(
            COLLECTION_NFT721_ABI,
            COLLECTION_NFT721_BYTECODE,
            signer
          ).deploy(...values);
          return deploy.deployTransaction;
        });
      }
    return {deploy}
}

export default NFT721CollectionContract;