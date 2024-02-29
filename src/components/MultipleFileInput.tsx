import React, { ChangeEvent, useEffect, useState } from "react";
import { useField } from "formik";
import { FormLabel, Input, Image, Box, Grid, GridItem } from "@chakra-ui/react";
import { showErrorToast } from "./toast";
import { __ } from "@/helpers/common";

interface MultipleFileInputProps {
  formField: any;
  id?: string;
  updateFiles?: any;
}

const MultipleFileInput: React.FC<MultipleFileInputProps> = ({ formField }) => {
  const [field, meta, helpers] = useField<File[]>(formField.name);
  const [imageUrls, setImageUrls] = useState<string[]>([]);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (field.value.length >= formField.maxPhotos)
      return alert(`You can only upload ${formField.maxPhotos} images`);
    const files = Array.from(event.target.files || []);
    if (files[0]) {
      const fileName = files[0].name.toLowerCase();
      const fileExtension = fileName.split(".").pop(); // Get the file extension
      if (formField.supportedFileTypes.includes(fileExtension)) {
        helpers.setValue(field.value.concat(files));
        updateImageUrls(field.value.concat(files));
      } else {
        showErrorToast(
          __('selected_file_not_supported')
        );
        event.target.value = "";
      }
    }
  };

  const handleFileUpdate = (event: any) => {
    const inputElem = event.target;
    const fileIndex = parseInt(inputElem.getAttribute("data-index"));
    const files = Array.from(event.target.files || []) as File[];
    if (files[0]) {
      const fileName = files[0].name.toLowerCase();
      const fileExtension = fileName.split(".").pop();
      if (formField.supportedFileTypes.includes(fileExtension)) {
        field.value[fileIndex] = files[0] as File;
        helpers.setValue(field.value);
        updateImageUrls(field.value);
      } else {
        showErrorToast(
          __('selected_file_not_supported')
        );
        event.target.value = "";
      }
    }
  };

  const updateImageUrls = (newFiles: File[]) => {
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => {
      // Cleanup old URLs
      prevUrls.forEach((url) => URL.revokeObjectURL(url));
      return newUrls;
    });
  };

  useEffect(() => {
    updateImageUrls(field.value);
  }, [field.value]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    existingIndex?: number
  ) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);
    if (existingIndex !== undefined) {
      // Drop occurred on an existing file container
      handleDroppedFiles(files, existingIndex);
    } else {
      // Drop occurred on the "Upload Photo" container
      handleDroppedFiles(files);
    }
  };

  const handleDroppedFiles = (files: File[], index?: number) => {
    if (index === undefined && field.value.length >= formField.maxPhotos) {
      return alert(`You can only upload ${formField.maxPhotos} images`);
    }

    const fileName = files[0].name.toLowerCase();
    const fileExtension = fileName.split(".").pop();

    if (index !== undefined) {
      // Drop occurred on an existing file container
      const updatedFiles = [...field.value];
      const existingFile = updatedFiles[index];

      if (existingFile) {
        const existingFileName = existingFile.name.toLowerCase();
        const existingFileExtension = existingFileName.split(".").pop();

        if (formField.supportedFileTypes.includes(existingFileExtension)) {
          // Update the existing file
          updatedFiles[index] = files[0] as File;
          helpers.setValue(updatedFiles);
          updateImageUrls(updatedFiles);
        } else {
          showErrorToast(__("selected_file_not_supported"));
        }
      }
    } else {
      // Drop occurred on the "Upload Photo" container
      if (formField.supportedFileTypes.includes(fileExtension)) {
        helpers.setValue([...field.value, ...files]);
        updateImageUrls([...field.value, ...files]);
      } else {
        showErrorToast(__("selected_file_not_supported"));
      }
    }
  };

  return (
    <Grid gridTemplateColumns={"1fr 1fr "} gap={"10px"}>
      {imageUrls.map((url, index) => (
        <FormLabel
          m={0}
          key={"image-" + field.value[index].name + index}
          htmlFor={`input-${formField.name}-${index}`}
        >
          <Box
            data-index={index}
            key={"image-" + field.value[index].name + index}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
            h={"200px"}
            cursor={"pointer"}
            fontWeight="400"
            borderRadius={"4px"}
            color="gray.400"
            display="flex"
            flexDirection="column"
            textAlign={"center"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"center"}
            backgroundSize={"cover"}
            backgroundImage={url}
          />
          <Input
            id={`input-${formField.name}-${index}`}
            display={"none"}
            type="file"
            data-index={index}
            onChange={(event: any) => handleFileUpdate(event)}
          />
        </FormLabel>
      ))}
      <GridItem
        colSpan={field.value.length % 2 === 0 ? 2 : 1}
        display={field.value.length >= formField.maxPhotos ? "none" : "auto"}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FormLabel m={0} htmlFor={formField.name}>
          <GridItem
            h={"200px"}
            className="cross"
            cursor={"pointer"}
            fontWeight="400"
            borderRadius={"4px"}
            color="gray.400"
            display="flex"
            flexDirection="column"
            textAlign={"center"}
            backgroundSize={"cover"}
          >
            <Image src={formField.icon} alt="upload photo" mx={"auto"} />
            {__("upload_photo")}
          </GridItem>
          <Input
            id={formField.name}
            display={"none"}
            type="file"
            onChange={(event: any) => handleFileChange(event)}
          />
        </FormLabel>
      </GridItem>
    </Grid>
  );
};

export default MultipleFileInput;
