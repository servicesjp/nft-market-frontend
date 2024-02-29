import Modal from '@/components/common/components/modal'
import { Box, HStack, Text, useColorModeValue, useDisclosure, useToken, Button } from '@chakra-ui/react'
import { atom, useSetAtom, useAtomValue } from 'jotai'
import LocaleIcon from './icons/locale-icon'
import { useEffect, useState } from 'react'
import { StorageClass } from '@/services/storage-service'
import { useRouter } from 'next/router'

// This atom is only temporary and should be replaced once locale selection is implemented
const selectedLanguageAtom = atom('en')
type ILang = {
  Id: number;
  Name: string;
  Code: string;
  IsActive: number;
}

export default function LocaleMenuButton({ showCurrentLocale } : { showCurrentLocale?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const setSelectedLanguage = useSetAtom(selectedLanguageAtom)
  const [langs, setLangs] = useState<ILang[]>([]);
    const storage = StorageClass.getInstance();
    const router = useRouter();
    const {push} = useRouter();

  const changeLanguage = async (item: ILang) => {
    setSelectedLanguage(item.Code);
    onClose();
    const currentPath = router.asPath
    console.log(`current path = ` + currentPath)
    await push(currentPath, undefined, {locale: item.Code})
    router.reload()
  }

  useEffect(() => {
      (async () => {
          setLangs(JSON.parse((await storage.get('activelang'))!) ?? [])
      })()

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Box>
    <Modal title={'Select language'} isOpen={isOpen} onClose={onClose} width='medium'>
      <HStack justifyItems='stretch'>
      {langs.map((item:ILang) => (
                    <Button width="100%"
                    key={item.Code}
                    onClick={() => changeLanguage(item)}>{item.Name}</Button>
                ))}
      </HStack>
    </Modal>
    <Box style={{ cursor: "pointer" }} onClick={onOpen}>
      { showCurrentLocale === true ? MenuButtonWithText() : <Icon /> }
    </Box>
  </Box>
}

function Icon({color} : { color?: string} ) {
  return <LocaleIcon color={color} />
}

function MenuButtonWithText() {
  const selectedLanguage = useAtomValue(selectedLanguageAtom)
  const color = useColorModeValue("menu.100", "white.75");
  const [ colorHex ] = useToken('colors', [color])

  return (
    <HStack marginTop="1rem">
      <Icon color={colorHex} />
      <Text paddingLeft="8px" fontFamily="Euclid Regular" color={color}>
        { selectedLanguage.toUpperCase() }
      </Text>
    </HStack>
  );
}