/* eslint-disable import/no-anonymous-default-export */

import { __ } from "@/helpers/common";

export const useFormFields = () => {
    return {
      formField: {
        
        // First Step
  
        fullName: {
          name: "fullName",
          value:"",
          label: __('full_name'),
          placeholder:__('full_name'),
          requiredErrorMsg: __('field_required'),
          invalidErrorMsg: __('field_invalid'),
        },
        // lastName: {
        //   name: "lastName",
        //   value:"",
        //   label:"Full Name",
        //   placeholder:"Last Name",
        //   requiredErrorMsg: "Enter Last Name",
        //   invalidErrorMsg: "Last Name is not valid.",
        // },
        country: {
          name: "country",
          value:"",
          label:__('country'),
          placeholder:__('country'),
          requiredErrorMsg: __('field_required'),
          invalidErrorMsg: __('field_invalid'),
        },
        city: {
          name: "city",
          value:"",
          label:__('city'),
          placeholder:__('city'),
          requiredErrorMsg: __('field_required'),
          invalidErrorMsg: __('field_invalid'),
        },
        identityCardType: {
          name: "identityCardType",
          value:"",
          label:__('identity_card'),
          placeholder:__('type'),
          requiredErrorMsg: __('field_required'),
          invalidErrorMsg: __('field_invalid'),
        },
        identityCardNumber: {
          name: "identityCardNumber",
          value:"",
          label:__('identity_card_number'),
          placeholder:__('identity_card_number'),
          requiredErrorMsg: __('field_required'),
          invalidErrorMsg: __('field_invalid'),
        },
        reason: {
          name: "reason",
          value:"",
          label:__('why_became_merchant_?'),
          placeholder:__('enter_text'),
          requiredErrorMsg: __('field_required'),
          invalidErrorMsg: __('field_invalid'),
        },
        businessDescription: {
          name: "businessDescription",
          value:"",
          label: __('describe_type_company_products'),
          placeholder:__('enter_text'),
          requiredErrorMsg: __('field_required'),
          invalidErrorMsg: __('field_invalid'),
        },
        nftTypes: {
          name: "nftTypes",
          value:"",
          label: __("what_type_nft_register_?"),
          requiredErrorMsg: __('field_required'),
          invalidErrorMsg: __('field_invalid'),
        },
  
      },
    }
  };
  