import ArrowLeft from "@/assets/icons/paginator/arrow-left";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import DetailInfo from "./steps/detail-info";
import GeneralInfo from "./steps/general-info";
import { useContext, useState } from "react";
import { useProductsApi } from "@/hooks/useApi";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { isWalletConnected } from "@/modules/utils";
import { NFTVoucherQuantity, NFTVoucherSimple } from "@/types/NFTVoucher";
import { signMessage } from "@wagmi/core";
import { parseUnits } from "ethers/lib/utils.js";
import { useRouter } from "next/router";
import { showErrorToast, showInfoToast, showSuccessToast } from "@/components/toast";
import { NFT1155, NFT721 } from "@/constants/env";
import { useFormFields } from "./fields-form";
import { useInitialValues } from "./initial-values-boarding";
import { useValidationSchema } from "./validation-schema";
import { __ } from "@/helpers/common";
import { NftType, NftTypeByName, NftContractType } from "@/types/NftType"
import { HttpStatusCode } from "axios";
import { useERC20 } from "@/hooks/useERC20";
function RegularNFTForm({}: any) {
  const {
    address,
    isConnected
  } = useContext(WalletConnectContext);
  const router = useRouter();
  const { formField } = useFormFields();
  const { getTokenDetails } = useERC20();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<any>(0);
  const total = 2;
  const quantityProgress = (1 / total) * 100;
  const [progresStep, setProgresStep] = useState<any>(quantityProgress);
  const [previusComponent, setPreviusComponent] = useState<boolean>(true);
  const isLastStep = activeStep === total - 1;
  const { saveInitialProduct, initProduct } = useProductsApi();

  function _renderStepContent(step: any) {
    switch (step) {
      case 0:
        return (
          <GeneralInfo previous={previusComponent} formField={formField} />
        );
      case 1:
        return <DetailInfo previous={previusComponent} formField={formField} />;
      default:
        return <div>Not Found</div>;
    }
  }

  function updateProgress(activeStep: any) {
    setProgresStep(quantityProgress * (activeStep + 1));
  }

  function _handleBack() {
    if (activeStep - 1 >= 0) {

      setPreviusComponent(false);
      setActiveStep(activeStep - 1);
      updateProgress(activeStep - 1);
    } else {
      router.push('/create-nft')
    }
  }

  function createFormDataToProduct(
    values: any,
    nftVoucher: NFTVoucherSimple | NFTVoucherQuantity,
    signature: string,
    symbol: any,
    decimals: any
  ) {
    const formData = new FormData();

    const arrayTagsToText = values.tags
      .map((tag: string) => tag.trim())
      .join(",");

    // File on FormData
    if (values.fileNFT.length > 0) {
      const arrayImage = [...values.fileNFT];
      // formData.append('image', arrayImage[0])

      arrayImage.shift();
      if (values.fileNFT.length > 1) {
        // formData.append('gallery', arrayImage)
        arrayImage.map(([key, value]: any) => {
          formData.append(`gallery`, value);
        });
      }
    }

    formData.append("name", values.nftName);
    formData.append("description", values.description);
    formData.append("tags", arrayTagsToText);
    formData.append("supply", values.supply);
    formData.append("currencyTokenAddress", values.currency);
    formData.append("chainId", values.blockchain);

    formData.append("signature", signature);
    formData.append("minPrice", nftVoucher.minPrice);
    formData.append("royalty", nftVoucher.royalty);
    formData.append("uri", nftVoucher.uri);
    formData.append("externalLink", values.externalLink);
    formData.append("nonce", nftVoucher.nonce);

    formData.append("symbolCurrency", symbol);
    formData.append("currencyDecimals", decimals)

    if (values.supply > 1) {
      formData.append("contractNftAddress", NFT1155[values.blockchain])
      formData.append("nftContractType",  NftContractType.NFT1155.toString())
    } else {
      formData.append("contractNftAddress", NFT721[values.blockchain])
      formData.append("nftContractType",  NftContractType.NFT721.toString())
    }
    return formData;
  }

  async function createNFT(values: any) {
    setLoading(true);
    // IPFS upload img
    try {
      let addressCreator;
      if (!isConnected) {
        showErrorToast(__('connect_your_wallet'));
        router.push("/");
      } else {
        addressCreator = address;
      }

      const formData = new FormData();
      if (values.fileNFT.length > 0) {
        const arrayImage = [...values.fileNFT];
        formData.append("image", arrayImage[0]);
      }
      formData.append("userAddress", addressCreator);
      formData.append("chainId", values.blockchain);
      formData.append("name", values.nftName);
      formData.append("description", values.description);
      formData.append("royalty", values.royalty);
      const { decimals, symbol } = getTokenDetails(values.blockchain, values.currency);
      try {
        const response: any = await initProduct(formData);
        if (response?.data) {
          const idProduct = response?.data.id;
          const tmpNftVoucher = response?.data.nftVoucher;
  
          let nftVoucherObject: NFTVoucherSimple | NFTVoucherQuantity;
          
          if (values.supply > 1) {
            nftVoucherObject = {
              name: values?.nftName,
              description: values?.description,
              tokenId: tmpNftVoucher?.tokenId,
              royalty: (values?.royalty).toString(),
              quantity: values?.supply,
              minPrice: parseUnits(values.price.toString(), decimals).toString(),
              uri: tmpNftVoucher?.uri,
              creator: addressCreator,
              token: values?.currency,
              nonce: tmpNftVoucher?.nonce,
            };
          } else {
            nftVoucherObject = {
              name: values?.nftName,
              description: values?.description,
              tokenId: tmpNftVoucher?.tokenId,
              royalty: (values?.royalty).toString(),
              minPrice: parseUnits(values.price.toString(), decimals).toString(),
              uri: tmpNftVoucher?.uri,
              creator: addressCreator,
              token: values?.currency,
              nonce: tmpNftVoucher?.nonce,
            };
          }

          const signature = await signMessage({
            message: JSON.stringify(nftVoucherObject),
          });
          // the signature and the new data are sent to the backend
          const formData = createFormDataToProduct(
            values,
            nftVoucherObject,
            signature,
            symbol,
            parseInt(decimals.toString())
          );
  
          const saveProductResponse = await saveInitialProduct(
            idProduct,
            formData
          );
          if (saveProductResponse.data) {
            showSuccessToast(__('create_digital_art_success'));
            router.push(`/nft/${NftTypeByName[NftType.DIGITAL_ART]}/${idProduct}`);
          } else {
            throw Error(__('create_digital_art_failed'));
          }
        } else {
          throw Error(__('starting_digital_art_err'));
        }

      } catch (error: any) {
        // handle if response is 401 (Unauthorized)
        if (error?.response?.status == HttpStatusCode.Unauthorized) {
          showInfoToast(__('please_check_your_wallet_connection'))
        } else {
          throw Error(__('starting_digital_art_err'))
        }

      }

      // main catch
    } catch (error: any) {
      showErrorToast(
        error?.message ? error.message : __('create_digital_art_failed')
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box w={"100%"}>
      <Flex flexDir={"column"} gap={"10px"} my={"10px"}>
        {activeStep === 0 && (
          <Text
            fontSize={"40px"}
            fontWeight={"500"}
            lineHeight={"120%"}
            textAlign={"start"}
          >
            {__('create_nft')}
          </Text>
        )}

        <Flex
          gap={"2px"}
          alignItems={"center"}
          onClick={() => _handleBack()}
          cursor="pointer"
        >
          <Box width={"24px"}>
            <ArrowLeft color="#1A202C" />
          </Box>{" "}
          {__('back')}
        </Flex>
      </Flex>

      <Formik
        initialValues={useInitialValues()}
        validationSchema={useValidationSchema()[activeStep]}
        onSubmit={(values: any, actions: any) => {
          let data = {};
          if (isConnected) {
            if (isLastStep && values) {
              createNFT(values);
            } else {
              setLoading(false);
              setPreviusComponent(true);
              setActiveStep(activeStep + 1);
              updateProgress(activeStep + 1);
              actions.setTouched({});
              actions.setSubmitting(false);
            }
          }
          {
            isWalletConnected(!isConnected);
          }
        }}
      >
        {({ isSubmitting }: any) => (
          <Form>
            <Box>{_renderStepContent(activeStep)}</Box>
            <Box mt={"24px"}>
              <Button
                borderRadius={"4px"}
                width={"100%"}
                border={"1px solid #0020E6"}
                _hover={{
                  backgroundColor: "primary.10",
                  color: "primary.100",
                }}
                className="SF Pro Text"
                mt={4}
                backgroundColor="primary.100"
                color={"white"}
                fontSize={"16px"}
                height={"48px"}
                loadingText={__("loading") + "..."}
                isLoading={loading}
                type="submit"
              >
                {isLastStep ? __("create_nft_unstyled") : __("next")}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default RegularNFTForm;
