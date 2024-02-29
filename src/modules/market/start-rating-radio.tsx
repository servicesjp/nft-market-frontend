import { useRadio, HStack, Center, Icon, Box, Flex, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function StarRatingRadio({ radio, children, onClick }: any) {
    const { getInputProps, getRadioProps } = useRadio(radio);
    const input = getInputProps();
    const checkbox = getRadioProps();
    const { isChecked } = radio;
  
    return (
      <Box as="label" onClick={onClick}>
        <input {...input} />
        <Flex
          {...checkbox}
          py={"16px"}
          px={"12px"}
          cursor="pointer"
          border={"1.5px solid #DDE3EE"}
          borderRadius="4px"
          boxShadow="md"
          _checked={{
            border: "1.5px solid",
            borderColor: "primary.100",
          }}
        >
          <HStack justifyContent="space-between" w={"100%"}>
            <HStack gap={"4px"}>
              <Center boxSize={"28px"}>
                <Icon as={FaStar} color={"teal.500"} boxSize={"20px"} />
              </Center>
              <Text fontSize={"16px"} fontWeight={"500"}>
                {children}
              </Text>
            </HStack>
            {isChecked ? (
              <Flex
                minW={"26px"}
                h={"26px"}
                border={"1.5px solid"}
                borderColor={"primary.100"}
                borderRadius={"50%"}
                justifyContent="center"
                alignItems="center"
              >
                <Flex
                  minW={"12px"}
                  h={"12px"}
                  bg={"primary.100"}
                  borderRadius={"50%"}
                />
              </Flex>
            ) : (
              <Box
                minW={"26px"}
                h={"26px"}
                border={"1.5px solid #DDE3EE"}
                borderRadius={"50%"}
              />
            )}
          </HStack>
        </Flex>
      </Box>
    );
  }
  