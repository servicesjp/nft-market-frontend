import CreateNFTLayout from "@/components/create-nft/CreateNFTLayout";
import ProductNFTForm from "@/components/create-nft/product-nft-form/product-nft-form";
import { Box, Image, Text, useTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function CreateRegularNFT() {
  const router = useRouter();
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;

  const handleSubmit = async ({ email, password }: { email: string, password: string }) => {
    
  }

  const TextDecorator = () => {
    return (
      <>
        <Text
          w={"70%"}
          fontSize={"40px"}
          fontWeight={"500"}
          lineHeight={"120%"}
          textAlign={"center"}
        >
          The{" "}
          
          <Text as={"span"} bgGradient={gradientColor} bgClip="text">
            future
          </Text>{" "}
          
          of responsible{' '}
          
          <Text as={"span"} bgGradient={gradientColor} bgClip="text">
            consumption
          </Text>
        </Text>
        <Text
          w={"70%"}
          fontSize={"14px"}
          fontWeight={"400"}
          lineHeight={"140%"}
          textAlign={"center"}
          >
            Sustainability in every purchase: exploring the future of second-hand consumption
        </Text>
      </>
    )
  }
    
  const ImageDecorator = () => {
    return <Image
      src={"/nft/product-nft-img.png"}
      alt={"Product NFT Image Decorator"}
    />
  }

  return (
    <CreateNFTLayout 
      imageDecorator={ImageDecorator()}
      titleDecorator={TextDecorator()}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        w={"100%"}
        h={'100%'}
      >
        <ProductNFTForm></ProductNFTForm>
      </Box>
    </CreateNFTLayout>
  );
}
