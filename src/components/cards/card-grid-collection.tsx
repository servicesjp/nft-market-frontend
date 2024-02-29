import { __ } from "@/helpers/common";
import { Box, Text, Grid, Image, BoxProps } from "@chakra-ui/react";
import React from "react";

interface colsInterface {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
}
interface IGridCollectionProps {
  products: any[];
  cols?: number | colsInterface;
  name?: string | undefined;
  options?: BoxProps;
  children?: any;
}

const defaultCols = {
  base: 1,
  sm: 1,
  md: 4,
  lg: 4,
};

const getCols = (cols: number | colsInterface) => {
  if (typeof cols === "number") {
    return {
      base: cols,
      sm: cols,
      md: cols,
      lg: cols,
    };
  }

  return {
    ...defaultCols,
    ...cols,
  };
};
function GridCollection({
  products,
  cols = 4,
  name = "gridcol",
  options = { gap: 24 },
  children,
}: IGridCollectionProps) {
  const colsBreakpoints = getCols(cols);

  const getCardType = (data: any) => {
    return children.find((d: any) => d.props.nftType === data.nftType);
  }

  const templateColumns = {
    base: `repeat(${colsBreakpoints.base}, 1fr)`,
    sm: `repeat(${colsBreakpoints.sm}, 1fr)`,
    md: `repeat(${colsBreakpoints.md}, 1fr)`,
    lg: `repeat(${colsBreakpoints.lg}, 1fr)`,
  };

  return products.length > 0 ? (
    <Grid
      templateColumns={templateColumns}
      {...options}
      key={name}
      w="100%"
    >
      {products.map((value, index) =>
        React.cloneElement(children.length > 0 ? getCardType(value) : children , { data: value, key: `${name}-${index}` })
      )}
    </Grid>
  ): (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minH="300px">
      <Image
        h="80px"
        w="80px"
        src="/images/data-notfound.svg"
        alt={__("not_found")}
      />
      <Text color="gray.400" fontSize="14px">
        {__("no_records_found").replace(/\.$/, "")}
      </Text>
    </Box>
  );
}

export default GridCollection;
