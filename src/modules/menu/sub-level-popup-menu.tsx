import { Popover, PopoverContent, PopoverTrigger, VStack } from "@chakra-ui/react";
import React from "react";

export default function SubLevelPopupMenu({ children, trigger } : { children: React.ReactNode, trigger: React.ReactNode }) {
  return (
    <Popover
      trigger='hover'
      placement='right-start'
      offset={ [ -10, 0 ] }
      openDelay={0}
      returnFocusOnClose={true}
    >
      <PopoverTrigger>
        { trigger }
      </PopoverTrigger>
        <PopoverContent
        /* Using padding instead of gutter to avoid hovering issues */
        paddingX='1.5rem'>
          <VStack width='200px' className="popover-content" alignItems="start">{ children }</VStack>
        </PopoverContent>
    </Popover>
  );
}