import { Text, TextProps } from "@chakra-ui/react";

interface TextHighlightProps {
  highlightProps: TextProps;
  textProps: TextProps;
  children: string;
  highlight: string;
}


export default function TextHighlight(props: TextHighlightProps) {
  const { children, highlight, textProps, highlightProps } = props;
  const parts = children.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <Text display={"inline-block"} {...textProps}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text as={"span"} {...highlightProps} key={index}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
}
