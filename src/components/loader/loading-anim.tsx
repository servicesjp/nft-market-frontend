import { VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

function LoadingAnim() {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  return (
    <VStack
      position="fixed"
      left="0"
      top="0"
      right="0"
      bottom="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="#fff"
      className="video"
    >
      {hasWindow && (
        <ReactPlayer
          loop={true}
          playing={true}
          playsinline={true}
          muted={true}
          url="/initial-loading-anim/loading.mp4"
        />
      )}
    </VStack>
  );
}

export default LoadingAnim;
