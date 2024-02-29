import { __ } from "@/helpers/common";
import {
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

export default function Modal({ isOpen, onClose, title, children, size, width }: ModalProps) {
    return <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        blockScrollOnMount={false}
        size={size}
    >
        <ModalOverlay />
        <ModalContent >
            <ModalHeader fontSize="21px">{ __(title) }</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                { children }
            </ModalBody>
        </ModalContent>
    </ChakraModal>
}

export function asModal(children: React.ReactNode, title: string, props: ModalControlProps) {
    return <Modal {...props} title={title}>{ children }</Modal>
}

export interface ModalControlProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ModalProps extends ModalControlProps {
    title: string;
    children: React.ReactNode;
    size?:  'xs' | 'lg' | "xl"
    width?: 'small' | 'medium' | "full"
}