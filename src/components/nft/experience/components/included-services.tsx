import { Box, SimpleGrid, Image, Card, CardBody, Text } from "@chakra-ui/react"
import { serviceIncludeOptions } from "@/constants/create-nft/service-include-options";
export function IncludedServices({serviceInclude}: any){

    return (
<Box id="included-section">
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="24px">
        {serviceIncludeOptions().map((service:any, i:any) => {
          return (
            serviceInclude.includes(service.value) && (
              <Box key={"Items-" + i}>
                <Card flex="1" key={"includedItems-" + i}>
                  <CardBody>
                    <Box>
                      <Image src={service.icon} alt={service.value} />
                    </Box>
                    <Text fontSize="14px" fontWeight="medium">
                      {service.value}
                    </Text>
                  </CardBody>
                </Card>
              </Box>
            )
          );
        })}
      </SimpleGrid>
    </Box>
    )
    
    }