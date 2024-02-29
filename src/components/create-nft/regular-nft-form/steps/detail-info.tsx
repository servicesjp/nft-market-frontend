import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { Field } from "formik";
import { motion } from 'framer-motion';

import { PriceInput } from "@/components/price-input";

function DetailInfo({ previous, formField } : any) {  
  const {
    externalLink,
    collection,
    properties,
    levels,
    statistics,
    unlockableContent,
    supply,
    blockchain,
    currency,
    royalty,
    price,
  } = formField

  return (
    <motion.div
    initial={{ opacity: 0, x: previous ? -20: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    >
      <Flex flexDir={"column"} width={"100%"} gap={"24px"}>

        {/* <MultipleFileInput label="Files(up to 5 photos)" name="file" /> */}

        <Field name={externalLink.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.name && form.touched.name}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={externalLink.name}
              >
                {externalLink.label}
              </FormLabel>

              {
                externalLink.subLabel &&
                <Text
                  color='#6B6B6B'
                  fontSize='14px'
                  fontStyle='normal'
                  fontWeight='400'
                  lineHeight='140%'
                  textAlign={'justify'}
                >
                  {externalLink.subLabel}
                </Text>
              }

              <Input {...field} id={externalLink.name} placeholder={externalLink.placeholder} />
              
              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name={supply.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.supply && form.touched.supply}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={supply.name}
              >
                {supply.label}
              </FormLabel>
              {
                supply.subLabel &&
                <Text
                  color='#6B6B6B'
                  fontSize='14px'
                  fontStyle='normal'
                  fontWeight='400'
                  lineHeight='140%'
                  textAlign={'justify'}
                >
                  {supply.subLabel}
                </Text>
              }
              
              <Input 
                {...field}  
                id={supply.name} 
                placeholder={supply.placeholder}
                onChange={(e) => {
                  // Eliminar ceros al inicio
                  const valueWithoutLeadingZeros = e.target.value.replace(/^0+/, '');
                  // Convertir el valor a un número entero
                  const intValue = parseInt(valueWithoutLeadingZeros, 10);
                  // Actualizar el valor del campo en el formulario de Formik
                  form.setFieldValue(supply.name, isNaN(intValue) ? "" : intValue);
                }}
              />
              <FormErrorMessage>{form.errors.supply}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name={royalty.name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.royalty && form.touched.royalty}>
              <FormLabel 
                fontSize={'16px'}
                fontWeight={'600'}
                htmlFor={royalty.name}
              >
                {royalty.label}
              </FormLabel>
              {
                royalty.subLabel &&
                <Text
                  color='#6B6B6B'
                  fontSize='14px'
                  fontStyle='normal'
                  fontWeight='400'
                  lineHeight='140%'
                  textAlign={'justify'}
                >
                  {royalty.subLabel}
                </Text>
              }
              
              <Input 
                {...field}  
                id={royalty.name} 
                placeholder={royalty.placeholder}
              />
              <FormErrorMessage>{form.errors.royalty}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        {/* Price */}
        <PriceInput blockchain={blockchain} currency={currency} price={price}></PriceInput>
        
      </Flex>
    </motion.div>
  );
}

export default DetailInfo;
