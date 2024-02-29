/* eslint-disable check-file/filename-naming-convention */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable import/no-anonymous-default-export */
import { useFormFields } from "./checkout-onboarding";
import * as Yup from "yup";

export const useValidationSchema = () => {
  const {
    formField: {
      fullName,
      country,
      city,
      identityCardType,
      identityCardNumber,
      reason,
      businessDescription,
      nftTypes,
    },
  } = useFormFields();

  return [
    // se crea un validation por formulario o paso

    // First Step - Project Details
    Yup.object().shape({
      fullName: Yup.string()
        .required(fullName.requiredErrorMsg),
      country: Yup.object()
        .required(country.requiredErrorMsg),
      city: Yup.object()
        .required(city.requiredErrorMsg),
      identityCardType: Yup.string()
        .required(identityCardType.requiredErrorMsg),
      identityCardNumber: Yup.string()
        .required(identityCardNumber.requiredErrorMsg),
      reason: Yup.string()
        .required(reason.requiredErrorMsg),
      businessDescription: Yup.string()
        .required(businessDescription.requiredErrorMsg),
      nftTypes: Yup.array()
        .min(1, nftTypes.requiredErrorMsg)
    }),
  ]
}

