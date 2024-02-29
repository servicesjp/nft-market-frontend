/* eslint-disable react/no-unescaped-entities */
// import CardGridCollection from '@/components/cards/card-grid-collection';
import { __ } from '@/helpers/common';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';


// import { MdCheckCircle, MdSettings, MdVerified } from "react-icons/md";

const userData = {
  avatar: 'https://bit.ly/sage-adebayo',
  name: 'Dein',
  fullname: 'Dein Gastgeber: Ole',
  afiliationDate: '2022',
  verify: true,
  evaluations: 140,
  map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15604.800216896452!2d-77.06795844999999!3d-12.0984528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9b2000ee9bb%3A0x3b5f966d80730ff2!2sLima%20Cricket%20%26%20Football%20Club!5e0!3m2!1ses!2spe!4v1691349049262!5m2!1ses!2spe',
  bio: `<p>Our passion for traveling and exploring gave us the opportunity to open our minds and give us another perspective of the world.</p><br>
  <p>The idea of Travel Buddies, is the consequence of our constant contact with travelers from different parts of the world and their need to try new experiences making them be in contact with the local culture and not only with the touristic.</p>`,
  presentationVideo: 'https://www.youtube.com/embed/QhBnZ6NPOY0'
}

const productData = {
  location: "Posted 1 week ago in Lima - Peru",
  title: "Beats Studio3 noise canceling headphones built-in microphone.",
  brand: "Beats",
  rating: {
    score: 4.5,
    count: 175
  },
  price: 252,
  discountPrice: 240.00,
  discount: 5,
  currency: "USDT",
  productDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum ante quis odio tempor, in tincidunt risus sagittis. Proin convallis quam hendrerit nibh mollis, non sagittis odio sodales. Etiam iaculis, leo vitae euismod feugiat, nulla ex gravida odio, eu varius nisl erat nec nibh. Donec nulla ex, lobortis vitae felis aliquet, sagittis egestas urna. Fusce placerat nibh in aliquet feugiat. Vivamus varius, sem a lobortis dignissim, justo ante tincidunt sapien, finibus bibendum urna turpis dictum lorem. Vivamus efficitur velit non egestas rhoncus. In dictum purus in nulla.",
  features: {
    condition: "New(Unused)",
    productColor: {
      color: "#FFFFFF",
      name: "White"
    },
    shipping: "Standard Shipping",
    deliveryPayment: "Seller"
  }
}

const accountInfoSection = (userData: any) => (
  <Card w="100%" mb="24px">
    <CardHeader>
      <Flex>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' mb="24px">
          <Avatar name={userData.fullname} src={userData.avatar} />

          <Box>
            <Heading fontSize='20px'>Meet your host, {userData.name}</Heading>
            <Text fontSize='14px' color="gray">Host at Meteor since {userData.afiliationDate}</Text>
          </Box>
        </Flex>
      </Flex>
    </CardHeader>
    <CardBody>
      <Text fontSize="14px" color="gray.400" dangerouslySetInnerHTML={{ __html: userData.bio }} />
    </CardBody>
  </Card>
);

export default function ProductItemDetailNFT() {
  return (
    <Stack spacing="96px">
      <Flex gap={{ base: "24px", lg: "64px"}} flexDirection={{base: "column", md: "row"}}>
        <Stack flex="1">
          <Image
            borderRadius="4px"
            w='100%'
            objectFit='cover'
            src='https://images.unsplash.com/photo-1690814033781-f369d45a8277?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
            alt='Dan Abramov'
          />

          { accountInfoSection(userData) }

        </Stack>

        <Stack flex="1" spacing="40px">
          <Stack>
            <Text>{ productData.location }</Text>
            <Heading>{ productData.title }</Heading>
            <Text fontWeight="medium">{ productData.brand }</Text>

            <Flex fontSize="12px">
              <Text>{ productData.rating.score }</Text>
              <Text ml="6px">({ productData.rating.count })</Text>
            </Flex>

            <Text fontSize="16px" color="gray.100">Actual Price</Text>
            <Flex fontSize="16px" alignItems="center" gap="8px">
              <Text fontSize="32px" fontWeight="medium" mr="8px">$ {productData.discountPrice} {productData.currency}</Text>
              <Text color="gray.100" as="s">{productData.price} {productData.currency}</Text>
              <Text color="red.100">{productData.discount}% OFF</Text>
            </Flex>
          </Stack>

          <Flex gap="24px" mb="16px">
            <Button onClick={()=> true}>Buy Now</Button>
            {/* <Button w="184px" colorScheme="secondary" variant='outline' >Save</Button> */}
          </Flex>

          <Stack spacing="40px">
            <Stack>
              <Heading as="h3" fontSize="16px">{__('product_description')}</Heading>
              <Text>{productData.productDescription}</Text>
            </ Stack>

            <Stack>
              <Heading as="h3" fontSize="16px">Product condition</Heading>
              <Text>{productData.features.condition}</Text>
            </ Stack>

            <Stack>
              <Heading as="h3" fontSize="16px">Product color</Heading>
              <Text>{productData.features.productColor.name}</Text>
            </ Stack>

            <Stack>
            <Heading as="h3" fontSize="16px">{productData.features.shipping}</Heading>
              <Text>Best for shipping small items in Peru. We will send you a code by email and you will ship the item. Shipping protection   included.</Text>
            </ Stack>

            <Stack>
              <Heading as="h3" fontSize="16px">Who will pay for delivery?</Heading>
              <Text>{productData.features.deliveryPayment}</Text>
            </ Stack>
          </Stack>


        </Stack>
      </Flex>
      <Stack>
        <Heading as="h2">More related products</Heading> 
        <Text>Keep exploring our products at the best prices</Text>
        <Flex>
          {/* <CardGridCollection
            key="merchantProfileCollectiongrip"
            products={mockData as Array<never>}
            cols={{base: 1, sm: 2, md: 4}}
            options={{gap: 12}}
          >
            <ProductViewCard /> 
          </ CardGridCollection> */}
        </Flex>
				<Center mt="40px">
					<Button w="232px">View More</Button>
				</Center>
      </Stack>
    </Stack>
  );
}
