import axios from "axios";
import { NameChain, MOROLIS_API_KEY , URLBASE} from "@/constants/env";
interface GetTokenInfo {
  chainId: any;
  address: string;
}

interface AllowanceInfo {
  chainId: any;
  address: string;
  ownerAddress: string;
  spenderAddress: string;
  
}
export async function getTokenMetadata({ chainId, address }: GetTokenInfo) {
  const url: any = `${URLBASE}/api/v2/erc20/metadata?chain=${NameChain(chainId)}&addresses%5B0%5D=${address}`;
  const headers = {
    accept: "application/json",
    "X-API-Key": `${MOROLIS_API_KEY}`
  };

  try {
    let token = await axios.get(url, { headers });
    if (token.data[0].decimals == "") {
      return { status: false, error: "Token not found" };
    }
    return { status: true, result: token.data[0] };
  } catch (err) {
    return {
      status: false,
      error: "Token not found",
    };
  }
}
