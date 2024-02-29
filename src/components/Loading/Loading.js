import React from "react";
import Lottie from "react-lottie";
import animationData from "./loading.json"

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-white flex justify-center items-center z-[10000]">
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
      />
    </div>
  )
}
export default Loading;
