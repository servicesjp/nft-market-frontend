import { __ } from "@/helpers/common"
import { enumToOptions } from "@/utils"

export enum NftType {
  DIGITAL_ART = 1,
  EXPERIENCE = 2,
  PRODUCT = 3,
}

export enum NftContractType {
  NFT721,
  NFT1155,
  EXPERIENCE
}


export const NftTypeByName: Record<any, any> = {
  [NftType.DIGITAL_ART]: "digital-art",
  [NftType.EXPERIENCE]: "experience",
  // [NftType.PRODUCT]: "product",
}

export const NFTInfoType: Record<any, any> = {
  // [NftType.DIGITAL_ART]: "info-digital-art",
  [NftType.EXPERIENCE]: "info-ticket",
  // [NftType.PRODUCT]: "info-product",
}


export function getNFTTypeByName(nftTypeName: any): any {
  const nftType = Object.values(NftType).find(
    (value: any) => NftTypeByName[value] === nftTypeName
  )
  return nftType !== undefined ? nftType : null
}

export function getNFTTypeByInfo(nftTypeName: any): any {
  const nftType = Object.values(NftType).find(
    (value: any) => NFTInfoType[value] === nftTypeName
  )
  return nftType !== undefined ? nftType : null
}
export function getNftTypeOptions() {
  return enumToOptions(NftType).filter((option) => {
    return option.value !== NftType.PRODUCT
  })
  // return enumToOptions(NftType)
}

export function getNftTypeOptionsForMerchantRequest() {
  return enumToOptions(NftType).map((option) => {
    return {
      label: __(option.label),
      value: option.value.toString(),
    }
  })
}

export function isNftType(value: string | NftType): value is NftType {
  return Object.values(NftType).includes(value as NftType)
}