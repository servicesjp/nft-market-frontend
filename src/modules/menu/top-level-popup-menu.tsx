import { PlacementWithLogical, Popover, PopoverContent, PopoverTrigger, VStack, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

export default function TopLevelPopupMenu({ children, trigger } : { children: React.ReactNode, trigger: React.ReactNode }) {
  // placement and offset depends on vertical or horizontal menu
  const placement = useBreakpointValue<PlacementWithLogical>({ base: 'right-start', xl: 'bottom-start' }, { fallback: 'xl' });

  return (
    <Popover
      trigger='hover'
      placement={placement}
      offset={ [ -12, 0 ]}
      openDelay={0}
      returnFocusOnClose={true}
      flip={false}
    >
      <PopoverTrigger>
        { trigger }
      </PopoverTrigger>
        <PopoverContent
          /* The paddings here are used instead of gutter to avoid issues with losing focus on hovering */
          paddingX={ { base: '3rem', xl: '1rem' } }
          paddingY={ { base: '0', xl: '1.5rem' } }
        >
          <VStack width='280px' className="popover-content" alignItems="start">{ children }</VStack>
        </PopoverContent>
    </Popover>
  );
}