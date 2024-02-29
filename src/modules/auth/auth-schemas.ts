import { __ } from "@/helpers/common";
import * as Yup from "yup";

export const passwordValidationMessages = () => ({
  required: __("password_required") + ".",
  mininumDigits: __("password_must_have_at_least_eight_characters") + ".",
  digitOrSpecialCharacter: __("password_must_have_at_least_one_number") + ".",
  lowerAndUppercase: __("password_lower_and_upper_case") + ".",
});

export const currentPasswordSchema = () => {
  return Yup.string().required(__("current_password_required")).nullable();
};

export const passwordSchema = () => {
  const messages = passwordValidationMessages();
  return Yup.string()
    .required(messages.required)
    .min(8, messages.mininumDigits)
    .matches(/[0-9#?!@$%^&*-]/, { message: messages.digitOrSpecialCharacter })
    .matches(/[a-z]/, { message: messages.lowerAndUppercase })
    .matches(/[A-Z]/, { message: messages.lowerAndUppercase })
    .nullable();
};

export const passwordConfirmationSchema = () => {
  return Yup.string()
    .oneOf([Yup.ref("password"), ""], __("password_must_match"))
    .required(__("password_confirmation_required"));
};

export const emailSchema = () => {
  return Yup.string()
    .trim()
    .required(__("email_required"))
    .email(__("email_address_must_be_valid"))
    .max(64, __("email_address_too_long"))
    .nullable();
};

export const phoneNumberSchema = () => {
  return Yup.string()
    .trim()
    .required(__("phone_number_required"))
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      __("phone_number_must_be_valid")
    )
    .nullable();
};

export const termsOfServiceSchema = () => {
  return Yup.boolean()
    .required()
    .oneOf([true], __("you_must_accept_terms_and_conditions"));
};

export const oneTimePasswordSchema = () => {
  return Yup.string()
    .matches(/[0-9]{6}/, __("must_be_six_digits"))
    .required(__("one_time_password_required"))
    .nullable();
};

export const passwordRequiredSchema = () => {
  return Yup.string().required(__("password_required"));
};
