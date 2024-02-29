import { motion, AnimatePresence } from "framer-motion";
import { ScaleFade } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface TransitionLayoutProps {
  children: React.ReactNode;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setPreviousPath(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };

  }, [router.asPath, router.events]);

  const isWithinMarketplace = (path: string) => path.startsWith('/marketplace/experience');
  const shouldSkipAnimation = isWithinMarketplace(router.asPath) && isWithinMarketplace(previousPath);

  if (shouldSkipAnimation) {
    return (
      <>
        {children}
      </>
    ); // Render children without animation
  }


  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        
      >
        <ScaleFade initialScale={1} in={true}>
          {children}
        </ScaleFade>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionLayout;
