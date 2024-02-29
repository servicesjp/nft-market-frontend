import { useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
// import { Menu } from "../menu/menu";
import UserSession from "@/types/UserSession";

export const MainWrapper = styled.div`
  min-height: 100vh;
  height: auto;
  width: 100vw;
  width: 100%;
  @media screen and (max-width: 767px) {
    height: 100%;
    min-height: auto;
    width: 100%;
    background-color: var(--chakra-colors-white-100);
  }
  display: flex;
  justify-content: center;

}
`;

const IFrameWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 70px);
  margin-top: 70px;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    height: calc(
      100vh - 70px
    ); // Adjust this value if needed to fit the mobile view
  }
`;

const StyledIFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

export const IFrameFullLayout = ({
  src,
  tradingScreenLayout,
  user,
}: IFrameFullLayoutProps) => {
  const { setColorMode } = useColorMode();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setColorMode("light");
  }, [setColorMode]);

  useEffect(() => {
    if (iframeRef.current && user) {
      iframeRef.current.addEventListener("load", () => {
        iframeRef.current!.contentWindow?.postMessage({ user }, "*");
      });
    }
    const handleMessage = (event: any) => {
      if (event.data == "CALL_LOGIN")
        window.location.href = "/login";
      else if (event.data.type === 'requestPathname') {
        event.source.postMessage({
          type: 'responsePathname',
          pathname: window.location.pathname,
          searchParams: window.parent.location.search
        }, event.origin);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [iframeRef, user]);

  return (
    <MainWrapper>
      {/* <Menu forceHorizontalLayout={tradingScreenLayout} /> */}
      <IFrameWrapper>
        <StyledIFrame src={src} ref={iframeRef} />
      </IFrameWrapper>
    </MainWrapper>
  );
};

interface IFrameFullLayoutProps {
  src?: string;
  tradingScreenLayout?: boolean;
  user?: UserSession;
}
