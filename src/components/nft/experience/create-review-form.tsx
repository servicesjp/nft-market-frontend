import StarRating from "@/components/stars-rating";
import { showErrorToast, showSuccessToast } from "@/components/toast";
import { __ } from "@/helpers/common";
import { useProductsApi } from "@/hooks/useApi";
import { ExperienceReview } from "@/types/CreateReview";
import { Button, Flex, FormControl, FormErrorMessage, HStack, Textarea } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { Field, Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

function CreateReviewForm({ product, onClose }: { product: any; onClose: () => void }) {
  const router = useRouter();
  const { createReview } = useProductsApi();

  const formFields = {
    description: {
      name: "description",
      initialValue: "",
      label: __("description"),
      placeholder: __("description"),
    },
    rate: {
      name: "rate",
      initialValue: 0,
      label: __("rate_experience"),
    },
  };

  const validationSchema = Yup.object().shape({
    [formFields.description.name]: Yup.string().required(),
    [formFields.rate.name]: Yup.number()
      .required()
      .min(1, "Rate is required field"),
  });

  const formik = useFormik({
    initialValues: {
      [formFields.description.name]: formFields.description.initialValue,
      [formFields.rate.name]: formFields.rate.initialValue,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  async function handleSubmit(values: any) {
    try {
      const reviewData: ExperienceReview = {
        rate: values?.rate,
        description: values?.description,
        title: values?.title,
        experienceId: product?.experience?.id,
      };

      console.log(reviewData);
      const response = await createReview(reviewData);

      if (response.status == HttpStatusCode.Ok) {
        showSuccessToast(__("operation_saved_successfully"));
        onClose();
      } else {
        throw Error(__("operation_not_saved"));
      }
    } catch (error) {
      if (error instanceof Error) showErrorToast(error.message);
      console.log(error);
    }
  }

  return (
    <Formik
      initialValues={formik.initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDir={"column"} gap={"24px"}>
            <Field name={formFields.description.name}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    !!form.errors?.[formFields.description.name] &&
                    !!form.touched?.[formFields.description.name]
                  }
                >
                  <Flex
                    w={"100%"}
                    flexDir={"column"}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                  >
                    <Textarea
                      {...field}
                      id={formFields.description.name}
                      placeholder={formFields.description.placeholder}
                    />
                  </Flex>

                  <FormErrorMessage>
                    {form.errors?.[formFields.description.name]}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name={formFields.rate.name}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    !!form.errors?.[formFields.rate.name] &&
                    !!form.touched?.[formFields.rate.name]
                  }
                >
                  <Flex
                    w={"100%"}
                    flexDir={"column"}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                  >
                    <StarRating
                      boxSize={"28px"}
                      stackProps={{
                        w: "100%",
                        justify: "space-between",
                        p: { base: "14px 24px", md: "24px 24px" },
                        borderRadius: "4px",
                        border: "1px solid #E6E6E6",
                      }}
                      initialRating={formFields.rate.initialValue}
                      onRate={(selectedRating: number) => {
                        form?.setFieldValue(
                          formFields.rate.name,
                          selectedRating
                        );
                      }}
                    />
                  </Flex>

                  <FormErrorMessage>
                    {form.errors?.[formFields.rate.name]}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Flex>
          <HStack gap={{ base: "8px", md: "24px" }} mt={"40px"}>
            <Button
              w="100%"
              mb="8px"
              variant={"outline"}
              borderRadius={4}
              onClick={onClose}
            >
              {__("cancel")}
            </Button>
            <Button
              w="100%"
              mb="8px"
              borderRadius={4}
              type="submit"
              isLoading={isSubmitting}
            >
              {__("submit")}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}

export default CreateReviewForm;
