import { COLLECTION_NFT1155_ABI } from "@/constants/abi/COLLECTION_NFT1155_ABI";
import { COLLECTION_NFT1155_BYTECODE } from "@/constants/bytecode/COLLECTION_NFT1155_BYTECODE";
import { contractWrapper } from "@/modules/utils";
import { ethers } from "ethers";

const NFT1155CollectionContract = () => {
    async function deploy(signer: any, values: any) {
        return contractWrapper(async () => {
          let deploy = await new ethers.ContractFactory(
            COLLECTION_NFT1155_ABI,
            COLLECTION_NFT1155_BYTECODE,
            signer
          ).deploy(...values);
          return deploy.deployTransaction;
        });
      }
      return {deploy}
}

export default NFT1155CollectionContract;