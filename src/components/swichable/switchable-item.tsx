import { Box, BoxProps, useMediaQuery } from "@chakra-ui/react";
import styles from "./switchable.module.css";
import React, { useRef } from 'react';

interface SwitchableItemProps extends BoxProps {
  value?: string | number;
  selectItem?: string;
  onSetSelectItem?: any; 
    // | React.Dispatch<React.SetStateAction<string | undefined>>
    // | undefined;
  width?: string;
}

function SwitchableItem({
  value,
  selectItem,
  onSetSelectItem,
  width,
  ...props
}: SwitchableItemProps) {
  const isActive = selectItem === value;
  const boxRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  React.useEffect(() => {
    isActive ? onSetSelectItem({value: value !== undefined ? String(value) : undefined, ref: boxRef}) : null;
  }, [])

  const handleEvent = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // e.preventDefault();
    if (onSetSelectItem) {
      onSetSelectItem({
        value: value !== undefined ? String(value) : undefined,
        ref: boxRef
      });
    }
  };

  return (
    <Box
      ref={boxRef}
      key={value}
      className={isActive ? styles.switchableItemActive : undefined}
      minW={width ? width : "40px"}
      height="40px"
      p="6px"
      cursor="pointer"
      borderRadius="4px"
      fontWeight="400"
      // color={isActive ? "white" : "dark.100"}
      sx={{
        WebkitTapHighlightColor: 'transparent', // Anular el resaltado al tocar en WebKit (Chrome, Safari)
      }}
      {...props}
      {...(isMobile 
        ? { onTouchStart: handleEvent }
        : { onClick: handleEvent }
      )}
    ></Box>
  );
}

export default SwitchableItem;
