/* eslint-disable import/no-anonymous-default-export */

import { useFormFields } from "./fields-form";

export const useInitialValuesBoarding = () => {
  const {
    formField: {
      category,
      experienceTitle,
      description,
      serviceInclude,

      mapPoints,

      // adultTickets,
      // childrenTickets,
      // days,
      // startHour,
      // endHour,
      blockchain,
      currency,
      // price,
      additionalInfo,

      photos,
      profile,
    },
  } = useFormFields();

  return {
    [category.name]: category.initialValue,
    [experienceTitle.name]: experienceTitle.initialValue,
    [description.name]: description.initialValue,
    [serviceInclude.name]: serviceInclude.initialValue,
    [mapPoints.name]: mapPoints.initialValue,
    // [adultTickets.name]: adultTickets.initialValue,
    // [childrenTickets.name]: childrenTickets.initialValue,
    // [days.name]: days.initialValue,
    // [startHour.name]: startHour.initialValue,
    // [endHour.name]: endHour.initialValue,
    [blockchain.name]: blockchain.initialValue,
    [currency.name]: currency.initialValue,
    // [price.name]: price.initialValue,
    [additionalInfo.name]: additionalInfo.initialValue,
    [photos.name]: photos.initialValue,
    [profile.name]: profile.initialValue,
  };
};
