import { useDisclosure } from '@chakra-ui/react';
import BaseModal from '../modules/modals/BaseModal';

export const useModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return {
        isOpen,
        openModal: onOpen,
        closeModal: onClose,
        BaseModal: ({ children }: { children: React.ReactNode }) => (


            <BaseModal isOpen={isOpen} onClose={onClose}>
                {children}
            </BaseModal>
        ),
    };
};