import {
  Flex
} from "@chakra-ui/react";
import { motion } from "framer-motion";

function TourInfo({ previous, formField }: any) {
  const { 
    // adultTickets,
    // childrenTickets,
    // days,
    // startHour,
    // endHour,
    blockchain,
    currency,
    // price,
    additionalInfo, 
  } = formField;

  return (
    <motion.div
      initial={{ opacity: 0, x: previous ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Flex flexDir={"column"} width={"100%"} gap={"14px"}>
        
        {/* Price */}
        {/* <PriceInput blockchain={blockchain} currency={currency}></PriceInput> */}

        {/* Additional info */}
        {/* <Field name={additionalInfo.name}>
          {({ field, form }: any) => (
            <FormControl
              isInvalid={
                form.errors.additionalInfo && form.touched.additionalInfo
              }
            >
              <Flex flexDir={"row"} gap={"8px"} justifyContent={"start"}>

                <Flex flexDir={"column"} alignItems={"start"}>
                  <Text fontSize={"16px"} fontWeight={"600"}>
                    {additionalInfo.label}
                  </Text>

                  {additionalInfo.subLabel && (
                    <Text
                      w={"90%"}
                      color="#6B6B6B"
                      fontSize="14px"
                      fontStyle="normal"
                      fontWeight="400"
                      lineHeight="140%"
                      textAlign={"justify"}
                    >
                      {additionalInfo.subLabel}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Textarea
                {...field}
                id={additionalInfo.name}
                placeholder={additionalInfo.placeholder}
              />
              <FormErrorMessage>{form.errors.additionalInfo}</FormErrorMessage>
            </FormControl>
          )}
        </Field> */}
      </Flex>
    </motion.div>
  );
}

export default TourInfo;
