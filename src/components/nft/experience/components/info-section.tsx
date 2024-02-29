import { Box, Text, Divider } from "@chakra-ui/react"
import { __ } from "@/helpers/common";
export function InfoSection ({description}: any) {
    return (
        <Box w="100%" id="info-section">
          <Text fontSize="20px" fontWeight="medium">
            {__("what_will_you_do")}
          </Text>
          <Divider mt="20px"></Divider>
          <Text
            color="gray.400"
            fontSize="14px"
            mt="10px"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Text>
        </Box>
      )
}
 