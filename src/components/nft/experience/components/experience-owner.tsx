 import { __ } from "@/helpers/common"
import { Avatar, Box, Card, CardHeader, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import router from "next/router"
import { useState } from "react"
import { MdVerified } from "react-icons/md"

export function ExperienceOwner({owner}: any) {
    const [ownerProduct, _ ] = useState<any>(owner);
    return (
        <Card w={"100%"} id="description-section">
          <CardHeader>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={`${ownerProduct?.firstName} ${ownerProduct?.lastName}`}
                src={ownerProduct?.avatarUrl}
              />
    
              <Box>
                <Heading
                  size="sm"
                  _hover={{
                    fontWeight: "700",
                    textDecoration: "underline",
                    transition: "all 0.5s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => router.push(`/profile/${ownerProduct?.id}`)}
                >
                  {`${ownerProduct?.firstName} ${ownerProduct?.lastName}`}
                </Heading>
                <Flex mt="8px">
                  <MdVerified color="#00CFB4" />
                  <Text
                    ml="6px"
                    color="#00CFB4"
                    fontWeight="medium"
                    fontSize="14px"
                  >
                    {__("verified")}{" "}
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <Divider mt="24px"></Divider>
            <Text py="20px">
              Our passion for traveling and exploring gave us the opportunity to
              open our minds and give us another perspective of the world. The idea
              of Travel Buddies, is the consequence of our constant contact with
              travelers from different parts of the world and their need to try new
              experiences making them be in contact with the local culture and not
              only with the touristic.
            </Text>
          </CardHeader>
        </Card>
      );
}