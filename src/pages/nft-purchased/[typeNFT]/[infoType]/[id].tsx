import { useRouter } from "next/router";
import { useState } from "react";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import { NftType, getNFTTypeByName, getNFTTypeByInfo } from "@/types/NftType";
import ExperiencePurchased from "@/components/nft-purchased/experience";
export default function Details() {
  const router = useRouter();
  const { typeNFT, infoType, id } = router?.query
  const [idNFT, setIdNFT] = useState<any>(id);
  const [loading, setLoading] = useState<boolean>(false);
  const itemType = getNFTTypeByName(typeNFT)
  const info = getNFTTypeByInfo(infoType)
  if (!itemType || !info) {
    router.push("/404")
  }
  const renderItemTypeView = (itemType: number) => {
    switch (itemType) {
      case NftType.EXPERIENCE:
        return <ExperiencePurchased ticketId={id} />
      case NftType.PRODUCT:
        return <>hola product</>;
      case NftType.DIGITAL_ART:
        return <>hola digital</>;
    }
  };
  return (
    <MainLayout>
      <WrappedContent>{renderItemTypeView(itemType)}</WrappedContent>
    </MainLayout>
  );
}
