// import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
export const WrapperBox = styled.div`
    background-color: white;
    border: "1px solid white";
    cursor: pointer;
    transition: all 0.1s ease;
    width:"100%";
    /* padding: 1rem; */
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        svg {
            fill:#0026E6
        }
        path {
            stroke:white
        }
    }

    
  `;
function HeartIcon({ color, fill = "none" }: any) {
    
  return (
    <WrapperBox 
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        
        <path
          d="M14.723 24.2779C14.3263 24.4179 13.673 24.4179 13.2763 24.2779C9.89301 23.1229 2.33301 18.3045 2.33301 10.1379C2.33301 6.53288 5.23801 3.61621 8.81967 3.61621C10.943 3.61621 12.8213 4.64288 13.9997 6.22954C15.178 4.64288 17.068 3.61621 19.1797 3.61621C22.7613 3.61621 25.6663 6.53288 25.6663 10.1379C25.6663 18.3045 18.1063 23.1229 14.723 24.2779Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </WrapperBox>
  );
}

export default HeartIcon;
