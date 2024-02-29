import { Box, useColorModeValue } from "@chakra-ui/react";
import { MoonLoader } from "react-spinners";

const spinnerCss = {
    display: "block",
    margin: "0 auto",
    borderColor: "red"
};

export default function Spinner() {
    const color = useColorModeValue("var(--chakra-colors-primary-100)", "var(--chakra-colors-white-100)")
    return <Box height={"50vh"} display={"flex"} alignItems={"center"}><MoonLoader size={30} color={color} cssOverride={spinnerCss} /></Box>
}