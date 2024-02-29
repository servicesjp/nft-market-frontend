import { Box } from "@chakra-ui/react";
const WrappedContent = ({ children }: any) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"40px"}>
      {children}
    </Box>
  );
};

export default WrappedContent;
