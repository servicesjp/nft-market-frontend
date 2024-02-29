import React from "react";
import { chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export function __styled(
  content: string,
  styledTextColor: string = "linear-gradient(90deg, #00CFB4 0%, #0047BB 100%)",
  gradient: boolean
) {
  const parts = content.split(/(&lt;b&gt;|&lt;\/b&gt;|&lt;br\/&gt;)/);
  let isInBoldTag = false;
  return (
    <>
      {parts.map((part: any, index: any) => {
        if (part === "&lt;b&gt;") {
          isInBoldTag = true;
          return null;
        } else if (part === "&lt;/b&gt;") {
          isInBoldTag = false;
          return null;
        } else if (part === "&lt;br/&gt;") {
          return <br key={index} />;
        } else {
          return isInBoldTag ? (
            gradient ? (
              <chakra.span
                key={index}
                style={{
                  background: styledTextColor,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  display: "inline-block",
                }}
              >
                {part}
              </chakra.span>
            ) : (
              <chakra.span
                key={index}
                display={"inline-block"}
                textColor={styledTextColor}
              >
                {part}
              </chakra.span>
            )
          ) : (
            part
          );
        }
      })}
    </>
  );
}

export function __addToPlaceHolder(
  str: string,
  values: any[],
  textColor?: string // Default color set to black
) {
  const parts = str.split(/(&lt;b=\d+&gt;)/);
  console.log({parts, str, values});
  
  return (
    <>
      {parts.map((part, index) => {
        // Check if the part matches the placeholder pattern
        const match = part.match(/&lt;b=(\d+)&gt;/);

        if (match) {
          // Extract the index from the matched pattern
          const valueIndex = parseInt(match[1]) - 1; // Adjusting index as it starts from 1 in the string

          // Return the value wrapped in a chakra.span with the provided textColor
          return (
            <chakra.span key={index} textColor={textColor}>
              {values[valueIndex]}
            </chakra.span>
          );
        }

        // If the part is not a placeholder pattern, return it as is
        return part;
      })}
    </>
  );
}

export function __appendLinks(str: string, links: string[], newTab?: boolean) {
  const parts = str.split(/(&lt;a a=\d+&gt;|&lt;\/a&gt;)/);
  let isInLinkTag = false;
  let linkIndex = 0;

  return (
    <>
      {parts.map((part, index) => {
        if (/&lt;a a=\d+&gt;/.test(part)) {
          isInLinkTag = true;
          return null;
        } else if (part === "&lt;/a&gt;") {
          isInLinkTag = false;
          linkIndex++; // Increment linkIndex after the closing tag
          return null;
        } else if (isInLinkTag) {
          const currentLink = links[linkIndex];
          return (
            <chakra.span key={index} textColor={"#0047BB"}>
              {currentLink && currentLink !== "/" && currentLink !== "" ? (
                <>
                  <Link
                    style={{ cursor: "pointer" }}
                    target={newTab ? "_self" : "_blank"}
                    as={NextLink}
                    href={
                      currentLink && currentLink !== "/" && currentLink !== ""
                        ? currentLink
                        : "#"
                    }
                  >
                    {part}
                  </Link>
                </>
              ) : (
                <> {part}</>
              )}
            </chakra.span>
          );
        } else {
          return part;
        }
      })}
    </>
  );
}