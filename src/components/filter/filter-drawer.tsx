import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Input,
  Select,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Stack,
  Divider,
  useMediaQuery,
} from '@chakra-ui/react';
import Filter from './filter-type';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import RadioButtonGroup from './button-radio-group';
import CheckboxButtonGroup from './checkbox-button-group';
import { __ } from "@/helpers/common";
// import CheckboxButtonGroup from './checkbox-button-group';

interface FilterDrawerContextProps {
  registerCustomFilter: (filterName: string, value: any) => void;
}

const FilterDrawerContext = createContext<FilterDrawerContextProps | undefined>(
  undefined
);

interface FilterDrawerProps {
  filters: Filter[];
  onApply: (filters: any) => void;
  children?: ReactNode;
  filterDrawerItem?: ReactNode;
  applyOnChange?: boolean;
  showFooterButtons?: boolean;
  drawerHeaderTitle? : string;
  drawerPlacement?: "left" | "right" | "top" | "bottom";
}
interface Option {
  value: string;
  label: string;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  filters,
  onApply,
  children,
  filterDrawerItem,
  applyOnChange = false,
  showFooterButtons = true,
  drawerHeaderTitle: drawerHeaderItem,
  drawerPlacement = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [customFilters, setCustomFilters] = useState<any>({});
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleOpen = () => {
    setIsOpen(true)
  };
  const handleClose = () => setIsOpen(false);

  const handleApply = () => {
    onApply({ ...selectedFilters, ...customFilters });
    if (!applyOnChange || isMobile) {
      handleClose();
    }
  };

  const registerCustomFilter = (filterName: string, value: any) => {
    setCustomFilters((prev: any) => ({ ...prev, [filterName]: value }));
  };

  const CustomAccordionButton: React.FC<{
    filterName: string;
    isExpanded: boolean;
  }> = ({ filterName, isExpanded }) => {
    return (
      <AccordionButton px="6px" py="12px" cursor="pointer">
        <Text
          flex="1"
          textAlign="left"
          fontWeight="500"
          fontFamily="Geomanist"
          color="dark.100"
        >
          {__(filterName)}
        </Text>
        {isExpanded ? <MinusIcon boxSize={4} /> : <AddIcon boxSize={4} />}
      </AccordionButton>
    );
  };

  useEffect(() => {
    if (applyOnChange) {
      handleApply();
    }
  }, [selectedFilters]);

  const renderFilter = (filter: Filter) => {
    const defaultIndices = [0, 1];

    return (
      <Accordion defaultIndex={defaultIndices} allowToggle key={filter.name}>
        <Divider></Divider>
        <AccordionItem p="4" py="6px">
          {({ isExpanded }) => (
            <>
              <CustomAccordionButton
                isExpanded={isExpanded}
                filterName={filter.name}
              />
              <AccordionPanel pb={4} px="6px">
                {(() => {
                  switch (filter.type) {
                    case "input":
                      return (
                        <Input
                          placeholder={filter.placeholder}
                          defaultValue={filter.defaultValue as string}
                        />
                      );
                    case "checkbox":
                      return (
                        <CheckboxGroup
                          defaultValue={selectedFilters[filter.id]}
                          onChange={(values) =>
                            setSelectedFilters({
                              ...selectedFilters,
                              [filter.id]: values,
                            })
                          }
                        >
                          {filter.options?.map((option) =>
                            typeof option === "string" ? (
                              <Checkbox w="100%" key={option} value={option}>
                                {option}
                              </Checkbox>
                            ) : null
                          )}
                        </CheckboxGroup>
                      );
                    case "radio":
                      return (
                        <RadioGroup
                          defaultValue={filter.defaultValue as string}
                          onChange={(value) =>
                            setSelectedFilters({
                              ...selectedFilters,
                              [filter.id]: value,
                            })
                          }
                        >
                          {filter.options?.map((option) =>
                            typeof option !== "string" ? (
                              <Radio
                                w="100%"
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </Radio>
                            ) : null
                          )}
                        </RadioGroup>
                      );

                    case "radio-button":
                      const validOptions =
                        filter.options?.filter(
                          (option): option is Option =>
                            typeof option !== "string"
                        ) || [];
                      return (
                        <RadioButtonGroup
                          options={validOptions}
                          value={
                            selectedFilters[filter.id] ||
                            (filter.defaultValue as string)
                          }
                          onChange={(value) => {
                            setSelectedFilters({
                              ...selectedFilters,
                              [filter.id]: value,
                            });
                            handleClose();
                          }}
                        />
                      );

                    case "checkbox-button":
                      const validCheckboxOptions =
                        filter.options?.filter(
                          (option): option is Option =>
                            typeof option !== "string"
                        ) || [];
                      return (
                        <CheckboxButtonGroup
                          options={validCheckboxOptions}
                          values={
                            selectedFilters[filter.id] ||
                            (filter.defaultValue as string[])
                          }
                          onChange={(values) => {
                            setSelectedFilters({
                              ...selectedFilters,
                              [filter.id]: values,
                            });
                          }}
                        />
                      );

                    case "select":
                      return (
                        <Select
                          defaultValue={filter.defaultValue as string}
                          placeholder={filter.placeholder}
                          onChange={(e) =>
                            setSelectedFilters({
                              ...selectedFilters,
                              [filter.id]: e.target.value,
                            })
                          }
                        >
                          {filter.options?.map((option) =>
                            typeof option !== "string" ? (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ) : null
                          )}
                        </Select>
                      );
                    default:
                      return null;
                  }
                })()}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <FilterDrawerContext.Provider value={{ registerCustomFilter }}>
      <Box onClick={handleOpen}>
        {filterDrawerItem ? (
          filterDrawerItem
        ) : (
          <Button onClick={handleOpen}>{__("filter")}</Button>
        )}
      </Box>

      <Drawer
        isOpen={isOpen}
        placement={drawerPlacement}
        onClose={handleClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent overflow="visible" p="0" py="6px">
          <DrawerHeader position={"relative"} borderBottomWidth='1px'>
          <Text fontWeight="500"> {drawerHeaderItem ? drawerHeaderItem : __("filters")} </Text>
            <DrawerCloseButton top={"calc(50% - 16px)"} border={"1px solid #E6E6E6"} color={"primary.100"}/>
          </DrawerHeader >
          <DrawerBody p="0">
            <Stack spacing="6px">
              {filters.map(renderFilter)}
              {children}
            </Stack>
          </DrawerBody>

          {showFooterButtons && (
            <DrawerFooter>
              <Button
                colorScheme="dark.100"
                variant="outline"
                mr={3}
                onClick={handleClose}
              >
                {__("cancel")}
              </Button>
              <Button colorScheme="primary.100" onClick={handleApply}>
                {__("apply")}
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </FilterDrawerContext.Provider>
  );
};

export const useFilterDrawerContext = () => {
  const context = useContext(FilterDrawerContext);
  if (!context) {
    throw new Error('useFilterDrawerContext must be used within a FilterDrawerContext.Provider');
  }
  return context;
};

export const updateDefaultValues = (filters: Filter[], response: any): Filter[] => {
  return filters.map(filter => {
    if (response[filter.id] !== undefined) {
      return { ...filter, defaultValue: response[filter.id] };
    } else if (!filter.defaultValue) {
      return { ...filter, defaultValue: '' }; // o cualquier valor por defecto que desees
    }
    return filter;
  });
};

export default FilterDrawer;