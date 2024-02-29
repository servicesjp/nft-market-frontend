/* eslint-disable import/no-anonymous-default-export */

import { useFormFields } from "./checkout-onboarding";

export const useInitialValuesBoarding = () => {

  const {
    formField: {
      fullName,
      country,
      city,
      identityCardType,
      identityCardNumber,
      businessDescription,
      reason,
      nftTypes,
    },
  } = useFormFields();
  
  return {
    // [fullName.name]: "",
    // [country.name]: "",
    // [city.name]: "",
    // [identityCardType.name]: "",
    // [identityCardNumber.name]: "",
    // [nftTypes.name]:"",
    
    [fullName.name]: "",
    [country.name]: "",
    [city.name]: "",
    [identityCardType.name]: "DNI",
    [identityCardNumber.name]: "",
    [businessDescription.name]: '',
    [reason.name]: '',
    [nftTypes.name]:[],
  };
}
