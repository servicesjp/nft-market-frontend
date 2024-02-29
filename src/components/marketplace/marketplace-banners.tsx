import DigitalArtBanner from "@/assets/marketplace/digital-art-banner.png";
import ExperiencesBanner from "@/assets/marketplace/experiences-banner.png";
import { NftType } from "@/types/NftType";
import Image from "next/image";

export function MarketplaceBanners({ nftType }: { nftType: NftType }) {
    const alt =
      nftType === NftType.EXPERIENCE
        ? "Experiences banner"
        : "Digital Arts banner";
    const src = nftType === NftType.EXPERIENCE ? ExperiencesBanner : DigitalArtBanner;
    return <Image alt={alt} src={src} />;
  }
  