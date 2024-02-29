import LoginRequired from "@/components/required/login-required";
import CreateReviewForm from "@/components/nft/experience/create-review-form";
import Spinner from "@/components/spinner";
import { __ } from "@/helpers/common";
import { useProductsApi } from "@/hooks/useApi";
import useResponsive from "@/hooks/useResponsive";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { ApprovalStatus } from "@/types/ApprovalStatus";
import { NftType } from "@/types/NftType";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Show,
  Text,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Product } from "@/types/nft/product";
import TextHighlight from "@/components/text-highlight";


const CreateReview = () => {

  const router = useRouter();
  const { singleProduct } = useProductsApi()
  const { address } =
    useContext<any>(WalletConnectContext);

  const [idNFT, setIdNFT] = useState<any>(router.query.id);
  const [item, setItem] = useState<any | undefined>({});
  const { isMobile, isTablet } = useResponsive()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    singleProduct(idNFT)
      .then((res) => {
        if (!res.data?.id) {
          router.push("/marketplace/experience");
          return;
        }

        if (
          (res.data?.approvalStatus as ApprovalStatus) !==
            ApprovalStatus.APPROVED &&
          res.data?.ownerAddress?.address?.toLowerCase() !==
            address?.toLowerCase()
        ) {
          router.push("/marketplace/experience");
          return;
        }

        if (res.data?.nftType != NftType.EXPERIENCE) {
          throw Error(__('product_is_not_experience'))
        }

        setItem(res.data);
      })
      .catch((err) => {
        router.push("/marketplace/experience");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MainLayout>
      <WrappedContent>
        <LoginRequired>
          <Box>
            {
              loading ?
                <Spinner></Spinner>
                :
                <Flex height={"100%"}>

                  <Flex
                    {...(isMobile
                      ? { flexBasis: "100%", paddingTop: "44px", paddingX: "24px" }
                      : isTablet
                        ? { flexBasis: "100%", paddingTop: "10%", paddingX: "20%" }
                        : {
                          paddingX: "24px",
                          flexBasis: "50%",
                        })}
                    w={"100%"}
                  >
                    {/* <CreateReviewForm product={item} /> */}
                  </Flex>

                  {!isMobile && !isTablet && (
                    <Flex
                      overflow={"hidden"}
                      h={'100%'}
                      flexBasis={"50%"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={'center'}
                      position={"relative"}
                      m={"24px"}
                      borderRadius={"4px"}
                      backgroundColor={"rgba(242, 246, 252, 0.26)"}
                    >
                      <Image
                        minW="100%"
                        borderRadius="4px"
                        maxH={"550px"}
                        src={item?.mediaAssets?.[0]?.path}
                        objectFit="cover"
                        objectPosition="center"
                        alt={item?.mediaAssets?.[0]?.originalFileName}
                      />

                    </Flex>
                  )}

                </Flex>
            }
          </Box>
        </LoginRequired>
      </WrappedContent>
    </MainLayout>
    
  );
};

export default CreateReview;

