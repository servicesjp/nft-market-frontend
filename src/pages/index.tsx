import BannerDigital from "@/components/home/banner-digital";
import {ListExperience} from "@/components/home/list-experience";
import Artist from "@/components/home/artist";
import { Stack } from "@chakra-ui/react";
import HeaderContent from "@/layouts/header-content";
import WrappedContent from "@/layouts/wrapped-content";
import Header from "@/components/home/header";
import { MainLayout } from "@/layouts/main-layout";
import { NftType } from "@/types/NftType";
import { useGetProducts } from "@/hooks/api/use-get-products";

function HomePage() {
  const { data: experienceList } = useGetProducts({nftType: NftType.EXPERIENCE});
  const { data: digitalArtList} = useGetProducts({nftType: NftType.DIGITAL_ART});
  return (
    <MainLayout mt={{ base: "64px", md: "122px" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <WrappedContent>
        <Stack gap={{ base: "40px", md: "56px" }}>
          {experienceList && <ListExperience title="Experiences" products={experienceList.items} />}
          <Artist />
          {digitalArtList && <BannerDigital products={digitalArtList.items} />}
        </Stack>
      </WrappedContent>
    </MainLayout>
  );
}

export default HomePage;
