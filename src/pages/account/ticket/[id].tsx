import ArrowDown from "@/assets/icons/arrow-down";
import ArrowRight from "@/assets/icons/arrow-right";
import { __ } from "@/helpers/common";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import {
  Box,
  Card,
  CardBody,
  Center,
  Divider,
  HStack,
  Heading,
  ListItem,
  Show,
  Spacer,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import MessageIcon from "@/assets/icons/message.svg";
import GlobalIcon from "@/assets/icons/global.svg";
import ReceiptIcon from "@/assets/icons/receipt.svg";
import HomeTwo from "@/assets/icons/home-two.svg";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

export default function Ticket() {
  const [map, setMap] = useState<any>();

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  return (
    <MainLayout>
      <WrappedContent>
        <Link href={"/account"}>
          <HStack gap={"12px"}>
            <ArrowDown color="#231C35" />
            <Text color={"primary.200"}>{__("nft_profile")}</Text>
          </HStack>
        </Link>
        <Stack gap={"24px"}>
          <Stack>
            <Heading
              textTransform={"capitalize"}
              fontWeight={"500"}
              fontSize={"32px"}
            >
              {__("resume")}
            </Heading>
            <Text fontSize={"16px"}>Welcome to NFT dashboard</Text>
          </Stack>

          <HStack align={"flex-start"} gap={"24px"}>
            <Stack w={{ base: "100%", md: "50%" }} gap={"24px"}>
              <Card>
                <CardBody p={"24px"}>
                  <Stack gap={"24px"} fontSize={"16px"}>
                    <HStack w={"100%"} justify={"space-between"}>
                      <Stack gap={"24px"}>
                        <Text fontWeight={"500"}>Check-in</Text>
                        <Text>Sat, Jun 25 2:00 PM</Text>
                      </Stack>
                      <Center height="72px">
                        <Divider color={"#F2F5F8"} orientation="vertical" />
                      </Center>
                      <Stack gap={"24px"} textAlign={"right"}>
                        <Text fontWeight={"500"}>Checkout</Text>
                        <Text>Sun, Jun 26 11:00 AM</Text>
                      </Stack>
                    </HStack>
                    <Divider w={"100%"} />
                    <HStack align={"flex-start"} w={"100%"}>
                      <MessageIcon />
                      <Stack>
                        <Text lineHeight={"20px"} fontWeight={"500"}>
                          Message your host
                        </Text>
                        <Text lineHeight={"20px"}>Lorena</Text>
                      </Stack>
                    </HStack>
                    <HStack align={"flex-start"} w={"100%"} fontSize={"16px"}>
                      <Box boxSize={"20px"}>
                        <GlobalIcon />
                      </Box>
                      <Stack>
                        <Text lineHeight={"20px"} fontWeight={"500"}>
                          Your place
                        </Text>
                        <Text lineHeight={"20px"}>
                          5*Private Suite ocean view near airport/Miraflores
                        </Text>
                      </Stack>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
              {/* How is coming card */}
              <Card>
                <CardBody p={"24px"}>
                  <Stack gap={"24px"} fontSize={"16px"}>
                    <Stack gap={"8px"}>
                      <Text fontWeight={"500"}>How is coming</Text>
                      <Text>2 guests</Text>
                    </Stack>
                    <Divider w={"100%"} />
                    <Stack gap={"8px"}>
                      <Text fontWeight={"500"}>Comfirmation code</Text>
                      <Text>FFGTKOPS1E</Text>
                    </Stack>
                    <Divider w={"100%"} />
                    <Stack gap={"16px"}>
                      <Stack gap={"8px"}>
                        <Text fontWeight={"500"}>Cancellation policy</Text>
                        <Text>
                          Free cancellation before 24 hours prior to your
                          reservation.
                        </Text>
                      </Stack>
                      <Link href={"#"}>
                        <Text
                          fontWeight={"500"}
                          color={"primary.100"}
                          _hover={{
                            textDecoration: "underline",
                          }}
                        >
                          {__("read_more")}
                        </Text>
                      </Link>
                    </Stack>
                    <Stack gap={"18px"}>
                      <Divider w={"100%"} />
                      <HStack w={"100%"}>
                        <Box boxSize={"20px"}>
                          <GlobalIcon />
                        </Box>
                        <Text lineHeight={"20px"}>
                          Get a PDF for visa purposes
                        </Text>
                        <Spacer />
                        <Link href={"#"}>
                          <ArrowRight color="#221C35" />
                        </Link>
                      </HStack>
                      <Divider w={"100%"} />
                      <HStack w={"100%"}>
                        <ReceiptIcon />
                        <Text lineHeight={"20px"}>Get receipt</Text>
                        <Spacer />
                        <Link href={"#"}>
                          <ArrowRight color="#221C35" />
                        </Link>
                      </HStack>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
              {/* Rules and instructions card*/}
              <Card>
                <CardBody p={"24px"}>
                  <Stack gap={"24px"} fontSize={"16px"}>
                    <Text fontSize={"24px"} fontWeight={"500"}>
                      Rules and instructions
                    </Text>
                    <Stack gap={"16px"}>
                      <Stack gap={"8px"}>
                        <Text fontWeight={"500"}>House rules</Text>
                        <UnorderedList>
                          <ListItem>Self check-in with Smart lock</ListItem>
                          <ListItem>4 guests maximum</ListItem>
                          <ListItem>No pets</ListItem>
                        </UnorderedList>
                      </Stack>
                      <Link href={"#"}>
                        <Text
                          fontWeight={"500"}
                          color={"primary.100"}
                          _hover={{
                            textDecoration: "underline",
                          }}
                        >
                          {__("show_more")}
                        </Text>
                      </Link>
                    </Stack>
                    <Stack gap={"18px"}>
                      <Divider w={"100%"} />
                      <HStack w={"100%"}>
                        <Box boxSize={"20px"}>
                          <HomeTwo />
                        </Box>
                        <Text lineHeight={"20px"}>Show listing</Text>
                        <Spacer />
                        <Link href={"#"}>
                          <ArrowRight color="#221C35" />
                        </Link>
                      </HStack>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
              {/* Hosted By card*/}
              <Card>
                <CardBody p={"24px"}>
                  <Stack gap={"24px"} fontSize={"16px"}>
                    <Text fontSize={"24px"} fontWeight={"500"}>
                      Hosted by Miguel
                    </Text>
                    <Stack gap={"16px"}>
                      <Stack gap={"8px"}>
                        <Text fontWeight={"500"}>About your host</Text>
                        <Text>
                          Wynwood House is a next-gen hospitality brand that
                          brings together travelers from across the globe into a
                          network of apartments - with staple
                          quality,design,educational purpose, and
                          sustainability.
                        </Text>
                      </Stack>
                      <Link href={"#"}>
                        <Text
                          fontWeight={"500"}
                          color={"primary.100"}
                          _hover={{
                            textDecoration: "underline",
                          }}
                        >
                          {__("show_more")}
                        </Text>
                      </Link>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
              {/* Payment info card*/}
              <Card>
                <CardBody p={"24px"}>
                  <Stack gap={"24px"} fontSize={"16px"}>
                    <Text fontSize={"24px"} fontWeight={"500"}>
                      Payment information
                    </Text>
                    <Stack gap={"16px"}>
                      <Stack gap={"8px"}>
                        <Text fontWeight={"500"}>Total cost</Text>
                        <Text>Total before taxes: $326.16</Text>
                      </Stack>
                    </Stack>
                    <Stack gap={"18px"}>
                      <Divider w={"100%"} />
                      <HStack w={"100%"}>
                        <Box boxSize={"20px"}>
                          <GlobalIcon />
                        </Box>
                        <Text lineHeight={"20px"}>
                          Add details for expensing your trip
                        </Text>
                        <Spacer />
                        <Link href={"#"}>
                          <ArrowRight color="#221C35" />
                        </Link>
                      </HStack>
                      <Divider w={"100%"} />
                      <HStack w={"100%"}>
                        <Box boxSize={"20px"}>
                          <ReceiptIcon />
                        </Box>
                        <Text lineHeight={"20px"}>Get receipt</Text>
                        <Spacer />
                        <Link href={"#"}>
                          <ArrowRight color="#221C35" />
                        </Link>
                      </HStack>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
              {/* Get support card */}
              <Card>
                <CardBody p={"24px"}>
                  <Stack gap={"24px"} fontSize={"16px"}>
                    <Stack gap={"16px"}>
                      <Text fontSize={"24px"} fontWeight={"500"}>
                        Get support anytime
                      </Text>
                      <Text>
                        If you need help, we're available 24/7 from anywhere in
                        the world.
                      </Text>
                    </Stack>
                    <Stack gap={"18px"}>
                      <HStack w={"100%"}>
                        <Box boxSize={"20px"}>
                          <GlobalIcon />
                        </Box>
                        <Text lineHeight={"20px"}>
                          Add details for expensing your trip
                        </Text>
                        <Spacer />
                        <Link href={"#"}>
                          <ArrowRight color="#221C35" />
                        </Link>
                      </HStack>
                      <Divider w={"100%"} />
                      <HStack w={"100%"}>
                        <Box boxSize={"20px"}>
                          <ReceiptIcon />
                        </Box>
                        <Text lineHeight={"20px"}>Get receipt</Text>
                        <Spacer />
                        <Link href={"#"}>
                          <ArrowRight color="#221C35" />
                        </Link>
                      </HStack>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
            <Show above="md">
              <Stack w={"50%"} gap={"24px"}>
                <Box
                  position="sticky"
                  top="0"
                  zIndex="1"
                  bg="white"
                  boxShadow="lg"
                >
                  {isMapLoaded && (
                    <GoogleMap
                      mapContainerStyle={{
                        width: "100%",
                        height: "80vh",
                      }}
                      center={{
                        lat: -3.745,
                        lng: -38.523,
                      }}
                      zoom={10}
                      onLoad={(map) => setMap(map)}
                      onUnmount={() => setMap(undefined)}
                    />
                  )}
                </Box>
              </Stack>
            </Show>
          </HStack>
          {/* Check in/out card */}
        </Stack>
      </WrappedContent>
    </MainLayout>
  );
}
