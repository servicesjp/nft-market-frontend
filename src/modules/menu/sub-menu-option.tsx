
import { HStack, Text, useColorModeValue, VStack, forwardRef } from '@chakra-ui/react';
import styles from './sub-menu-option.module.css';
import { __ } from '@/helpers/common';

// forward ref is required for chakra-ui popover hovering to work
const SubMenuOption = forwardRef<SubMenuOptionProps, 'div'>(({ icon, onClick, text, subtitle, className, leftElement, children, ...rest }: SubMenuOptionProps, ref) => {
    const subTitleColor = useColorModeValue('primary.70', 'white.75')

    return <HStack ref={ref} {...rest} width='100%' className={`${styles.subMenuOption} ${className}`} p='4px 12px' onClick={onClick}>
        {leftElement}
        <VStack width='100%' gap='4px' alignItems='start'>
            <HStack justifyContent='space-between' width="100%">
                {text && <Text as="span">{__(text)}</Text>}
                {children}
                {icon}
            </HStack>
            {subtitle && <Text as="span" style={{ margin: 0 }} color={subTitleColor} size='0.875rem'>{__(subtitle)}</Text>}
        </VStack>
    </HStack>
});

export default SubMenuOption;

interface SubMenuOptionProps {
    leftElement?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    text?: string;
    subtitle?: string;
    className?: string;
    children?: any;
    ref?: any;
}