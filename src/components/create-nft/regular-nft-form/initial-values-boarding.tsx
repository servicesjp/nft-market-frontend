import { useFormFields } from "./fields-form";

export const useInitialValues = () => {
  const {
    formField: {
      fileNFT,
      nftName,
      tags,
      description,
      externalLink,
      // collection,
      // properties,
      // levels,
      // statistics,
      // unlockableContent,
      supply,
      blockchain,
      currency,
      royalty,
      price,
    },
  } = useFormFields();

  return {
    [fileNFT.name]: fileNFT.initialValue,
    [nftName.name]: nftName.initialValue,
    [tags.name]: tags.initialValue,
    [description.name]: description.initialValue,
    [externalLink.name]: externalLink.initialValue,
    // [collection.name]: collection.initialValue,
    // [properties.name]: properties.initialValue,
    // [levels.name]: levels.initialValue,
    // [statistics.name]: statistics.initialValue,
    // [unlockableContent.name]: unlockableContent.initialValue,
    [supply.name]: supply.initialValue,
    [blockchain.name]: blockchain.initialValue,
    [currency.name]: currency.initialValue,
    [royalty.name]: royalty.initialValue ,
    [price.name]: price.initialValue,
  };
};
