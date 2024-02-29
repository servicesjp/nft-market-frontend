import { Box, BoxProps } from "@chakra-ui/react";
import styles from "./switchable.module.css";

interface SwitchableIndicatorProps extends BoxProps {
}
function SwitchableIndicator({
  color="dark.100",
  minW="40px",
  minH="40px",
  p="6px",
  bg="primary.100",
  cursor="pointer",
  borderRadius="4px",
  ...props
}: SwitchableIndicatorProps) {
  return (
    <Box
      key={"switchable-indicator"}
      className={styles.SwitchableIndicatorActive}
      color={color}
      minW={minW}
      minH={minH}
      p={p}
      bg={bg}
      cursor={cursor}
      borderRadius={borderRadius}
      left="0"
      position="absolute"
      transition="transform 0.3s ease"
      {...props}
    ></Box>
  );
}

export default SwitchableIndicator;
