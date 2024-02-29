import * as Yup from "yup";
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

export default [
  // a validation is created per form or step
  
  Yup.object().shape({

    // Arreglo de archivos del nft experience, puede ser de 1 a 5.
    [photos.name]: Yup.array()
      // .required('Files are required')
      .min(1, 'Select at least one photo')
      .max(photos.maxPhotos, `You can only upload ${photos.maxPhotos} photos`)
      .test('fileType', 'Unsupported file type', (value : any) => {
        for (let i = 0; i < value.length; i++) {
          const fileExt = value[i].name.split('.').pop()?.toLowerCase();
          if (!fileExt || !photos.supportedFileTypes.includes(fileExt)) {
            return false;
          }
        }
        return true;
      })
      .test('fileSize', 'File size is too large', (value : any) => {
        for (let i = 0; i < value.length; i++) {
          const fileSizeMB = value[i].size / (1024 * 1024);
          if (fileSizeMB > photos.maxFileSize) {
            return false;
          }
        }
        return true;
      }),
    
    // nombre del nft
    [title.name]: Yup.string()
                      .required('Title is required'),

    // descripcion del product nft
    [description.name]: Yup.string().required('Description is required'),

    // arreglo de tags, string[]
    [tags.name]: Yup.array().min(1, 'Select at least one tag'),
  }),

  Yup.object().shape({

    [category.name]: Yup.string().required('Category is required'),
    [brand.name]: Yup.string().required('Brand is required'),
    [condition.name]: Yup.string().required('Condition is required'),
    [color.name]: Yup.string().required('Color is required'),
  }),

  Yup.object().shape({

    // opcion de delivery string
    [delivery.name]: Yup.string().required('Delivery is required'),

    [deliveryDetail.name]: Yup.string(),

    // moneda en la que se tiene el precio
    [currency.name]: Yup.string().required('Select a currency'),

    // precio por persona
    [pricePerPerson.name]: Yup.number().positive('Must be positive number').required('Price per person is required'),

  }),

]
