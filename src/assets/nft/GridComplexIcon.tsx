import { Box } from "@chakra-ui/react";
function GridComplexIcon({ color, fill = "none", selected = false }: any) {
  return (
    <Box backgroundColor={selected? '#5F76E9':'none'} borderRadius={"8px"} p={"1px"}>
      <svg
        width="28"
        height="29"
        viewBox="0 0 28 29"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.4997 26.1663H17.4997C23.333 26.1663 25.6663 23.833 25.6663 17.9997V10.9997C25.6663 5.16634 23.333 2.83301 17.4997 2.83301H10.4997C4.66634 2.83301 2.33301 5.16634 2.33301 10.9997V17.9997C2.33301 23.833 4.66634 26.1663 10.4997 26.1663Z"
          fill="white"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.36816 10.417H25.6665"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.36816 18.583H25.6665"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.92871 26.1547V2.84473"
        //   stroke="#5F76E9"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.0947 26.1547V2.84473"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
}

export default GridComplexIcon;
