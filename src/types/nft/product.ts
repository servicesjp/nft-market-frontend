import { Category } from "./category";
import { ExperienceNFT } from "./experience-nft";

export interface Product {
  id: string;
  mediaAssets: any[];
  name: string;
  price: number;
  currencyAddress: string;
  currencyDecimals: number;
  owner: any;
  category?: Category;
  symbolCurrency: string;
  minted: boolean;
  nftVoucher: any;
  experience?: ExperienceNFT;
}