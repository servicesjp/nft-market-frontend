import { useMediaQuery } from "@chakra-ui/react";

function useResponsive() {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [isTablet] = useMediaQuery("(max-width: 1024px)");

    return {isMobile, isTablet}
}

export default useResponsive;