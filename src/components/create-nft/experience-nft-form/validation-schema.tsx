/* eslint-disable import/no-anonymous-default-export */
import * as Yup from "yup";
import { useFormFields } from "./fields-form";
import { __ } from "@/helpers/common";

export const useValidationSchema = () => {
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
      // blockchain,
      // currency,
      // price,
      // additionalInfo,
      photos,
      profile,
    },
  } = useFormFields();

  return [
    // a validation is created per form or step

    Yup.object().shape({
      // categoria del nft experience
      [category.name]: Yup.string().required(__("category_required")),

      // nombre del nft experience
      [experienceTitle.name]: Yup.string().required(
        __("experience_title_required")
      ),

      // descripcion del nft experience
      [description.name]: Yup.string().required(__("description_required")),

      // servicios
      // [serviceInclude.name]: Yup.array().required(
      //   __("choose_at_least_one_service")
      // ).min(1, __('choose_at_least_one_service')),
    }),

    Yup.object().shape({
      // Arreglo de Puntos del mapa del recorrido de la experience, Se puede guardar como JSON.
      [mapPoints.name]: Yup.array().min(
        1,
        __("select_at_least_a_startimg_point")
      ),
    }),

    // Yup.object().shape({
    //   [blockchain.name]: Yup.string().required(__("blockchain_required")),

    //   [currency.name]: Yup.string().required(__("select_a_currency")),
    
    //   [additionalInfo.name]: Yup.string().required(
    //     __("additional_information_required	")
    //   ),
    // }),

    Yup.object().shape({
      // Arrangement of nft experience files, it can be from 1 to 5.
      [photos.name]: Yup.array()
        // .required('Files are required')
        .min(1, __("select_at_least_one_photo"))
        .max(photos.maxPhotos, `You can only upload ${photos.maxPhotos} photos`)
        .test("fileType", __('unsupported_file_type'), (value: any) => {
          for (let i = 0; i < value.length; i++) {
            const fileExt = value[i].name.split(".").pop()?.toLowerCase();
            if (!fileExt || !photos.supportedFileTypes.includes(fileExt)) {
              return false;
            }
          }
          return true;
        })
        .test("fileSize", __('file_is_too_large'), (value: any) => {
          for (let i = 0; i < value.length; i++) {
            const fileSizeMB = value[i].size / (1024 * 1024);
            if (fileSizeMB > photos.maxFileSize) {
              return false;
            }
          }
          return true;
        }),

      // Imagen obligatoria de la experiencia, solo es una
      [profile.name]: Yup.array()
        .min(1, __('field_required'))
        .max(
          profile.maxPhotos,
          `You can only upload ${profile.maxPhotos} photo`
        )
        .test("fileType", __('unsupported_file_type'), (value: any) => {
          for (let i = 0; i < value.length; i++) {
            const fileExt = value[i].name.split(".").pop()?.toLowerCase();
            if (!fileExt || !profile.supportedFileTypes.includes(fileExt)) {
              return false;
            }
          }
          return true;
        })
        .test("fileSize", __('file_is_too_large'), (value: any) => {
          for (let i = 0; i < value.length; i++) {
            const fileSizeMB = value[i].size / (1024 * 1024);
            if (fileSizeMB > profile.maxFileSize) {
              return false;
            }
          }
          return true;
        }),
    }),
  ];
};