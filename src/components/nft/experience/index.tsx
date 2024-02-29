import { GMapsPoint } from "@/types/GMapsPoint";
import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Stack,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  chakra,
  HStack,
  Button,
} from "@chakra-ui/react";
import {
  GoogleMap,
  Libraries,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { __ } from "@/helpers/common";
import ImagesExperience from "@/components/nft/experience/components/images-experience";
import { ReviewSection } from "./review-section";
import { ListEvents } from "./components/list-events";
import { StarIcon } from "@chakra-ui/icons";
import { useGetProducts } from "@/hooks/api/use-get-products";
import { NftType } from "@/types/NftType";
import { ExperienceList } from "@/modules/account/experience-list";
import { IncludedServices } from "./components/included-services";
import { InfoSection } from "./components/info-section";
import { ExperienceOwner } from "./components/experience-owner";
//Array of libraries to load must be added here outside the component
const googleMapsLibraries: Libraries = ["places"];
export default function ExperienceItemDetailNFT({
  product,
}: any) {
  const [mapPoints, setMapPoints] = useState<GMapsPoint[]>([]);
  const [serviceInclude, setServiceInclude] = useState<any[]>([]);
  const { data: experienceList, isLoading: isLoadingExperiences } =
    useGetProducts({ nftType: NftType.EXPERIENCE });
  // maps variable
  const { isLoaded } = useJsApiLoader({
    //ID can be change to load dark mode map when theme is dark
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: googleMapsLibraries,
  });
  const [mapRef, setMap] = useState<google.maps.Map>();
  function initialData() {
    try {
      const parseGMapsPoint = JSON.parse(product?.experience?.mapPoints ?? '[]') as GMapsPoint[];
      setMapPoints(parseGMapsPoint);
      const serviceInclude = product?.experience?.serviceInclude;
      setServiceInclude(serviceInclude ? serviceInclude.split(",") : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    initialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const expect = () => {
    return (
      <Box>
        <Text fontSize="20px" fontWeight="medium">
          {__("what_to_expect")}
        </Text>

        <Stepper
          index={mapPoints.length}
          orientation="vertical"
          colorScheme="teal"
          minH={"108px"}
          w="100%"
          gap="0px"
          mt="24px"
        >
          {mapPoints.map((point: GMapsPoint, index: number) => (
            <Step key={index} style={{ minHeight: "70px" }}>
              <StepIndicator>
                <StepStatus
                  complete={<StepNumber />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box w="100%">
                <StepTitle>{point.addressName}</StepTitle>
                <StepDescription>{point.addressDescription}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  };

  const mapSection = () => {
    //map options
    const options = {
      disableDefaultUI: true,
      clickableIcons: false,
    };
    //Starting point
    const defaultPoint = { lat: -3.745, lng: -38.523 };

    const addMarker = (pos: any) => {
      let newMarker = new google.maps.Marker({
        position: pos,
        map: mapRef,
      });
    };

    const updateBounds = (addressList: GMapsPoint[]) => {
      if (!mapRef) {
        return;
      }
      if (addressList.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      addressList.forEach((address) => {
        bounds.extend(address.addressPos);
      });

      mapRef.fitBounds(bounds);
    };

    return (
      <Box w="100%" mt="40px" id="map-section">
        <Text fontSize="20px" fontWeight="medium">
          {__("where_will_they_be")}
        </Text>
        <Text color="#999">Use this map to locate the meeting place</Text>
        <Divider marginTop="10px" />
        <AspectRatio ratio={16 / 7} borderRadius="5px" mt="32px">
          {isLoaded ? (
            <Box>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={
                  mapPoints.length > 0 ? mapPoints[0].addressPos : defaultPoint
                }
                zoom={17}
                // onLoad={(map: any) => {
                //   setMap(map);
                //   console.log("mapPoints", mapPoints);

                //   if (mapPoints.length > 0) {
                //     mapPoints.forEach((address: GMapsPoint) => {
                //       addMarker(address.addressPos);
                //     });
                //     updateBounds(mapPoints);
                //   }
                // }}
                options={options}
                onUnmount={() => setMap(undefined)}
              >
                {mapPoints.map((point: GMapsPoint, index: number) => {
                  return (
                    <Marker
                      position={point.addressPos}
                      key={`marker-${point.addressPos.lat}-${point.addressPos.lng}`}
                    ></Marker>
                  );
                })}
              </GoogleMap>
            </Box>
          ) : (
            <></>
          )}
        </AspectRatio>
        <Button width="50%" mx="auto" variant="outline" mt="10px">
          See route on Google Maps
        </Button>
      </Box>
    );
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      justifyContent={"center"}
      w={"100%"}
      h={"100%"}
    >
      <ImagesExperience mediaAssets={product?.mediaAssets} />
      <Flex
        width={"100%"}
        gap="40px"
        mt="40px"
        flexDirection={{ base: "column", xl: "row" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          justifyContent={"center"}
          w={"100%"}
          h={"100%"}
        >
          <Text fontSize="28px" as="b" mb="16px">
            {product?.name}
          </Text>
          <Text fontSize="20px" fontWeight="500">
            In{" "}
            <chakra.span color="primary.100" textDecoration="underline">
              {mapPoints ? mapPoints?.[0]?.addressName : ""}
            </chakra.span>
          </Text>
          <HStack my="20px">
            <StarIcon color="#00cfb4" boxSize={5} cursor="pointer" />
            <StarIcon color="#00cfb4" boxSize={5} cursor="pointer" />
            <StarIcon color="#00cfb4" boxSize={5} cursor="pointer" />
            <StarIcon color="#E9E9E9" boxSize={5} cursor="pointer" />
            <Text fontSize="16px" fontWeight="500">
              4.0
            </Text>
          </HStack>
          <Stack rowGap="24px" w={"100%"}>
            <Text fontSize="20px" fontWeight="500">
              Experience created by
            </Text>
            <Divider></Divider>
            <ExperienceOwner owner={product?.owner} />
            <Text fontSize="20px" fontWeight="medium">
              {__("what_is_included")}
            </Text>
            <Divider></Divider>
            <IncludedServices serviceInclude={serviceInclude} />

            <InfoSection description={product?.description} />

            {mapSection()}

            {expect()}

            <Stack
              py={"14px"}
              borderBottom={"1px solid #E6E6E6"}
            >
              <Text fontSize="20px" fontWeight="500">
                Here are some review
              </Text>
              <Text fontSize="16px" fontWeight="400" color={"gray.500"}>
                Explore opinions from other users
              </Text>
            </Stack>
            <ReviewSection product={product} />
          </Stack>
        </Box>
        <Box>
          <ListEvents product={product}/>
        </Box>
      </Flex>

      <Text fontSize="20px" fontWeight="500" mt="20px">
        Similar Experiences
      </Text>
      <Text color="#999">We choose these experiences for you</Text>
      <Divider my="20px" orientation="horizontal" />
      {experienceList && <ExperienceList />}
    </Box>
  );
}
