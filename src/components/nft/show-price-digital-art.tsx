import { formatPrice } from "@/modules/utils";

export const ShowPriceDigitalArt = ({digitalArt}: any) => {
    if (digitalArt?.nftVoucher) {

      return formatPrice(
        digitalArt?.nftVoucher?.minPrice,
        digitalArt?.nftVoucher?.currencyAddress,
        digitalArt?.nftVoucher?.currencyDecimals
      ) +
      " " +
      digitalArt?.nftVoucher?.symbolCurrency;
    } else {
      return 'already minted'
    }
  }