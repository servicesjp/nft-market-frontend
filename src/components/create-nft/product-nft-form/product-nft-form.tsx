import { Box, Button, Flex, Text, useTheme } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import ArrowLeft from "@/assets/icons/paginator/arrow-left";
import initialValuesBoarding from "./initial-values-boarding";
import fieldsForm from "./fields-form";
import validationSchema from "./validation-schema";
import GeneralInfo from "./steps/general-info";
import { useState, useContext } from "react";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { useRouter } from "next/router";
import { isWalletConnected } from "@/modules/utils";
import useResponsive from "@/hooks/useResponsive";
import DetailInfo from "./steps/detail-info";
import Delivery from "./steps/delivery";
import { __ } from "@/helpers/common";

function ProductNFTForm({} : any)  {
  const { isConnected }: any = useContext(WalletConnectContext);
  const router = useRouter();
  const { formField } = fieldsForm;
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;

  const { isMobile, isTablet } = useResponsive();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<any>(0);
  const total = 3;
  const quantityProgress = (1 / total) * 100;
  const [progresStep, setProgresStep] = useState<any>(quantityProgress);
  const [previusComponent, setPreviusComponent] = useState<boolean>(true);
  const isLastStep = activeStep === total - 1;
  

  function _renderStepContent(step: any) {
    switch (step) {
      case 0:
        return <GeneralInfo previous={previusComponent} formField={formField} />;
      case 1:
        return <DetailInfo previous={previusComponent} formField={formField} />;
      case 2:
        return <Delivery previous={previusComponent} formField={formField} />;
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

  async function createBoarding(values: any) {
    setLoading(true);
    const project_on_boarding = {
      ...values
    };

    
    // AQUI SE REALIZA EL REQUEST AL BACKEND
    // const response: any = await createOnBoarding(data, getToken());
    // if (response.data) {
    //   toast.success("Onboarding Saved", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   router.push(`/launchpad/create/${response?.data?.id}`);
    // } else {
    //   toast.error("Onboarding Not Saved", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
    setLoading(false);
  }

  return (
    <Box
      w={"100%"}
    >
      <Flex
        flexDir={'column'}
        gap={'10px'}
        my={'10px'}
      >
        {
          activeStep === 0 &&
          <Text
            fontSize={"40px"}
            fontWeight={"500"}
            lineHeight={"120%"}
            textAlign={"start"}
          >
            Create{" "}
            <Text as={"span"} bgGradient={gradientColor} bgClip="text">
              New NFT!
            </Text>{" "}
          </Text>
        }

        <Flex
          gap={'2px'}
          alignItems={"center"}
          onClick={() => _handleBack()}
          cursor="pointer"
        >
          <Box width={"24px"}>
            <ArrowLeft color="#1A202C" />
          </Box>{" "}
          Back
        </Flex>
      </Flex>

      <Formik
        initialValues={initialValuesBoarding}
        validationSchema={validationSchema[activeStep]}
        onSubmit={(values: any, actions: any) => {
          let data = {};
          if (isConnected) {
            if (isLastStep && values) {
              createBoarding(values);
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
        {({ isSubmitting } : any) => (
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
                loadingText={__("loading") + "..."}
                isLoading={loading}
                type="submit"
              >
                {isLastStep ? "Create a NFT" : "Next"}
              </Button>
            </Box>
          </Form>
        )}

      </Formik>

    </Box>
  );
}

export default ProductNFTForm;
