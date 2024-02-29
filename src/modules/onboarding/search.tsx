/* eslint-disable check-file/filename-naming-convention */
import { Image, Box } from "@chakra-ui/react";

export default function SearchImage() {
    return (
        <Box px={"15px"}>
            <Image h={'25px'} w="25px" src="/images/launchpad/search-normal.svg" alt="Search" />
        </Box>
    );
}
