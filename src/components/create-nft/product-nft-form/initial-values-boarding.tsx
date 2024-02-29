import fieldsForm from "./fields-form";

const {
  formField: {
    photos,
    title,
    description,
    tags,

    category,
    brand,
    condition,
    color,

    delivery,
    deliveryDetail,
    currency,
    pricePerPerson
  }
} = fieldsForm

export default {  
  [photos.name]: photos.initialValue,
  [title.name]: title.initialValue,
  [description.name]: description.initialValue,
  [tags.name]: tags.initialValue,
  [category.name]: category.initialValue,
  [brand.name]: brand.initialValue,
  [condition.name]: condition.initialValue,
  [color.name]: color.initialValue,
  [delivery.name]: delivery.initialValue,
  [deliveryDetail.name]: deliveryDetail.initialValue,
  [currency.name]: currency.initialValue,
  [pricePerPerson.name]: pricePerPerson.initialValue,
};
