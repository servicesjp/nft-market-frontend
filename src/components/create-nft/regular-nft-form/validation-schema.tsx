/* eslint-disable import/no-anonymous-default-export */
import * as Yup from "yup";
import { useFormFields } from "./fields-form";
import { __ } from "@/helpers/common";
import { CURRENCY_ETHER, DECIMALS_SIX, DECIMALS_TWO, MAX_ETHER_QUANTITY, MAX_TOKEN_QUANTITY } from "@/constants/env"

export const useValidationSchema = () => {
  const {
    formField: {
      fileNFT,
      nftName,
      tags,
      description,

      externalLink,
      // collection,
      // properties,
      // unlockableContent,
      supply,
      blockchain,
      currency,
      royalty,
      price,
    },
  } = useFormFields();

  return [
    // First Step - General info
    Yup.object().shape({
      // archivos de nft, arreglo de archivos de tipo ['jpg', 'png', 'gif', 'svg', 'mp4', 'webm', 'mp3', 'wav', 'ogg', 'glb', 'gltf'].
      // minimo 1, maximo 5.
      [fileNFT.name]: Yup.array()
        // .required('Files are required')
        .min(1, __("select_at_least_one_photo"))
        .max(
          fileNFT.maxPhotos,
          `You can only upload ${fileNFT.maxPhotos} photos`
        )
        .test("fileType", "Unsupported file type", (value: any) => {
          for (let i = 0; i < value.length; i++) {
            const fileExt = value[i].name.split(".").pop()?.toLowerCase();
            if (!fileExt || !fileNFT.supportedFileTypes.includes(fileExt)) {
              return false;
            }
          }
          return true;
        })
        .test("fileSize", "File size is too large", (value: any) => {
          for (let i = 0; i < value.length; i++) {
            const fileSizeMB = value[i].size / (1024 * 1024);
            if (fileSizeMB > fileNFT.maxFileSize) {
              return false;
            }
          }
          return true;
        }),

      // nombre de nft, string
      [nftName.name]: Yup.string().required(__("name_required")),

      // arreglo de tags, string[]
      [tags.name]: Yup.array().min(1, __("select_at_least_one_tag")),

      // descripcion, string
      [description.name]: Yup.string().required(__("description_required")),
    }),
    Yup.object().shape({
      // external Link
      [externalLink.name]: Yup.string(),
      // Cantidad de instancias del nft
      [supply.name]: Yup.number()
        .positive(__("supply_must_be_positive"))
        .required(__("Supply is required")),
      // Blockchain por defecto a la que ira el nft
      [blockchain.name]: Yup.string().required(__("blockchain_required")),
      // moneda en la que se tiene el precio
      [currency.name]: Yup.string().required(__("select_a_currency")),
      [royalty.name]: Yup.number()
      .typeError('Must be a number')
      .min(0,'Must be  or equal than 0')
      .max(1000,'Must be less or equal than 1000')
      .test('Must be Number', (value: any) => {
        return !isNaN(parseInt(value))
       }),
      // precio por persona
      [price.name]: Yup.string()
      //  .min(0,__("number_must_be_positive"))
      //  .max(1,'La cantidad es demasiado grande')
        // .positive(__("must_be_positive_number"))
        .required(__("price_required"))
        
        
         .when(currency.name,(value:any, schema:any)=>{
          const isEther = value[0] === CURRENCY_ETHER
          const maxDecimals = isEther ? DECIMALS_SIX : DECIMALS_TWO
          const max = isEther ? MAX_ETHER_QUANTITY : MAX_TOKEN_QUANTITY;
          return schema.test('max-decimals', `Max ${maxDecimals} decimals`, (value: any) => {
            const decimalCount = (String(value).toString().split('.')[1] || []).length;
            return decimalCount <= maxDecimals;
          })
          .test('Must be Number', (value: any) => {
            return !isNaN(parseInt(value))
           })
           .test('No Negative', (value: any)=>{
            const val = parseInt(value)
            return Math.sign(val) != -1
           })
           .test('Max number', (value: any)=>{
            const val = parseInt(value)
            return val <=  max
           })
           .test('Incorrect Number', (value: any)=>{
            return /^(0|[1-9]\d*)(\.\d+)?$/.test(value)
           })
         })
        // .when(currency.name, (value: any, schema: any) => {
        //   function validateDecimals(price:number, min: number, max: number, decimals: number) {
        //     if (price < min) {
        //       return false;
        //     } else if (price > max) {
        //       return false;
        //     } else if(price.toString() == "00" || price.toString().substring(0,2) == "00") {
        //       return false
        //     }
        //     else {
        //       const decimalCount = (price.toString().split('.')[1] || []).length;
        //       return decimalCount <= decimals;
        //     }
        //   }
        //   const isEther = value[0] === CURRENCY_ETHER;
        //   const maxDecimals = isEther ? 6 : 2;
        //   const min = isEther ? 0.000000 : 1.00;
        //   const max = isEther ? 0.0 : 100.00;
        //   console.log({min, max, maxDecimals, isEther})
        //   return schema.test(
        //     'maxDecimals',
        //     `incorrect number`,
        //     (value: any) => {
        //       if (value === undefined || value === null || isNaN(value)) {
        //         return true;
        //       }
        //       return validateDecimals(value, min, max, maxDecimals);
        //     }
        //   );
        // }),
    }),
  ];
};