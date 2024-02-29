import { ethers } from "ethers"
import moment from "moment"
interface Option {
  value: number
  label: string
}

export function truncarText(text: string, num: number) {
  if (text.length <= num + num) {
    return text
  } else {
    const inicio = text.slice(0, num)
    const final = text.slice(-num)
    return inicio + '...' + final
  }
}

export const createFileUrl = (file: File) => {
  return URL.createObjectURL(file)
}

export const decimalConverter = (value: any) => {
  return ethers.utils.parseUnits(value.toString(), "ether")
}

export const fromWeiConverter = (value: any) => {
  return ethers.utils.formatEther(value)
}

export const convertDate = (date: any) => {
  return moment.utc(date).format("YYYY-MM-DD")
}

export function enumToOptions(enumObj: any): Option[] {
  return Object.keys(enumObj)
    .filter((key) => !isNaN(Number(enumObj[key])))
    .map((key) => ({
      value: enumObj[key],
      label: key,
    }))
}

export function formatDecimalsNumber(n: number, decimals: number): string {
  const result = n.toFixed(decimals)
  const parts = result.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join(".");
}

export function revertParseUnitEthers(number: number, cntDecimals: number) {
  try {
    const result = number / Math.pow(10, cntDecimals)
    return result
  } catch (error) {
    return 0
  }
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}