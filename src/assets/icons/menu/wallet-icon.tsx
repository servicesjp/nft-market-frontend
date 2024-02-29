function WalletIcon({ color }: any) {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 12.4113V7.84132C2.5 6.65132 3.23 5.59128 4.34 5.17128L12.28 2.17128C13.52 1.70128 14.85 2.62131 14.85 3.95131V7.7513"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5588 13.9731V16.0331C22.5588 16.5831 22.1188 17.0331 21.5588 17.0531H19.5988C18.5188 17.0531 17.5288 16.2631 17.4388 15.1831C17.3788 14.5531 17.6188 13.9631 18.0388 13.5531C18.4088 13.1731 18.9188 12.9531 19.4788 12.9531H21.5588C22.1188 12.9731 22.5588 13.4231 22.5588 13.9731Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 12H14"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default WalletIcon;
