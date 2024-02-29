import {
  BoxProps,
  HStack,
} from "@chakra-ui/react";
import styles from "./switchable.module.css";
import React, { useEffect, useRef, useState } from 'react';
import SwitchableIndicator from "./switchable-indicator";

interface SwitchableProps extends BoxProps{
  children: React.ReactNode;
  selected: number | string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "block" | "rounded" | "rounded-color"
  itemStyle? : any
}

function Switchable({children, selected, onChange=()=>{},bg="gray.10", itemStyle, ...props}: SwitchableProps) {
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const [indicatorPosition, setIndicatorPosition] = useState<number>(0);


  let switchableIndicator: React.ReactElement | null = null;
  const otherChildren: React.ReactElement[] = [];
  const indicatorPropsRef = useRef<{ [key: string]: any } | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedItemRef = useRef<HTMLElement | null>(null);

  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (child.type === SwitchableIndicator) {
        switchableIndicator = child
        indicatorPropsRef.current = child.props
      } else {
        const childProps = {
          ...itemStyle,
          ...(selected === child.props.value ? indicatorPropsRef.current || {} : {}),
          key: child.props.value,
          value: child.props.value,
          selectItem: selected,
          bg: "transparent",
          boxShadow: "transparent",
          // color: selected === child.props.value ? indicatorColor.current : undefined,
          zIndex: "1",
          onSetSelectItem: ({ref}: {ref: React.RefObject<HTMLElement>}) => {
            selectedItemRef.current = ref.current;  // Guardar la referencia del elemento seleccionado
            const rect = ref.current!.getBoundingClientRect();
            const containerRect = containerRef.current!.getBoundingClientRect();
            
            const relativePosition = (rect.left + containerRef.current!.scrollLeft) - containerRect.x;
          
            setIndicatorWidth(rect.width);
            setIndicatorPosition(relativePosition);
            onChange(child.props.value);
          },
        };
        otherChildren.push(React.cloneElement(child, childProps));
      }
    }
  });

  if (!switchableIndicator) {
    switchableIndicator = <SwitchableIndicator color="white"/>;
    indicatorPropsRef.current = switchableIndicator.props;
  }
  
  useEffect(() => {
    const handleScroll = () => {
      if (selectedItemRef.current && containerRef.current) {
        const rect = selectedItemRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
  
        const relativePosition = (rect.left + containerRef.current!.scrollLeft) - containerRect.x;
  
        setIndicatorPosition(relativePosition);
      }
    };
  
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <HStack
      ref={containerRef}
      className={styles.switchable} 
      textAlign="center"
      bg={bg}
      p="4px"
      borderRadius="4px"
      width="100%"
      position="relative"
      overflow="scroll"
      {...props}
    >
      <HStack {...props}>
        {otherChildren}
      </HStack>
      {
       React.cloneElement(switchableIndicator, {
          style: {
            width: indicatorWidth,
            transform: `translateX(${indicatorPosition}px)`,
          },
        })
      }
    </HStack>
  );
}

export default Switchable;
