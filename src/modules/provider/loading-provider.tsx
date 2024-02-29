/* eslint-disable check-file/filename-naming-convention */
import React, { createContext, useState } from "react";

export const LoadingContext = createContext(0);
function LoadingProvider({ children }: any) {
  const [loading, setLoading] = useState(false);
  const hideLoading = () => {
    setLoading(false);
  };
  const showLoading = () => {
    setLoading(true);
  };
  return (
    <LoadingContext.Provider
    value={0}
      /*value={{
        loading,
        hideLoading: hideLoading,
        showLoading: showLoading,
      }}*/
    >
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
