import { showErrorToast } from "@/components/toast";
import { CURRENCY_ETHER, DECIMALS_SIX, DECIMALS_TWO } from "@/constants/env";
import { chains } from "@/modules/provider/wallet-provider";
import { NftType, NftTypeByName } from "@/types/NftType";
import { formatDecimalsNumber, revertParseUnitEthers } from "@/utils";
export type ContractResult = {
  success: boolean;
  result?: { transactionHash: string, wait: any };
  error?: any;
  hash?: string
};

export const truncateAddress = (address: string) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{3})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const contractWrapper = async (
  contractFn: () => Promise<any>
): Promise<ContractResult> => {
  try {
    const result = await contractFn();
    return {
      success: result.status === undefined ? true : result.status,
      result,
    };
  } catch (e: any) {
    console.log(e);
    
    showErrorToast(e.reason);
    return { success: false, error: e };
  }
};

export const contractWrapperTwo: any = async (
  contractFn: () => Promise<any>
): Promise<ContractResult> => {
  try {
    const result = await contractFn();
    return {
      success: result.status === undefined ? true : result.status,
      result,
    };
  } catch (e: any) {
    console.error(e);

    // Asegúrate de que showErrorToast esté definido y ajusta según tus necesidades específicas
    showErrorToast(e?.message);

    return { success: false, error: e };
  }
};


export const isWalletConnected = (connect: boolean) => {
  if (connect) {
    showErrorToast("Wallet Not Connected");
    return false
  }
  return true
};
export const isCorrectNetwork = (chain: any) => {
  const chainsIdNetworks = chains ? chains.map((chain)=> chain?.id) : []
  if(!chainsIdNetworks.includes(chain?.id)) {
    showErrorToast("Network Not Support")
    return false
  }
  return true
};
export const isSameNetwork = (chain: any, chainProduct: any) => {
  const chainId =  chain?.id == chainProduct
  if(!chainId) {
    showErrorToast("Not The Same Chain")
  }
  return chainId
};

export const isCorrectNetworWithoutWarning = (chain: any) => {
  //const chainsId = chains ? chains.map((chain)=> chain?.id) : []
  return true;// chainsId.includes(chain?.id)
};

export const Status = (code: string) => {
  let status;
  switch (code) {
    case "0":
      status = "UPCOMING";
      break;
    case "1":
      status = "ACTIVE";
      break;
    case "2":
      status = "ENDED";
      break;
    case "3":
      status = "CANCELED";
      break;
  }
  return status;
};
export const ICOStatus = (status: any) => {
  switch (status) {
    case 0:
      return (
        <span className="inline-flex items-center bg-yellow-100 text-[#fcd34c] text-xs font-medium  px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
          Upcoming
        </span>
      );

    case 1:
      return (
        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          <span className="w-2 h-2 mr-1 bg-green-500 rounded-full" />
          Active
        </span>
      );
    case 2:
      return (
        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          <span className="w-2 h-2 mr-1 bg-red-500 rounded-full" />
          Ended
        </span>
      );
    case 3:
      return (
        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          <span className="w-2 h-2 mr-1 bg-red-500 rounded-full" />
          Canceled
        </span>
      );
  }
};

export const AdminStatus = (status: any) => {
  switch (status) {
    case 0:
      return (
        <span className="inline-flex items-center text-[#fcd34c] text-xs font-medium  px-2.5 py-0.5 rounded-full   border-2 border-solid border-[#fcd34c]">
          <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
          Token
        </span>
      );

    case 1:
      return (
        <span className="inline-flex items-center text-[#3E3B80] text-xs font-medium  px-2.5 py-0.5 rounded-full  border-2 border-solid border-[#3E3B80]">
          <span className="w-2 h-2 mr-1 bg-cyan-950 rounded-full" />
          Accept
        </span>
      );
    case 2:
      return (
        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          <span className="w-2 h-2 mr-1 bg-red-500 rounded-full" />
          Reject
        </span>
      );
  }
};


export function formatPrice(price: number | string, currencyAddress: string, decimals: number) {

  if (typeof price === 'string') {
    price = parseFloat(price);

    if (isNaN(price)) {
      return ''
    }
  }

  if(price == 0 || !decimals) return '0'
  const currency = CURRENCY_ETHER
  const isNative = currencyAddress == currency
  const result = revertParseUnitEthers(
    price,
    decimals
  );
  
  return result ? formatDecimalsNumber(result, isNative? DECIMALS_SIX: DECIMALS_TWO) : ''
}

export function multiPrice(price: number, currencyAddress: string, amount: number, decimals: number) {
  const currency = CURRENCY_ETHER
  const isNative = currencyAddress == currency
  const result = revertParseUnitEthers(
    price,
    decimals
  );
  
  return result ? formatDecimalsNumber(result * amount, isNative? DECIMALS_SIX: DECIMALS_TWO) : ''
}

export function getCurrentDomain() {
  const isLocalhost = window.location.hostname === 'localhost';
  const domain = isLocalhost ? 'http://localhost' : window.location.origin;
  return domain
}

export function isValidString(str: string | null | undefined): boolean {

  if (str === null || str === undefined) {
    return false;
  }

  if (str.trim() === '') {
    return false;
  }

  return true;
}

export function isValidDate(date: string) {
  const valueDate = new Date(date)

  if (valueDate instanceof Date) {
    return true
  } else {
    return false
  }
}

export function dateToUnixTime(inputDate: Date): number {

  const dateInMilliseconds = inputDate.getTime();

  
  return dateInMilliseconds;
}

export function getNftTypeName(typeNft: NftType) {
  let nameNft = ""
  switch(typeNft){
    case NftType.DIGITAL_ART:
      nameNft = NftTypeByName[NftType.DIGITAL_ART]
    break
    case NftType.EXPERIENCE:
      return NftTypeByName[NftType.EXPERIENCE]
    default:
      break
  }
}

export function getEnumKeyByEnumValue(enumObj: any, enumValue: number): string | null {
  if (!Object.values(enumObj).includes(enumValue)) {
      return null;
  }
  return enumObj[enumValue];
}

export function shortenHash(hash: string, startLength = 5, endLength = 5) {
  if (hash.length <= startLength + endLength) {
    return hash;
  }
  return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`;
}
