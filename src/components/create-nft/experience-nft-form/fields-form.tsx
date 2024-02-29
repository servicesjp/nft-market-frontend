/* eslint-disable import/no-anonymous-default-export */
import { serviceIncludeOptions } from "@/constants/create-nft/service-include-options";
import { DEFAULT_CHAIN, currencyOptionsByChain } from "@/constants/env";
import { __ } from "@/helpers/common";

export const useFormFields = () => {
  return {
    formField: {
      // Step 1
      category: {
        name: "category",
        initialValue: "",
        label: __("what_type_of_experience_do_you_offer"),
        placeholder: __("select_a_category"),
      },

      experienceTitle: {
        name: "experienceTitle",
        initialValue: "",
        label: __("experience_title"),
        placeholder: __("experience_title"),
      },

      description: {
        name: "description",
        initialValue: "",
        label: __("describe_the_experience"),
        placeholder: __("description"),
      },

      serviceInclude: {
        name: "serviceInclude",
        initialValue: "",
        options: serviceIncludeOptions(),
        label: __("what_is_included"),
        placeholder: __("description"),
      },

      // Step 2

      mapPoints: {
        name: "mapPoints",
        initialValue: [],
        label: __("selected_locations"),
        placeholder: __("select_location_on_map"),
      },

      // Step 3

      // adultTickets: {
      //   name: "adultTickets",
      //   initialValue:1,
      //   title: 'How many people can take the tour?',
      //   label:"Adults",
      // },

      // childrenTickets: {
      //   name: "childrenTickets",
      //   initialValue:0,
      //   label:"Children",
      // },

      // days: {
      //   name: "days",
      //   initialValue:[],
      //   title: 'How long will the experience last?',
      //   options: [
      //     {label: 'MN', value: 'Monday'},
      //     {label: 'TU', value: 'Tuesday'},
      //     {label: 'WD', value: 'Wednesday'},
      //     {label: 'TH', value: 'Thursday'},
      //     {label: 'FR', value: 'Friday'},
      //     {label: 'SA', value: 'Saturday'},
      //     {label: 'SU', value: 'Sunday'},
      //   ],
      //   label:"Days",
      // },

      // startHour: {
      //   name: "startHour",
      //   initialValue:0,
      //   label:"Hours",
      // },

      // endHour: {
      //   name: "endHour",
      //   initialValue:0,
      //   label:"Hours",
      // },

      blockchain: {
        name: "blockchain",
        initialValue: "",
        label: __("blockchain"),
      },

      currency: {
        name: "currency",
        label: __("experience_price"),
        subLabel: __("price_per_person"),
        placeholder: "USDT",
        initialValue: "",
        options: currencyOptionsByChain(DEFAULT_CHAIN),
      },

      // price: {
      //   name: "price",
      //   initialValue:undefined,
      //   suffix: '',
      // },

      additionalInfo: {
        name: "additionalInfo",
        initialValue: "",
        label: __("additional_information"),
        placeholder: __("enter_information"),
      },

      // Step 4

      photos: {
        name: "photos",
        initialValue: [] as File[],
        label: __("add_some_photos_of_your_experience"),
        subLabel: `${__('supported_file_types')}: JPG, JPEG, PNG, SVG. ${__("you_will_need_5_photos_to_get_started")}`,
        icon: "/nft/upload-file-icon.svg",
        supportedFileTypes: [
          "jpg",
          "jpeg",
          "png",
          "svg",
        ],
        maxFileSize: 10, // MB
        minPhotos: 0,
        maxPhotos: 5,
      },

      profile: {
        name: "profile",
        initialValue: [] as File[],
        label: __("add_a_profile_picture"),
        subLabel: `${__('supported_file_types')}: JPG, JPEG, PNG, SVG. ${__("experience_portrait")}`,
        icon: "/nft/upload-file-icon.svg",
        supportedFileTypes: [
          "jpg",
          "jpeg",
          "png",
          "svg",
        ],
        maxFileSize: 10, // MB
        maxPhotos: 1,
      },
    },
  };
};