import { __ } from '@/helpers/common';
import { Text } from '@chakra-ui/react'

export const ParagraphWithLeading = (({ text, leading } : ParagraphWithLeadingProps) => {
    return (
      <Text>
        <Text as="span" color="primary.100">
          {__(leading)}{" "}
        </Text>
        {__(text)}
      </Text>
    );
})

export interface ParagraphWithLeadingProps {
    text: string;
    leading: string;
}