
import PriceHistoryChart from "@/components/chart/price-history-chart";
import { __ } from "@/helpers/common";
import { useProductsApi } from "@/hooks/useApi";
import { formatPrice } from "@/modules/utils";
import { TimeStat } from "@/types/TimeStat";
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Card,
  Center,
  CardBody
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function TokenChart({
  product,
}: any) {

  const [data, setData] = useState<TimeStat[]>([]);
  const { priceHistoryProduct } = useProductsApi()

  useEffect(() => {
    
    priceHistoryProduct(product?.id)
      .then((data) => {
        setData(
          data.map((item) => {
            return {
              ...item,
              value: parseFloat(
                formatPrice(
                  item.value,
                  product?.currencyAddress,
                  product?.currencyDecimals
                )
              ),
            };
          })
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [product]);

  return (
    <>
      <Card
        w={"100%"}
        height={"fit-content"}
        border={{base: "none", md: "1px solid #dddddd"}}
        borderRadius="4px"
        variant={{ base: "unstyled", md: "elevated" }}
      >
        <CardBody>
        <AccordionItem my={{base: "24px", md: "0"}}>
            <h2>
              <AccordionButton py={{base: "14px", md: "0"}} borderBottom={{base: "2px solid #E6E6E6", md: "none"}}>
              <Box as="span" flex="1" textAlign="left">
                <Box
                  fontWeight={"500"}
                  fontSize={{ base: "20px", md: "16px" }}
                  color="gray.800"
                >
                  {__("price_history")}
                </Box>
                </Box>

                <AccordionIcon w="30px" h="30px" color="#231F20"/>
              </AccordionButton>
            </h2>
            <AccordionPanel p={"0px"}>
              {/* <LineChartLite chartType="line" symbol={id}/> */}
              {data.length > 0 ? (
                <PriceHistoryChart chartType="line" data={data} />
              ) : (
                <Center textAlign={"center"} w={"100%"} py={"16px"}>
                  {__("no_data_found")}
                </Center>
              )}
            </AccordionPanel>
          </AccordionItem>
        </CardBody>
      </Card>
    </>
  );
}