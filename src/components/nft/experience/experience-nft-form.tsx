import ArrowLeft from "@/assets/icons/paginator/arrow-left";
import { __ } from "@/helpers/common";
import useResponsive from "@/hooks/useResponsive";
import { Box, Flex, useTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

function ExperienceNFTForm({}: any) {
  const router = useRouter();
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;

  const { isMobile, isTablet } = useResponsive();
  const [loading, setLoading] = useState(false);

  return (
    <Box w={"100%"}>
      <Flex flexDir={"column"} gap={"10px"} my={"10px"}>
        <Flex gap={"2px"} alignItems={"center"}>
          <Box width={"24px"}>
            <ArrowLeft color="#1A202C" />
          </Box>{" "}
          {__("back")}
        </Flex>
      </Flex>
    </Box>
  );
}

export default ExperienceNFTForm;
