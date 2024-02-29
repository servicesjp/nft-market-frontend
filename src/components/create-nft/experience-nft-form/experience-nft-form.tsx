import ArrowLeft from "@/assets/icons/paginator/arrow-left";
import { showErrorToast, showInfoToast, showSuccessToast } from "@/components/toast";
import { useProductsApi } from "@/hooks/useApi";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { Box, Button, Flex, Text, useTheme } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import FilesStep from "./steps/files-step";
import GeneralInfo from "./steps/general-info";
import MapStep from "./steps/map-step";
import { __ } from "@/helpers/common";
import { useFormFields } from "./fields-form";
import { useInitialValuesBoarding } from "./initial-values-boarding";
import { useValidationSchema } from "./validation-schema";
import { NftType, NftTypeByName } from "@/types/NftType"
import { HttpStatusCode } from "axios";
function ExperienceNFTForm({}: any) {
  const { isConnected, address, chain }: any = useContext(WalletConnectContext);
  const router = useRouter();
  const { formField } = useFormFields();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<any>(0);
  const total = 3;
  const quantityProgress = (1 / total) * 100;
  const [progresStep, setProgresStep] = useState<any>(quantityProgress);
  const [previusComponent, setPreviusComponent] = useState<boolean>(true);
  const isLastStep = activeStep === total - 1;

  const [showWalletConnectModal, setShowWalletConnectModal] = useState(false);

  const { createExperience } = useProductsApi();

  function _renderStepContent(step: any) {
    switch (step) {
      case 0:
        return (
          <GeneralInfo previous={previusComponent} formField={formField} />
        );
      case 1:
        return <MapStep previous={previusComponent} formField={formField} />;
      // case 2:
      //   return <TourInfo previous={previusComponent} formField={formField} />;
      case 2:
        return <FilesStep previous={previusComponent} formField={formField} />;

      default:
        return <div>{__("not_found")}</div>;
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

  async function createFormDataToExperience(values: any) {
    const formData = new FormData();
    // File on FormData
    if (values.profile.length >= 1) {
      formData.append("image", values.profile?.[0]);
    }

    if (values.photos?.length >= 1) {
      // formData.append('gallery', arrayImage)
      values.photos.map((photo: File) => {
        formData.append(`gallery`, photo);
      });
    }

    // Experience object
    const stringArray = values.serviceInclude.length > 0 ? values.serviceInclude.join(",") : "";
    const experience = {
      experienceTitle: values.experienceTitle,
      description: values.description,
      mapPoints: JSON.stringify(values.mapPoints),
      serviceInclude: stringArray,
      currency: values.currency,
      additionalInfo: values.additionalInfo,
    };

    formData.append("experience", JSON.stringify(experience));
    formData.append("userAddress", address);
    formData.append('category', values.category)
    return formData;
  }

  async function createExpNft(values: any) {
    setLoading(true);
    // send data to backend
    try {
      const data = await createFormDataToExperience(values);
      
      const response = await createExperience(data);

      if (response.data) {
        showSuccessToast(__("saved_experience_successfully"));
        router.push(`/nft/${NftTypeByName[NftType.EXPERIENCE]}/${response.data?.id}`);
      } else {
        console.log(response);
        showErrorToast(`${__("error")}: ${response}`);
      }
    } catch (error: any) {
      console.error(error);
      // handle if response is 401 (Unauthorized)
      if (error?.response?.status == HttpStatusCode.Unauthorized) {
        showInfoToast(__('please_check_your_wallet_connection'))
        setShowWalletConnectModal(true);
      } else {
        showErrorToast(`${"error_on_saving"}: ${error}`);
      }
    } finally {
      setLoading(false);
    }
  }

  function titleStep() {
    if (activeStep === 0) {
      return (
        <>
          <Text
            fontSize={"40px"}
            fontWeight={"500"}
            lineHeight={"120%"}
            textAlign={"start"}
          >
            {__("welcome_to_meteor_experience")}
          </Text>

          <Text
            fontSize="14px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="140%"
          >
            {__("thank_you__for_listing_on_meteor")}
          </Text>
        </>
      );
    } else if (isLastStep) {
      return (
        <>
          <Text
            fontSize={"40px"}
            fontWeight={"500"}
            lineHeight={"120%"}
            textAlign={"start"}
          >
            {__("you_are_almost_ready_to_publish_experience")}
          </Text>
        </>
      );
    } else {
      return "";
    }
  }

  return (
    <Box w={"100%"}>
      <Flex flexDir={"column"} gap={"10px"} my={"10px"}>
        {titleStep()}

        <Flex
          gap={"2px"}
          alignItems={"center"}
          onClick={() => _handleBack()}
          cursor="pointer"
        >
          <Box width={"24px"}>
            <ArrowLeft color="#1A202C" />
          </Box>{" "}
          {__("back")}
        </Flex>
      </Flex>

      <Formik
        initialValues={useInitialValuesBoarding()}
        validationSchema={useValidationSchema()[activeStep]}
        onSubmit={(values: any, actions: any) => {
          let data = {};
          if (isConnected) {
            if (isLastStep && values) {
              createExpNft(values);
            } else {
              setLoading(false);
              setPreviusComponent(true);
              setActiveStep(activeStep + 1);
              updateProgress(activeStep + 1);
              actions.setTouched({});
              actions.setSubmitting(false);
            }
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
                fontWeight={600}
                fontSize={"16px"}
                height={"48px"}
                loadingText={__("loading") + ".."}
                isLoading={loading}
                type="submit"
              >
                {isLastStep ? __("post") : __("next")}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ExperienceNFTForm;
