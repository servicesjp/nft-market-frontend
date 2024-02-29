import { Card, CardBody, Text, Flex, Box, InputGroup, Stack, Center, Spinner, } from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import CreateTourModal from "./create-tour-modal";
import { __ } from "@/helpers/common";
import moment from "moment";
import { ExperienceInstance } from "./experience-instance";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/modules/provider/user-info-provider";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { useExperienceApi } from "@/hooks/useApi";
import { ExpInstancesParamsDTO } from "@/hooks/types/experience-instance/ExpInstancesParamsDTO";

interface IListEvents {
  product: any,
}

export const ListEvents = ({
  product, 
}: IListEvents) => {
  const { nftUser, loggedIn } = useContext(UserContext);
  const { address } = useContext(WalletConnectContext)
  
  const [expInstances, setExpInstances] = useState<any[]>([]);
  const { getExpInstancesByExpId } = useExperienceApi();
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date("06-01-2023"),
  ]);

  // pagination
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3);
  const [page, setPage] = useState<number>(1);
  const [reachedLimited, setReachedLimited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function getMinPriceEvent() {
    const minPriceEvent = expInstances.reduce((prev, curr) => {
      return parseFloat(prev?.pricePerPerson) <
        parseFloat(curr?.pricePerPerson)
        ? prev
        : curr;
    });

    return minPriceEvent;
  }

  const isValidDate = (date: any) => {
    return moment(date, moment.ISO_8601, true).isValid();
  };

  const handleDateChange = (dates: any) => {
    if (dates && dates.every(isValidDate)) {
      setSelectedDates(dates);
    } else {
      console.error("Invalid date format:", dates);
      // Handle the error, e.g., show a notification to the user or set a default value
    }
  };

  async function fetchExpInstances() {
    const initPage = 1;
    const initOffset = 0;
    setReachedLimited(false);
    setIsLoading(true);
    try {
      const params: ExpInstancesParamsDTO = {
        limit,
        offset: initOffset,
        ...(
          selectedDates?.[0] && {
            startTime: selectedDates?.[0].getTime() / 1000
          }
        ),
        ...(
          selectedDates?.[1] && {
            endTime: selectedDates?.[1].getTime() / 1000
          }
        ),
        ...(loggedIn && { userAddress: address })
      };
      const res = await getExpInstancesByExpId(product?.experience?.id, params);
      if (res?.data) {
        setExpInstances(res?.data?.items);

        const newPage = initPage + 1;
        setPage(newPage);
        setOffset((newPage - 1) * limit);

        if (res.data.items.length === 0 || res.data.count <= (res.data.limit + res.data.offset)) {
          setReachedLimited(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  async function addedExpInstances() {
    const newPage = page + 1;
    setPage(newPage);
    setOffset((newPage - 1) * limit);

    setIsLoading(true)
    try {
      const params = {
        limit,
        offset,
        ...(
          selectedDates?.[0] && {
            startTime: selectedDates?.[0].getTime() / 1000
          }
        ),
        ...(
          selectedDates?.[1] && {
            endTime: selectedDates?.[1].getTime() / 1000
          }
        ),
        ...(loggedIn && { userAddress: address })
      };
      const res = await getExpInstancesByExpId(product?.experience?.id, params);
      if (res?.data) {
        setExpInstances((arr) => arr.concat(res?.data?.items));

        if (res.data.items.length === 0 || res.data.count <= (res.data.limit + res.data.offset)) {
          setReachedLimited(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExpInstances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  // main return
  return (
    <Card
      w={{ base: "100%", xl: "480px" }}
      id="list-events"
    >
      <CardBody
        padding={{ base: "16px", xl: "32px" }}
      >
        {(loggedIn && product?.creator?.id == nftUser?.id) && (
          <CreateTourModal
            product={product}
            fetchData={fetchExpInstances}
          ></CreateTourModal>
        ) }
        
        {/* {expInstances.length > 0 ? (
          <Text fontSize="16px" color="gray.400">
            {__("from")}{" "}
            <Text
              display="inline"
              fontSize="20px"
              fontWeight="medium"
              as="span"
            >
              {`${formatPrice(
                getMinPriceEvent()?.pricePerPerson,
                product?.currencyAddress, product?.currencyDecimals
              )} ${product?.symbolCurrency}`}
            </Text>{" "}
            {__("per_person")}
          </Text>
        ) : (
          ""
        )} */}

        <Flex mt="24px">
          <Box
            flex="1"
            bg="#F5F7FF"
            py="12px"
            border="1px solid #E1E7FF"
            borderRadius="4px 0 0 4px"
          >
            <Text
              m="0 12px"
              textTransform={"uppercase"}
              color="gray.400"
              fontWeight="medium"
            >
              {__("dates")}
            </Text>
            {/* Filtro de Fecha */}
            <Box>
              <InputGroup zIndex="3" bg="white" borderRadius="16px">
                <RangeDatepicker
                  propsConfigs={{
                    dateNavBtnProps: {
                      colorScheme: "blue",
                      variant: "outline",
                    },
                    dayOfMonthBtnProps: {
                      defaultBtnProps: {
                        borderColor: "#0026E6",
                        _hover: {
                          background: "#0026E6",
                          color: "white",
                        },
                      },
                      isInRangeBtnProps: {
                        background: "#8a99e4",
                        color: "white",
                      },
                      selectedBtnProps: {
                        background: "#0026E6",
                        color: "white",
                      },
                    },
                    popoverCompProps: {
                      popoverContentProps: {
                        background: "white",
                      },
                    },
                  }}
                  id="date"
                  name="date"
                  selectedDates={selectedDates.every(isValidDate) ? selectedDates : []} // If any date is invalid, pass an empty array
                  onDateChange={handleDateChange}
                />
              </InputGroup>
            </Box>
          </Box>
        </Flex>

        {expInstances.length > 0 ? (
          <Stack gap="24px" mt="24px">
            <Box
              maxH="50vh"
              overflowY="auto"
              w={'100%'}
            >
              {expInstances.map((experienceInstance, i) => (
                <ExperienceInstance key={i} i={i} product={product} experienceInstance={experienceInstance} expInstances={expInstances} fetchExpInstances={fetchExpInstances} />

              ))}

            </Box>
            {reachedLimited ? (
              <></>
            ) : isLoading ? (
              <Center w={"100%"}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="primary.100"
                  size="xl"
                />
              </Center>
            ) : (
              <Text
                textAlign="center"
                fontSize="14px"
                fontWeight="medium"
                as="ins"
                onClick={async () => {
                  await addedExpInstances()
                }}
                cursor={'pointer'}
              >
                <a >{__('more')}</a>
              </Text>
            )}
          </Stack>
        ) : (
          <>
            <Text fontSize="16px" color="gray.400">
              {__("no_registered_events_yet")}
            </Text>
          </>
        )}

      </CardBody>
    </Card>
  );
};