import { __ } from "@/helpers/common";
import { Box, Text, Progress } from "@chakra-ui/react"

function FormStepProgress({ progress, step, total }: any) {
  return (
    <Box width={"100%"} paddingY={"44px"}>
        <Progress value={progress} size='sm' colorScheme="brand" borderRadius={"30px"} backgroundColor={"#E6E6E6"} />
        <Text mt={"12px"}>{step + 1 } {__('of')} {total}</Text>
    </Box>
  );
}

export default FormStepProgress