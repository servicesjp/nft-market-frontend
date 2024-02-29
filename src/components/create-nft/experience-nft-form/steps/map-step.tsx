import { motion } from "framer-motion";
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { GoogleMap, Libraries, useJsApiLoader } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import {
  AspectRatio,
  Box,
  FormControl,
  FormErrorMessage,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import "@reach/combobox/styles.css";
import { Field } from "formik";
import { GMapsPoint } from "@/types/GMapsPoint";
import { getCurrentLocale } from "@/modules/locale/locale";
import { __ } from "@/helpers/common";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
const googleMapsLibraries: Libraries = ["places"];

export default function MapStep({ previous, formField }: any) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: googleMapsLibraries,
  });
  const mapPointsName = formField.mapPoints.name;
  const [mapRef, setMap] = useState<google.maps.Map>();
  const [markerList, setMarkerList] = useState<google.maps.Marker[]>([]);

  //Starting point
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -3.745, lng: -38.523 }),
    []
  );

  //map options
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const getIconSrc = (index: number = 0, listLength: number = 0) => {
    //return a custom icon if its the first item in a list or the last one, for the rest in between retorn another icon
    return index === 0 || index === listLength - 1
      ? "/images/icons/location-icon.svg"
      : "/images/icons/circle-icon.svg";
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

  const addMarker = (pos: any) => {
    let newMarker = new google.maps.Marker({
      position: pos,
      map: mapRef,
    });
    setMarkerList((prevMarkers) => [...prevMarkers, newMarker]);
  };

  const deleteMarker = (pos: LatLngLiteral) => {
    const markerToRemove = markerList.find(
      (marker) =>
        marker.getPosition()?.lat() === pos.lat &&
        marker.getPosition()?.lng() === pos.lng
    );

    if (markerToRemove) {
      markerToRemove.setMap(null);
      setMarkerList((prevMarkers) =>
        prevMarkers.filter((marker) => marker !== markerToRemove)
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: previous ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Field name={mapPointsName}>
        {({ field, form }: any) => {
          let addressList: GMapsPoint[] = field.value;
          return (
            <>
              <Text
                fontWeight="500"
                mt="20px"
                fontSize="20px"
                alignSelf="start"
              >
                {__("where_will_the_experience_be_located")}
              </Text>
              <AspectRatio ratio={16 / 9} borderRadius="5px" mt="32px">
                {isLoaded ? (
                  <Box>
                    <Box zIndex="1" position="absolute" w={"80%"} top="25px">
                      <Places
                        setAddress={(value: any) => {
                          form.setFieldValue(mapPointsName, [
                            ...addressList,
                            value,
                          ]);
                          if (mapRef) {
                            addMarker(value.addressPos);
                            updateBounds([...addressList, value]);
                          }
                        }}
                      />
                    </Box>
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      center={
                        addressList.length > 0
                          ? addressList[0].addressPos
                          : center
                      }
                      zoom={17}
                      onLoad={(map: any) => {
                        setMap(map);

                        //Loads markers if positions have been set already
                        if (addressList.length > 0) {
                          addressList.forEach((address: GMapsPoint) => {
                            addMarker(address.addressPos);
                          });
                          updateBounds(addressList);
                        }
                      }}
                      options={options}
                      onUnmount={() => setMap(undefined)}
                    ></GoogleMap>
                  </Box>
                ) : (
                  //  { TODO: add a spinner here even thought it takes almost no time to load}
                  <></>
                )}
              </AspectRatio>
              <Text fontWeight="500" mt="24px" fontSize="16px">
                {__("selected_locations")}
              </Text>
              <List>
                {addressList.length > 0 ? (
                  addressList.map((address: GMapsPoint, index: number) => (
                    <ListItem key={index} position={"relative"}>
                      <VStack spacing={"14px"}>
                        <HStack w={"100%"}>
                          <Image
                            mx="12px"
                            src={getIconSrc(index, addressList.length)}
                            alt="Location Icon"
                            mt={"12px"}
                            w="24px"
                            height="24px"
                            pointerEvents="none"
                          />
                          <InputGroup mt="16px">
                            <Input
                              borderRadius="4px"
                              value={field.value[index].addressName}
                              w="100%"
                              py={"16px"}
                              pr={"80px"}
                              cursor={"pointer"}
                              fontSize={"16px"}
                              fontWeight={"300"}
                              isReadOnly={true}
                              color={"#231C35"}
                              minHeight={"60px"}
                            />
                            <InputRightElement
                              width="auto"
                              height="100%"
                              justifyContent={"end"}
                            >
                              {/* <Image
                              height={"100%"}
                              src="/images/icons/edit-icon.svg"
                              alt="Edit Arrow"
                              width="24px"
                              marginX="12px"
                            /> */}
                              <Image
                                height={"100%"}
                                src="/images/icons/delete-icon.svg"
                                alt="Delete icon"
                                cursor={"pointer"}
                                width="24px"
                                onClick={() => {
                                  const updatedList = addressList.filter(
                                    (item: any) => item !== address
                                  );
                                  form.setFieldValue(
                                    mapPointsName,
                                    updatedList
                                  );
                                  // Remove the marker from the map
                                  deleteMarker(address.addressPos);
                                  updateBounds(updatedList);
                                }}
                                me="16px"
                              />
                            </InputRightElement>
                          </InputGroup>
                          {index < addressList.length - 1 && (
                            <Box
                              position={"absolute"}
                              width={"1px"}
                              height={"calc(100% - 22px)"}
                              bgColor={"transparent"}
                              border={"1px dashed #0047BB"}
                              top={"55px"}
                              left={"23px"}
                            />
                          )}
                        </HStack>
                        <Box w={"100%"} mx="12px" ps={"56px"}>
                          <Textarea
                            onChange={(e) => {
                              const updatedList = addressList.map(
                                (item: GMapsPoint) => {
                                  if (item === address) {
                                    return {
                                      ...item,
                                      addressDescription: e.target.value,
                                    };
                                  }
                                  return item;
                                }
                              );
                              form.setFieldValue(mapPointsName, updatedList);
                            }}
                            placeholder={__("add_description_about_location")}
                            fontSize={"16px"}
                            defaultValue={address.addressDescription}
                            fontWeight={"300"}
                            color={"#231C35"}
                          />
                        </Box>
                      </VStack>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <HStack>
                      <Image
                        justifySelf={"center"}
                        mx="12"
                        marginTop="10px"
                        src={getIconSrc()}
                        alt="Location Icon"
                        pointerEvents="none"
                      />
                      <Input
                        key={"placeHolder"}
                        mt="16"
                        defaultValue={__("add_location_using_map")}
                        borderRadius="4px"
                        isReadOnly={true}
                        cursor={"pointer"}
                        height={"auto"}
                        py={"16px"}
                        pr={"80px"}
                        fontSize={"16px"}
                        fontWeight={"300"}
                        color={"#231C35"}
                        minHeight={"60px"}
                        border="1.5px solid #DDE3EE"
                      />
                    </HStack>
                  </ListItem>
                )}
              </List>
              <Box w="100%" mt="10px">
                <FormControl
                  isInvalid={form.errors.mapPoints && form.touched.mapPoints}
                >
                  <FormErrorMessage>{form.errors.mapPoints}</FormErrorMessage>
                </FormControl>
              </Box>
            </>
          );
        }}
      </Field>
    </motion.div>
  );
}

type PlacesProps = {
  setAddress: (address: GMapsPoint) => void;
};

function Places({ setAddress }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    const placeDetails = await getDetails({
      placeId: results[0].place_id,
      fields: ["formatted_address"],
      language: getCurrentLocale(),
    });
    let addressDescription = "";
    if (typeof placeDetails === "object" && placeDetails.formatted_address) {
      addressDescription = placeDetails.formatted_address;
    }
    // console.log("HERE", addressDescription);
    setAddress({
      addressPos: { lat, lng },
      addressName: val,
      addressDescription: addressDescription,
    });
  };

  return (
    <Combobox style={{ width: "100%" }} onSelect={handleSelect}>
      <Image
        src="/images/icons/location-icon.svg"
        alt="Location Icon"
        width="24px"
        position={"absolute"}
        top={"14px"}
        left={"16px"}
        pointerEvents="none"
      />
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        style={{
          width: "100%",
          paddingLeft: "48px",
          paddingTop: "14px",
          paddingBottom: "14px",
          paddingRight: "16px",
          fontSize: "16px",
          fontWeight: "300",
          color: "#231C35",
        }}
        placeholder={__("enter_your_address")}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "300",
                  color: "#231C35",
                }}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
