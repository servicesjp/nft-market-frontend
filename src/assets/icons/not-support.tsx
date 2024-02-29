function NotSupport({ color }: any) {
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6667 5.66659C14.6667 8.05992 12.7267 9.99992 10.3333 9.99992C10.22 9.99992 10.1 9.99326 9.98667 9.98659C9.82001 7.87326 8.12666 6.17991 6.01333 6.01324C6.00666 5.89991 6 5.77992 6 5.66659C6 3.27325 7.94 1.33325 10.3333 1.33325C12.7267 1.33325 14.6667 3.27325 14.6667 5.66659Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0007 10.3333C10.0007 12.7267 8.06065 14.6667 5.66732 14.6667C3.27398 14.6667 1.33398 12.7267 1.33398 10.3333C1.33398 7.94 3.27398 6 5.66732 6C5.78065 6 5.90064 6.00666 6.01398 6.01333C8.12731 6.17999 9.82066 7.87334 9.98732 9.98667C9.99399 10.1 10.0007 10.22 10.0007 10.3333Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.08 9.74674L5.66667 8.66675L6.25334 9.74674L7.33333 10.3334L6.25334 10.9201L5.66667 12.0001L5.08 10.9201L4 10.3334L5.08 9.74674Z"
          stroke={color}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default NotSupport;
