import useResponsive from "@/hooks/useResponsive";
import { MainLayout } from "@/layouts/main-layout";
import HeaderContent from "@/modules/layout/header-content";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Hide,
  Image,
  Input, Stack,
  Text,
  Textarea,
  VStack,
  useRadio,
  useRadioGroup
} from "@chakra-ui/react";
import WrappedContent from "@/layouts/wrapped-content";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/modules/provider/user-info-provider";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { useUserApi } from "@/hooks/useApi";
import { useRouter } from "next/router";
import { AvatarEdit } from "@/modules/account/avatar-edit";
import { __ } from "@/helpers/common";
import MetamaskRequired from "@/components/required/metamask-required";
import MerchantApproveRequired from "@/components/merchant-approved-required";
import LoginRequired from "@/components/required/login-required";
import { TranslationInit } from "@/helpers/language";
import { ChakraStylesConfig, Select } from "chakra-react-select";
interface ProfileFormValues {
  avatarFile: any;
  username: string;
  email: string;
  bio: string;
  wallet_address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  address_1: string;
  address_2: string;
  language: string;
}

interface SectionIdMap {
  [sectionName: string]: string;
}

export default function Edit() {
  const { nftUser } = useContext(UserContext);
  const { isMobile } = useResponsive();
  const { updateUser } = useUserApi();
  const [update, setUpdate] = useState<boolean>(false);
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<ProfileFormValues>();
  const menuItems = [
    __("main_information"),
    __("about_me"),
    __("contact_information"),
  ];
  const sectionIdMap: SectionIdMap = {
    [__("main_information")]: "main-information",
    [__("about_me")]: "about-me",
    [__("contact_information")]: "contact-information",
  };
  const [activeSection, setActiveSection] = useState(menuItems[0]);

  const [languageOptions, setLanguageOptions] = useState<any[]>([])

  const mainInformationFormFiled = [
    {
      name: "username",
      initialValues: "",
      label: __("username"),
      placeholder: __("username"),
    },
    {
      name: "email",
      initialValues: "",
      label: __("email_address"),
      placeholder: "example@gmail.com",
    },

    {
      name: "wallet_address",
      initialValues: "",
      disable: "true",
      placeHolder: __("wallet_address"),
      label: __("wallet_address"),
    },
  ];

  const contactInfoFormField = [
    {
      name: "phoneNumber",
      initialValues: "",
      type: "number",
      label: __("phone_number"),
      placeholder: __("phone_number"),
    },
    {
      name: "country",
      initialValues: "",
      placeholder: __("enter_country"),
      label: __("country"),
    },
    {
      name: "state",
      initialValues: "",
      placeholder: __("enter_state"),
      label: __("state_prefecture"),
    },
    {
      name: "city",
      initialValues: "",
      placeholder: __("enter_city"),
      label: __("city_town"),
    },

    {
      name: "address_1",
      initialValues: "",
      placeholder: __("enter_address_line_one"),
      label: __("address_line_one"),
    },
    {
      name: "address_2",
      initialValues: "",
      placeholder: __("enter_address_line_two"),
      label: __("address_line_two"),
    },
  ];

  const aboutMeFormFiled = [
    {
      name: "firstName",
      initialValues: "",
      label: __("first_name"),
      placeholder: __("first_name"),
    },
    {
      name: "lastName",
      initialValues: "",
      label: __("last_name"),
      placeholder: __("last_name"),
    },
    {
      name: "language",
      initialValues: "",
      type: 'select',
      label: __("language"),
      placeholder: __("language"),
    },
    {
      name: "bio",
      initialValues: "",
      title: "",
      type: "textarea",
      label: __("biography"),
      placeholder: __("write_your_biography"),
    },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "menu",
    defaultValue: menuItems[0],
    onChange: (value) => handleSectionClick(value),
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    
    try {
      setUpdate(true);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("bio", values.bio);
      formData.append('language', values.language)
      formData.append("phoneNumber", values.phoneNumber.toString());
      formData.append("country", values.country);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("addressOne", values.address_1);
      formData.append("addressTwo", values.address_2);
      formData.append("file", values.avatarFile);

      const result: boolean = await updateUser(formData);
      if (result) {
        router.push("/account");
      }
    } catch (error) {
    } finally {
      setUpdate(false);
    }
  };

  const getLanguages = async () => {
    let languages = await TranslationInit.getLanguages()
    languages = languages.map((lang: any) => {
      return {
        label: lang?.Name,
        value: lang?.Code
      }
    })
    
    setLanguageOptions(languages)
  }

  useEffect(() => {
    getLanguages()
  }, []);

  useEffect(() => {
    if (nftUser?.id) {
      setInitialValues({
        username: nftUser?.username,
        email: nftUser?.email,
        bio: nftUser?.bio,
        wallet_address: nftUser?.publicAddress,
        phoneNumber: nftUser?.phoneNumber,
        country: nftUser?.country,
        state: nftUser?.state,
        city: nftUser?.city,
        address_1: nftUser?.addressOne,
        address_2: nftUser?.addressTwo,
        firstName: nftUser?.firstName,
        lastName: nftUser?.lastName,
        language: nftUser?.language,
        avatarFile: null,
      });
      
    }
  }, [nftUser]);

  const chakraStyles: ChakraStylesConfig = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "blue.100" : "primary.100",
      color: "primary.100",
      backgroundColor: "white",
      p: 0,
      w: "40px",
    }),
    downChevron: (provided, state) => ({
      color: "#999FBB",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isFocused || state.isSelected
          ? "rgba(214, 221, 255, 0.3)"
          : "white",
      color: state.isFocused || state.isSelected ? "primary.100" : "#999FBB",
    }),
  };

  const handleSectionClick = (sectionName: any) => {
    const sectionId = sectionIdMap[sectionName];
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const yOffset = -112;
      const y =
        sectionElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const LeftMenuItem = (props: any) => {
    const { getInputProps, getRadioProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getRadioProps();
    return (
      <Box
        minW={"252px"}
        as="label"
        w={"100%"}
        cursor="pointer"
        bg={"white"}
        borderWidth="1px"
        boxShadow="md"
      >
        <input {...input} />

        <Box
          display={"flex"}
          position={"relative"}
          {...checkbox}
          _checked={{
            textColor: "primary.100",
            fontWeight: "500",
          }}
          padding={"22px 40px"}
          fontWeight={"400"}
          textColor={"#231C35"}
          fontSize={"16px"}
        >
          <Box
            borderRadius={"0 10px   10px 0"}
            hidden={!input.checked}
            alignSelf={"center"}
            position={"absolute"}
            bg={"primary.100"}
            w={"4px"}
            h={"48px"}
            left={"-1px"}
          />
          {props.children}
        </Box>
      </Box>
    );
  };

  const MainInformation = (formik: FormikProps<ProfileFormValues>) => {
    const handleChangeAvatar = (imgFile: any) => {
      formik.setFieldValue("avatarFile", imgFile);
    };
    return (
      <LoginRequired>
      <MetamaskRequired>
      
      <Card shadow={"md"} id={"main-information"}>
        <CardBody>
          <VStack spacing={20} alignItems={"start"} py={"4px"} px="14px">
            <Text fontSize={"20px"} fontWeight={"500"} lineHeight={"124%"}>
              {__("main_information")}
            </Text>
            <Stack
              mt="20px"
              direction={{ base: "column", md: "row" }}
              spacing={20}
              justify={"space-evenly"}
              alignItems={{ base: "center", md: "flex-start" }}
              w={"100%"}
            >
              <VStack px={"44px"} mb={"12px"}>
                <Box
                  borderRadius={"50%"}
                  overflow={"hidden"}
                  background="linear-gradient(to right, #3fb0a3, #164793)"
                  padding="4px"
                >
                  <AvatarEdit
                    nftUser={nftUser}
                    onChange={handleChangeAvatar}
                  ></AvatarEdit>
                </Box>
              </VStack>
              <Box
                hidden={isMobile ? true : false}
                w={"4px"}
                bgColor={"#F2F5F8"}
                height={"300px"}
                margin={"0px"}
              />
              <Flex
                ms={"20px"}
                direction={"column"}
                w={"100%"}
                alignSelf={"end"}
                justifySelf={"end"}
              >
                {mainInformationFormFiled.map((value: any, index: number) => {
                  return (
                    <Field name={value.name} key={index}>
                      {({ field, form }: any) => (
                        <FormControl>
                          <FormLabel
                            fontSize={"18px"}
                            fontWeight={"500"}
                            htmlFor={field.name}
                          >
                            {value.label}
                          </FormLabel>
                          <Input
                            {...field}
                            type="text"
                            disabled={true}
                            mb={"24px"}
                            h={"48px"}
                            id={value.name}
                            borderWidth={"2px"}
                            borderRadius={"4px"}
                            borderColor={"#DDE3EE"}
                            placeholder={value.placeholder}
                          />
                        </FormControl>
                      )}
                    </Field>
                  );
                })}
              </Flex>
            </Stack>
          </VStack>
        </CardBody>
      </Card>
      </MetamaskRequired>
      </LoginRequired>
    );
  };

  const AboutMeSection = () => (
    <Card shadow={"md"} id={"about-me"}>
      <CardBody>
        <VStack spacing={20} alignItems={"start"} py={"4px"} px="14px">
          <Text fontSize={"20px"} fontWeight={"500"} lineHeight={"124%"}>
            {__("about_me")}
          </Text>
          <Stack
            mt="20px"
            direction={{ base: "column", md: "row" }}
            spacing={20}
            justify={"space-evenly"}
            alignItems={{ base: "center", md: "flex-start" }}
            w={"100%"}
          >
            <Flex
              direction={"column"}
              w={"100%"}
              alignSelf={"end"}
              justifySelf={"end"}
            >
              {aboutMeFormFiled.map((value: any, index: number) => (
                <Field name={value.name} key={index}>
                  {({ field, form }: FieldProps) => {
                    return (
                      <FormControl>
                        <FormLabel
                          fontSize={"16px"}
                          fontWeight={"600"}
                          htmlFor={value.name}
                        >
                          {value.label}
                        </FormLabel>
                        {value.type === "textarea" ? (
                          <Textarea
                            {...field}
                            borderColor={"#DDE3EE"}
                            borderWidth={"2px"}
                            borderRadius={"4px"}
                            mb={"24px"}
                            h={"48px"}
                            placeholder={value.placeholder}
                          />
                        ) 
                        : value.type === 'select' ? 
                          (
                            <Select
                              name={value.name}
                              chakraStyles={chakraStyles}
                              placeholder={value.placeholder}
                              variant="outline"
                              useBasicStyles
                              options={languageOptions}
                              value={
                                languageOptions
                                  ? languageOptions.find((option : any) => option.value === field.value)
                                  : ''
                              }
                              onChange={async (option : any) => form.setFieldValue(value?.name, option?.value)}
                            />
                          )
                          :
                          (
                            <Input
                              {...field}
                              borderWidth={"2px"}
                              borderColor={"#DDE3EE"}
                              borderRadius={"4px"}
                              disabled={value.disable ? true : false}
                              mb={"24px"}
                              type={value.type ? value.type : "text"}
                              h={"48px"}
                              id={value.name}
                              placeholder={value.placeholder}
                            />
                          )
                        }
                      </FormControl>
                    );
                  }}
                </Field>
              ))}
            </Flex>
          </Stack>
        </VStack>
      </CardBody>
    </Card>
  );

  const ContactInformationSection = () => (
    <Card shadow={"md"} id={"contact-information"}>
      <CardBody>
        <VStack spacing={20} alignItems={"start"} py={"4px"} px="14px">
          <Text fontSize={"20px"} fontWeight={"500"} lineHeight={"124%"}>
            {__("contact_information")}
          </Text>
          <Stack
            mt="20px"
            direction={{ base: "column", md: "row" }}
            spacing={20}
            justify={"space-evenly"}
            alignItems={{ base: "center", md: "flex-start" }}
            w={"100%"}
          >
            <Flex
              direction={"column"}
              w={"100%"}
              alignSelf={"end"}
              justifySelf={"end"}
            >
              {contactInfoFormField.map((value: any, index: number) => (
                <Field name={value.name} key={index}>
                  {({ field, form }: any) => {
                    return (
                      <FormControl>
                        <FormLabel
                          fontSize={"16px"}
                          fontWeight={"600"}
                          htmlFor={value.name}
                        >
                          {value.label}
                        </FormLabel>
                        <Input
                          {...field}
                          borderRadius={"4px"}
                          borderColor={"#DDE3EE"}
                          borderWidth={"2px"}
                          disabled={value.disable ? true : false}
                          mb={"24px"}
                          type={value.type ? value.type : "text"}
                          h={"48px"}
                          id={value.name}
                          placeholder={value.placeholder}
                        />
                      </FormControl>
                    );
                  }}
                </Field>
              ))}
            </Flex>
          </Stack>
        </VStack>
      </CardBody>
    </Card>
  );

  // main return
  return (
    <LoginRequired>
      <MetamaskRequired>
        <MerchantApproveRequired>
          {initialValues && (
            <>
              <MainLayout>
                <WrappedContent>
                  <HStack align={"start"} w={"100%"} h={"100%"}>
                    <Hide below="lg">
                      <VStack position={"fixed"} spacing={0} h="100%" ps={"0px"}>
                        {menuItems.map((value) => {
                          const sectionId = sectionIdMap[value];
                          const selectedItem = getRadioProps({ value });
                          return (
                            <LeftMenuItem
                              key={value}
                              {...selectedItem}
                              isActive={sectionId === activeSection}
                            >
                              {value}
                            </LeftMenuItem>
                          );
                        })}
                      </VStack>
                    </Hide>
                    <VStack
                      ms={{ base: "0", lg: "300px" }}
                      w={"100%"}
                      alignItems={{ base: "center", lg: "end" }}
                    >
                      <Formik
                        initialValues={initialValues}
                        onSubmit={(values: any, actions: any) => {
                          handleSubmit(values);
                        }}
                      >
                        {(formik: FormikProps<ProfileFormValues>) => {
                          return (
                            <Form style={{ width: "100%" }}>
                              <VStack w={"100%"} maxW={"900px"} spacing={"16px"}>
                                <Box
                                  mb={"40px"}
                                  w={"100%"}
                                  className="edit-section"
                                >
                                  {MainInformation(formik)}
                                </Box>
                                <Box
                                  mb={"40px"}
                                  w={"100%"}
                                  className="edit-section"
                                >
                                  {AboutMeSection()}
                                </Box>
                                <Box
                                  mb={"20px"}
                                  w={"100%"}
                                  className="edit-section"
                                >
                                  {ContactInformationSection()}
                                </Box>
                              </VStack>
                              <HStack
                                spacing={"24px"}
                                mt={"15px"}
                                justify={"end"}
                              >
                                <Button
                                  w={"148px"}
                                  variant={"outline"}
                                  onClick={() => {
                                    router.push("/account");
                                  }}
                                >
                                  {__("cancel")}
                                </Button>
  
                                <Button w={"148px"} type="submit">
                                  {__("save")}
                                </Button>
                              </HStack>
                            </Form>
                          );
                        }}
                      </Formik>
                    </VStack>
                  </HStack>
                </WrappedContent>
              </MainLayout>
            </>
          )}
        </MerchantApproveRequired>
      </MetamaskRequired>
    </LoginRequired>
  );
}
