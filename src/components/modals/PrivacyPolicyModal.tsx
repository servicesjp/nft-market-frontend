import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStrapiApi } from "@/hooks/useStrapiApi";
import {marked} from 'marked'
export default function PrivacyPolicyModal() {
  const { getTermsAndConditions} = useStrapiApi()
  const showPrivacyPolicyModal: boolean =
    localStorage.getItem("showPrivacyModal") === "false" ? false : true;

  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(showPrivacyPolicyModal);
  const [content,setContent] = useState<any>("")
  const [title,setTitle] = useState<any>("")
  const [loading, setLoading] = useState<boolean>(false)
  const onclose = () => {
    router.push("https://themeteor.io/");
  };

  const onAccept = () => {
    localStorage.setItem("showPrivacyModal", "false");
    setShowModal(false);
  };

  useEffect(()=>{
    async function getTerms() {
      setLoading(true)
      const response:any = await getTermsAndConditions()
      setLoading(false)

      const title = response?.data?.data?.[0]?.attributes?.title
      const htmlString = response?.data?.data?.[0]?.attributes?.content
      const content = marked(htmlString)
      if(title && content) {
        setTitle(title)
        setContent(content)
      }
    }
    if(showPrivacyPolicyModal) getTerms()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Modal
      isOpen={showModal}
      scrollBehavior="inside"
      isCentered
      size={"2xl"}
      closeOnOverlayClick={false}
      onClose={onclose}
    >
      <ModalOverlay bg="black.300" backdropFilter="blur(10px)" />
      <ModalContent p={"14px"}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            loading ? (<Box w={"100%"} textAlign={"center"}>
              <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="primary.100"
              size="xl"
            />
            </Box>) : (<Box dangerouslySetInnerHTML={{ __html: content }} ></Box>)
          }
          
        </ModalBody>
        {
          loading ? (<></>): (<ModalFooter>
            <HStack w={"100%"} spacing={"25px"} my={"10px"}>
              <Button colorScheme="primary" variant="outline" onClick={onclose}>
                Decline
              </Button>
              <Button onClick={onAccept}>
                Accept
              </Button>
            </HStack>
          </ModalFooter>)
        }
        
      </ModalContent>
    </Modal>
  );
}
