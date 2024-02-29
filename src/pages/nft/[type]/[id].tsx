import { useProductsApi } from "@/hooks/useApi";
import { Box, Center, Hide, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DigitalArt from "@/components/nft/digital-art";
import Experience from "@/components/nft/experience";
import Product from "@/components/nft/physical/product";
import MEbreadcrumb from "@/components/MEbreadcrumb";
import Spinner from "@/components/spinner";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import { ApprovalStatus } from "@/types/ApprovalStatus";
import { routesPage } from "@/modules/routes";
import { NftType } from "@/types/NftType";
import { __ } from "@/helpers/common";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";

function SingleNft() {
  const router = useRouter();
  const [idNFT, _] = useState<any>(router.query.id);
  const { isConnected, address  } =  useContext<any>(WalletConnectContext);
  const { singleProduct } = useProductsApi();
  const [item, setItem] = useState<any | undefined>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [itemType, setItemType] = useState<NftType >();
  const [toRedirec, setRedirect] = useState<string>("#")
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await singleProduct(idNFT);
      const isVoucher = data?.nftVoucher;
      const isOwner = data?.ownerAddress?.address?.toLowerCase() == address?.toLowerCase();
      const isWaitingOrDeniedOrHidden = [ApprovalStatus.WAITING, ApprovalStatus.DENIED, ApprovalStatus.HIDDEN].includes(data?.approvalStatus);
      if (isVoucher && isWaitingOrDeniedOrHidden && (!isConnected || !isOwner)) {
        router.push(routesPage.marketplaceExp);
        return;
      }

      setItem(data);
      const nftType = (data?.nftType as NftType)
      setItemType(nftType)
      const redirect = getRedirect(nftType)
      setRedirect(redirect)
    } catch (error) {
      router.push(routesPage.marketplaceExp);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const getRedirect = (itemType: NftType)=>{
    switch (itemType) {
      case NftType.EXPERIENCE:
        return routesPage.marketplaceExp
      case NftType.PRODUCT:
        return routesPage.marketplacePro
      case NftType.DIGITAL_ART:
        return routesPage.marketplaceDig
      default:
        return "#"
    }
  }
  const renderItemTypeView = () => {
    switch (itemType) {
      case NftType.EXPERIENCE:
        return <Experience product={item}/>;
      case NftType.PRODUCT:
        return <Product />;
      case NftType.DIGITAL_ART:
        return <DigitalArt digitalArtData={item} />;
    }
  };

  return (
    <>
      <Hide above="md">
        <MainLayout marginY="16px">
          <WrappedContent>
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              renderItemTypeView()
            )}
          </WrappedContent>
        </MainLayout>
      </Hide>
      <Hide below="md">
        <MainLayout>
          <WrappedContent>
            <Stack spacing="0" w={"100%"}>
              <MEbreadcrumb
                items={[
                  { text: `NFT ${__("home")}`, link: `${routesPage.home}` },
                  { text: __("marketplace"), link: `${toRedirec}` },
                  {
                    text:
                      itemType === NftType.EXPERIENCE
                        ? __("experience")
                        : __("digital_art"),
                    link: "#",
                    isCurrentPage: true,
                  },
                ]}
              />

              {loading ? <Spinner /> : <Box>{renderItemTypeView()}</Box>}
            </Stack>
          </WrappedContent>
        </MainLayout>
      </Hide>
    </>
  );
}
export default SingleNft;
