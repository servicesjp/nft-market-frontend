import { getAllCurrencyOptionsByEnv } from "@/constants/env";
import { __ } from "@/helpers/common";
import StarRatingRadio from "@/modules/market/start-rating-radio";
import { NftType } from "@/types/NftType";
import {  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, Hide, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Show, SimpleGrid, Stack, Text, VStack, useRadioGroup } from "@chakra-ui/react";
import { useState } from "react";



export interface NftFiltersProps {
  nftType: NftType;
  currencyType: string;
  setCurrencyType: (currencyType: string) => void;
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;
  setSearchQuery: (searchQuery: string) => void;
  searchQuery: string;
}

export default function NftFilters(props: NftFiltersProps) {

  const RenderTitle = () => {
    return (
      <Box
        p={"16px"}
        pt={"0"}
        borderBottom={"2px solid var(--Text-Light, #E6E6E6)"}
      >
        <Text
          as={"h3"}
          fontSize={"16px"}
          fontWeight={"500"}
          color={"primary.200"}
          lineHeight={"16px"}
        >
          {__(
            props.nftType === NftType.DIGITAL_ART
              ? "filter_digital_art"
              : "filter_experience"
          )}
        </Text>
      </Box>
    );
  }

  return (
    <Box w={"100%"} shadow={{ md: "sm" }} borderRadius={"8px"} py={"16px"}>
      <Show above="md">
        <Stack gap={"8px"}>
          <RenderTitle />
          <Accordion allowMultiple px={"16px"}>
            <AccordionItem>
              <TypeOfCurrencyFilter
                setCurrencyType={props.setCurrencyType}
                currencyTpe={props.currencyType}
              />
            </AccordionItem>
            {props.nftType === NftType.EXPERIENCE && (
              <AccordionItem>
                <ExperienceScoreFilter
                  setRatingFilter={props.setRatingFilter}
                  ratingFilter={props.ratingFilter}
                />
              </AccordionItem>
            )}
          </Accordion>
        </Stack>
      </Show>
      <Hide above="md">
        <TypeOfCurrencyFilter
          setCurrencyType={props.setCurrencyType}
          currencyTpe={props.currencyType}
        />
        {props.nftType === NftType.EXPERIENCE && (
          <ExperienceScoreFilter
            setRatingFilter={props.setRatingFilter}
            ratingFilter={props.ratingFilter}
          />
        )}
      </Hide>
    </Box>
  );
}



function TypeOfCurrencyFilter({
  setCurrencyType,
  currencyTpe
}: {
  setCurrencyType: (currencyType: string) => void;
  currencyTpe: string;
}) {
  const getAllCurrencyOptions = (): any[] => {
    return [
      { label: __("all"), value: "all" },
      ...getAllCurrencyOptionsByEnv(),
    ];
  };

  function Title() {
    return (
      <Text
        fontSize={"16px"}
        fontWeight={"500"}
        color={"primary.200"}
        flex="1"
        py={"14px"}
        textAlign="left"
      >
        Type of currency
      </Text>
    );
  }

  function CurrencySelect() {
    return (
      <Select
        value={currencyTpe}
        iconColor="#0047BB"
        iconSize="24px"
        onChange={(event: any) => {
          setCurrencyType(event.target.value)
        }}
      >
        {getAllCurrencyOptions().map((option) => (
          <option key={"currency-" + option.value} value={option.value}>{option.label}</option>
        ))}
      </Select>
    );
  }

  return (
    <>
      <Show above="md">
        <AccordionButton w={"100%"}>
          <Title />
          <AccordionIcon color={"#0047BB"} boxSize={"24px"} />
        </AccordionButton>
        <AccordionPanel w={"100%"} p={"8px"}>
          <CurrencySelect />
        </AccordionPanel>
      </Show>
      <Hide above="md">
        <VStack gap={"16px"} p={"14px 24px"} align={"flex-start"} w={"100%"}>
          <Title />
          <CurrencySelect />
        </VStack>
      </Hide>
    </>
  );
}

function ExperienceScoreFilter({
  setRatingFilter,
  ratingFilter
}: {
  setRatingFilter: (rating: number) => void;
  ratingFilter: number;
}) {
  const { getRadioProps, value: selectedScore, setValue  } = useRadioGroup({
    name: "score",
    defaultValue: ratingFilter === 0 ? "" : ratingFilter.toString(),
    onChange: (value: string) => setRatingFilter(5 - Number(value)),
  });

  function Title() {
    return (
      <Text
        fontSize={"16px"}
        fontWeight={"500"}
        color={"primary.200"}
        flex="1"
        py={"14px"}
        textAlign="left"
      >
        Experience score
      </Text>
    );
  }

  function Scores() {
    return (
      <SimpleGrid columns={{ base: 2, sm: 3, md: 1 }} spacing={10} w={"100%"}>
        {[5, 4, 3, 2, 1].map((value, i: number) => {
          const radio = getRadioProps({ value: i.toString() });
          return (
            <StarRatingRadio key={"q-" + i} radio={radio} onClick={() => {
              if (selectedScore === (i).toString()) {
                setValue("");
                setRatingFilter(0);
              }
            }}>
              {value.toFixed(1)}
            </StarRatingRadio>
          );
        })}
      </SimpleGrid>
    );
  }

  return (
    <>
      <Show above="md">
        <AccordionButton w={"100%"}>
          <Title />
          <AccordionIcon color={"#0047BB"} boxSize={"24px"} />
        </AccordionButton>
        <AccordionPanel w={"100%"} p={"0"}>
          <Box p={"8px"}>
            <Scores />
          </Box>
        </AccordionPanel>
      </Show>
      <Hide above="md">
        <VStack gap={"16px"} p={"14px 24px"} align={"flex-start"} w={"100%"}>
          <Title />
          <Scores />
        </VStack>
      </Hide>
    </>
  );
}


function PriceRangeFilter(){
  
  const [minPrice, setMinPrice] = useState<number>(400);
  const [maxPrice, setMaxPrice] = useState<number>(600);
return (
  <VStack gap={"16px"} p={"14px 24px"} align={"flex-start"}>
    <Text fontSize={"20px"} fontWeight={"500"}>
      Price Range
    </Text>
    <RangeSlider
      defaultValue={[minPrice, maxPrice]}
      min={0}
      max={1000}
      step={10}
      onChange={(val) => {
        setMinPrice(val[0]);
        setMaxPrice(val[1]);
      }}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb
        boxSize={8}
        index={0}
        border={"1px solid"}
        borderColor={"primary.100"}
      >
        <Box boxSize={"12px"} bg={"primary.100"} borderRadius={"full"} />
      </RangeSliderThumb>
      <RangeSliderThumb
        boxSize={8}
        index={1}
        border={"1px solid"}
        borderColor={"primary.100"}
      >
        <Box boxSize={"12px"} bg={"primary.100"} borderRadius={"full"} />
      </RangeSliderThumb>
    </RangeSlider>
    <HStack justify={"space-between"} w={"100%"}>
      <VStack
        border={"1px solid #e6e6e6"}
        borderRadius={"8px"}
        p={"12px 16px"}
        w={"140px"}
        align={"flex-start"}
        gap={"4px"}
      >
        <Text fontWeight={"500"}>Min.</Text>
        <Text>${minPrice}</Text>
      </VStack>
      <Box w="16px" border={"1px solid #e6e6e6"} borderRadius={"8px"} />
      <VStack
        border={"1px solid #e6e6e6"}
        borderRadius={"8px"}
        p={"12px 16px"}
        w={"140px"}
        align={"flex-start"}
        gap={"4px"}
      >
        <Text fontWeight={"500"}>Max.</Text>
        <Text>${maxPrice}</Text>
      </VStack>
    </HStack>
  </VStack>
);
}