export const MOROLIS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE2NzE1ZWUwLWUzZjItNGMzMS1hMGU1LWM0MjRkZGE5OWU2NyIsIm9yZ0lkIjoiMzY5NzIxIiwidXNlcklkIjoiMzc5OTc3IiwidHlwZUlkIjoiMDQ0NWNmYjEtODI4MS00MzViLWE0YTgtNWFjZDU1OWRkNjI0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDM2MTgzNTQsImV4cCI6NDg1OTM3ODM1NH0.v0YkqV1fCbJ7Z884780_wV4Y5ARaLeXOIGzqdjs2niU";

export const URLBASE = "https://deep-index.moralis.io"

//NFT
export const NFT721: any = {
  1:"0x0db495057a6Fa5ba4c1252d5C386Fc02257c1543",
  11155111:"0x195e0f75F60DE349CB8ffF656d702c02C2A330f2",
  56:"0x693E8a17b05e07475F6eF0891daf5Fa8C8866327",
  137:"0x9D2b701F27dF42B14784266e3B092F02AB584b59"
  
}
export const NFT1155: any = {
  1:"0x7cC0b7262B2D8C52f22A0790500B135200950Abb",
  11155111:"0x541A4e0bA30b811e5b7088071dB7ea2d742B68Cd",
  56:"0x21Cce52b8DbDa6Ec848F8448a1C27B20b7c8C45c",
  137:"0x0d8D34606d7fAA73131d89111088AaD619546814"
}

export const EXPERIENCE: any = {
  1:"0x217F211f74cbcc9A60eE77DBCFb52526195dB1F1",
  11155111:"0xD08982Fae81CBaB789Ac9477Fc50F25d9f1836C4",
  56:"0xa243A5327Ff7eCf286941D3e8b79D99956BB20a0",
  137:"0x067C0dfE5a432336eC41580680f82239021D0156"
}

//PLACES
export const MARKETPLACE: any = {
  1:"0x85814b50b151279087F4A2fd429db1C3e9F2c1a0",
  11155111:"0x0c14967a86F7439edF0fc746d59370Bd9f51Db48",
  56:"0xEDF5c83865Bca528096623Cbd850e82A27F4591a",
  137:"0x83Cd9aE199BDD67ee7c2fD0Cfd908D78a8B57D7D"
}
export const AUCTION: any = {
  1:"0x7cC0b7262B2D8C52f22A0790500B135200950Abb",
  11155111:"0x7cC0b7262B2D8C52f22A0790500B135200950Abb",
  56:"0x7cC0b7262B2D8C52f22A0790500B135200950Abb",
  137:"0x0d8D34606d7fAA73131d89111088AaD619546814" 
}

export const CURRENCY: any = {
  1: {
    ETH:"0x0000000000000000000000000000000000000000",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    WBTC:"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
  },
  11155111: {
    ETH:"0x0000000000000000000000000000000000000000",
    USDT: "0x83Cd9aE199BDD67ee7c2fD0Cfd908D78a8B57D7D",
    USDC: "0x067C0dfE5a432336eC41580680f82239021D0156",
    WBTC:"0x79876aa0654e03FC064281c8CED08c3c6A470991",
  },
  56: {
    BNB:"0x0000000000000000000000000000000000000000",
    BUSD:"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  },
  137: {
    MATIC:"0x0000000000000000000000000000000000000000",
    USDT:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
  }
};

export const NameChain = (chainId:any) => {
  let name = ""
  switch(chainId){
    case 1:
      name = "mainnet"
      break
    case 11155111:
      name = "sepolia"
      break
    case 56:
      name = "bsc"
      break
    case 137:
      name ="polygon"
      break
    default:
      break
  }
  return name
}

export const GAS_LIMIT: any = {
  1:3000000,
  11155111:3000000,
  56:35000000,
  137:3000000 
  }

export const CURRENCY_ETHER = "0x0000000000000000000000000000000000000000"
export const DECIMALS_NATIVE = 18
export const DECIMALS_SIX = 6 
export const DECIMALS_TWO = 2
export const MAX_ETHER_QUANTITY = 5
export const MAX_TOKEN_QUANTITY = 1000000
export const API_KEY_PROVIDER = '2f72bf5b1bfd4038a805c8a17890937d'

export const CHAINS_IMAGES: any = {
  1: "/images/networks/etherum.png",
  11155111: "/images/networks/sepolia.png",
  56: "/images/networks/bsc.png",
  137:"/images/networks/polygon.png"
}

export const RPC_PROVIDER: any = {
  1: `https://mainnet.infura.io/v3/${API_KEY_PROVIDER}`,
  11155111: `https://sepolia.infura.io/v3/${API_KEY_PROVIDER}`,
  56: "https://bsc-dataseed.binance.org/",
  137:"https://polygon-mainnet.g.alchemy.com/v2/R5KIViYNQmV2fw4INQDfvRNbMKF1uzQ6"
}

export const WEB_SCAN: any = {
  1:"https://etherscan.io/address/",
  11155111:"https://sepolia.etherscan.io/address/",
  56:"https://bscscan.com/address/",
  137:"https://polygonscan.com/address/"
}

export const WEB_SCAN_HASH: any = {
  1:"https://etherscan.io/tx/",
  11155111:"https://sepolia.etherscan.io/tx/",
  56:"https://bscscan.com/tx/",
  137:"https://polygonscan.com/tx/"
}

export function getAllCurrencyOptionsByEnv(): any[] {
  const options: any[] = [];
  const seenLabels = new Set<string>();

  for (const key in CURRENCY) {
    if (Object.hasOwnProperty.call(CURRENCY, key)) {
      const subObj = CURRENCY[key];
      for (const subKey in subObj) {
        if (Object.hasOwnProperty.call(subObj, subKey) && !seenLabels.has(subKey)) {
          options.push({ label: subKey, value: subKey });
          seenLabels.add(subKey);
        }
      }
    }
  }

  return options;
}

export const currencyOptionsByChain = (chain: number) => {
  const objectCurrency = CURRENCY[chain];
  return Object.keys(objectCurrency).map(key => ({
    label: key,
    value: objectCurrency[key],
  }))
}

export const DEFAULT_CHAIN = 11155111;
export const DEFAULT_ADMIN_ADDRESS = "0xED2159aD8b341aa962E39786140aab8019958190" //account Meteor
