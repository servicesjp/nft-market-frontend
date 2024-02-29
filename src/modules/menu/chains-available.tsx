import { Text, Box, Image, useDisclosure } from "@chakra-ui/react";
import { AvailableNetworks } from "@/components/modals/available-network";
import { useContext, useState, useEffect } from "react";
import NotSupport from "@/assets/icons/not-support";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { isCorrectNetworWithoutWarning } from "@/modules/utils"
import { CHAINS_IMAGES } from "@/constants/env"
export function ChainsAvailable({scrollY, menuColor, isWhite}: any) {
  const [chainValue, setChainValue] = useState<any>({})
  const {
    isOpen: isChainOpen,
    onOpen: openChain,
    onClose: onChainClose,
  } = useDisclosure();
  const {  chain } = useContext(WalletConnectContext)
  
  useEffect(() => setChainValue(chain), [chain])

  function componentChain(chain: any){
    
    const status = isCorrectNetworWithoutWarning(chain)
    let imageChain: string = ""
    if(status){
      imageChain = CHAINS_IMAGES[chain.id]
    }
    if(imageChain != "") {
      return (<>
        <Text as="span"  color={menuColor? "black" :scrollY>0 || isWhite? " black": "white"}  pl="6px">{chain?.name}</Text>
        <Box py="4px">
          <Image
            w="28px"
            h="28px"
            src={imageChain}
            alt={chain?.name}
          />
        </Box>
        </>)
    } else {
      return (<>
        <Text as="span"  color={menuColor? "black" : scrollY>0 || isWhite ? " black": "white"}  pl="6px">NOT SUPPORT</Text>
          <Box bg="primary.100" p="6px" h="28px" w="28px" opacity="0.7" borderRadius="50%">
          <NotSupport color="white" />
          </Box>

        </>
          
        )
    }
  }
  return (
    <Box cursor="pointer" gap="10px">
      <Box h="36px" {...(menuColor ? {bg:"#EFF0F4"} : scrollY>0 || isWhite ? {bg:"#EFF0F4"}:{ bg:"rgba(255, 255, 255, 0.2)"})}
      borderRadius="18px" onClick={() =>{
        if(chainValue) {
          // console.log('holaaa',{chainValue})
          openChain()
        }
      }
      } cursor="pointer" display="flex" justifyContent="space-between" alignItems="center" px="4px" gap="8px">
        {componentChain(chainValue)}
      </Box>  
      <AvailableNetworks onClose={onChainClose} isOpen={isChainOpen} />
    </Box>
  );
}
