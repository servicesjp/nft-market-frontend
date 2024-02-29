import ArrowLeft from "@/assets/icons/paginator/arrow-left";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import MerchantApplication from "./steps/merchant-application";
// import { getUserId } from "@/modules/auth/auth-service";
import { useContext, useState } from "react";
// import { createOnBoarding } from "@/modules/launchpad/request-back";
import { useUserApi } from "@/hooks/useApi";
import useResponsive from "@/hooks/useResponsive";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { isWalletConnected } from "@/modules/utils";
import { useRouter } from "next/router";
import { __ } from "@/helpers/common";
import { showErrorToast, showSuccessToast } from "@/components/toast";
import { useFormFields } from "./checkout-onboarding";
import { useInitialValuesBoarding } from "./initial-values-boarding";
import { useValidationSchema } from "./validation-schema";

function FormBoarding({
  setSendMerchantRequest
} : any)  {
  const { isConnected }: any = useContext(WalletConnectContext);
  const router = useRouter();
  const { sendNewMerchantRequest } = useUserApi()

  const { isMobile, isTablet } = useResponsive();
  const { formField } = useFormFields()
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<any>(0);
  const total = 1;
  const quantityProgress = (1 / total) * 100;
  const [progresStep, setProgresStep] = useState<any>(quantityProgress);
  const isLastStep = activeStep === total - 1;
  

  function _renderStepContent(step: any) {
    switch (step) {
      case 0:
        return <MerchantApplication formField={formField} />;
      default:
        return <div>Not Found</div>;
    }
  }
  
  function updateProgress(activeStep: any) {
    console.log("update", activeStep);
    switch (activeStep) {
      case 0:
        setProgresStep(quantityProgress);
        break;
      default:
        setProgresStep(100);
        break;
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
    updateProgress(activeStep - 1);
  }

  async function createBoarding(values: any) {
    try {
      setLoading(true);

      const merchantRequestData = {
        fullName: values.fullName,
        country: values.country?.name,
        city: values.city?.name,
        identityCardType: values.identityCardType,
        identityCardNumber: values.identityCardNumber,
        reason: values.reason,
        businessDescription: values.businessDescription,
        nftTypes: values.nftTypes,
      };
      
      const response: any = await sendNewMerchantRequest(merchantRequestData);
  
      if (response.data) {
        showSuccessToast('Merchant Request Sended')
        setSendMerchantRequest(true);
      } else {
        showErrorToast('Error sending merchant request.')
      }
      
    } catch (error) {
      showErrorToast('Error saving merchant request.')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex
      w={"100%"}
      paddingX={isMobile ? '12px': isTablet ? '24px' : "108px"}
      pt={"36px"}
      gap={"16px"}
      flexDir={'column'}
    >

      <Box
        display={'flex'}
        alignSelf={'start'}
        justifyContent={'start'}
      >
        <Image
          zIndex={1}
          src="/nft/logo-meteor.svg"
          alt="Logo image"
          cursor={"pointer"}
          onClick={() => router.push("/")}
        />
      </Box>

      <Flex
        alignItems={"center"}
        {...(isMobile || isTablet ? { justifyContent: "space-between" } : {})}
      >
        <Flex
          gap={2}
          alignItems={"center"}
          {...(activeStep > 0
            ? {
                onClick: () => _handleBack(),
                cursor: "pointer",
              }
            : {
                opacity: "0.5",
              })}
        >
          <Box 
            width={"40px"}
            rounded={'full'}
            bg={'#F2F6FC'}
            onClick={() => router.push('/account')}
            cursor={'pointer'}
          >
            <ArrowLeft color="black" />
          </Box>
        </Flex>
      </Flex>

      <Formik
        initialValues={useInitialValuesBoarding()}
        validationSchema={useValidationSchema()[activeStep]}
        onSubmit={(values: any, actions: any) => {
          let data = {};
          if (isConnected) {
            if (isLastStep && values) {
              createBoarding(values);
            } else {
              setLoading(false);
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
            <Box my={"24px"}>
              <Button
                borderRadius={"4px"}
                width={"100%"}
                border={"1px solid #0020E6"}
                _hover={{
                  backgroundColor: "primary.10",
                  color: "primary.100",
                }}
                mt={4}
                backgroundColor="primary.100"
                color={"white"}
                fontWeight={600}
                fontSize={"16px"}
                height={"48px"}
                loadingText={__("loading") + "..."}
                isLoading={loading}
                type="submit"
              >
                {/* {isLastStep ? "Get Started" : "Next"} */}
                {__("next")}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

    </Flex>
  );
}

export default FormBoarding;
