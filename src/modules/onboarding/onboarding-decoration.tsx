import { __ } from "@/helpers/common";
import { Box, Hide, Image } from "@chakra-ui/react";

export default function OnboardingDecoration() {
  return (
    <Hide below="md">
      <Box marginTop={"-120px"} marginRight={"-120px"}>
        <Image
          maxWidth={"630px"}
          translate="yes"
          translateY={"-150px"}
          src="/images/onboarding_decoration.png"
          alt={__('s_app_in_action_mobile')}
        />
      </Box>
    </Hide>
  );
}
