import { StyleFunctionProps, defineStyle } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderRadius: "12px", // change the border radius
    borderColor: "#626B93", // change the border color
    borderWidth: "2px",
    _checked: {
      borderColor: "#0026E6",
      background: "white",
      color: "#0026E6",
      _hover: {
        borderColor: "#0026E6",
        background: "white",
        color: "#0026E6",
      },
    },
  },
});
const radioTheme = defineMultiStyleConfig({ baseStyle });
export const theme = {
  colors: {
    brand: {
      50: "#0026E6",
      500: "#0026E6",
      900: "#0026E6",
    },
    background: {
      50: "#0026E6",
      500: "#0026E6",
      900: "#0026E6",
    },
    gradient: "linear-gradient(90deg, #00CFB4 0%, #0047BB 100%)",
    primary: {
      10: "#e5e9fc",
      70: "rgba(0, 14, 84, 0.7)",
      100: "#0047BB",
      200: "#231C35",
      250: "#000A3D",
      300: "rgba(0, 38, 230, 0.5)",
      350: "#0047BB",
      400: "#4766FF",
      500: "#0026E6",
      900: "#D6DDFF",
    },
    secondary: {
      500: "#000E54",
    },
    black: {
      100: "#000000",
    },
    teal: {
      0: '#F8FFFE',
      50: '#DFFAF7',
      100: '#C6F5EF',
      150: '#AEF1E8',
      200: '#95ECE0',
      300: '#63E2D2',
      400: '#32D9C3',
      500: '#00CFB4',
      600: '#00A690',
      700: '#007C6C',
      800: '#005348',
      850: '#003E36',
      900: '#002924',
      950: '#001512',
      1000: '#000000'
    },
    white: {
      75: "rgba(255, 255, 255, 0.75)",
      100: "#ffffff",
      200: "#F3F6F9",
      300: "#878DAD",
    },
    green: {
      100: "#DAF1DF",
      250: "#6BC77C",
      500: "#3E9438",
      750: "#2F6F2A",
      1000: "#1E4A1C",
    },
    red: {
      50: "#F09A99",
      100: "#D9261F",
      200: "#EC746A",
      250: "#F09A99",
      300: "#F3696B",
      400: "#FCEAE9",
      500: "#D9261F",
    },
    warning: {
      100: "#FDF2E9",
      250: "#F7C6A1",
      500: "#ED6625",
      750: "#BD4A0F",
      1000: "#5E2608",
    },
    blue: {
      10: "#F7FAFD",
      100: "#7D8AC8",
      home: "#0026E6",
      home_hover: "#001A9E",
    },
    gray: {
      10: "#F2F6FC",
      50: "#F5F7FA",
      70: "#DDE3EE",
      100: "#999FBB",
      200: "#EEEEF2",
      400: "#626B93",
      500: "#999999",
    },
    border: {
      100: "#7D8AC8",
    },
    weak: {
      100: "rgba(0, 14, 84, 0.4)",
    },
    menu: {
      100: "#626B93",
      200: "#F8F9FC",
    },
    boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.05)",
    dark: {
      100: "#000A3D",
      background: {
        75: "rgba(37, 47, 54, 0.75)",
        100: "#252F36",
        200: "#2E3A47",
        300: "#242E35",
        400: "#1F282D",
      },
      weak: {
        100: "#999FBB",
      },
      border: {
        100: "#242E35",
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: "dark.100",
        fontWeight: 400,
        fontSize: "14px",
        bg: {
          base: mode("white.100", "dark.background.100")(props),
          md: mode("background.100", "dark.background.100")(props),
        },
      },
      a: {
        color: mode("primary.100", "white.100")(props),
      },
      link: {
        color: mode("primary.100", "white.100")(props),
      },
    }),
  },
  breakpoints: {
    sm: "30rem",
    md: "48rem",
    lg: "62rem",
    xl: "80rem",
    "2xl": "96rem",
    "3xl": "125rem",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  typography: {
    h1: {
      mobile: {
        fontSize: "22px",
        lineHeight: "28px",
        fontWeight: "800",
      },
      desktop: {
        fontSize: "72px",
        lineHeight: "80px",
        fontWeight: "700",
      },
    },
  },
  fontSizes: {
    8: "0.5rem",
    10: "0.625rem",
    13: "0.8125rem",
    14: "0.875rem",
    16: "1rem",
    20: "1.25rem",
    22: "1.375rem",
    24: "1.5rem",
    32: "2rem",
    49: "3.0625rem",
    64: "4rem",
    72: "4.5rem",
  },
  fontWeights: {
    300: 300,
    400: 400,
    500: 500,
    700: 700,
  },
  fonts: {
    heading: "Geomanist", 
    body: "Geomanist",
  },
  lineHeights: {
    20: "1.25rem",
    36: "2.25rem",
    44: "2.75rem",
    60: "3.75rem",
    70: "4.374rem",
    80: "5rem",
  },
  space: {
    8: "8px",
    10: "10px",
    12: "12px",
    16: "16px",
    20: "20px",
    24: "24px",
    36: "36px",
    44: "44px",
    56: "56px",
    71: "71px",
    108: "108px",
  },
  components: {
    Breadcrumb: {
      baseStyle: {
        // separator: <Image src="/images/icons/arrow-down.svg" alt="Rigth Arrow" />,
        container: {
          fontSize: "16px",
          color: "gray.350",
          span: {
            fontWeight: "600",
            color: "primary.350",
          },
        },
      },
    },
    DateTimePicker: {
      baseStyle: {
        // Establece los estilos base para el componente
        input: {
          // Estilo del campo de entrada
          bg: "red.100",
          border: "1px solid",
          borderColor: "red.200",
          _hover: {
            borderColor: "red.300",
          },
          _focus: {
            borderColor: "red.500",
          },
        },
        // Puedes agregar más estilos según tus necesidades
      },
    },
    Radio: radioTheme,
    Stepper: {
      baseStyle: {
        indicator: {
          "--stepper-accent-color": "#00FFAA",
        },
        separator: {
          "--stepper-accent-color": "#00FFAA",
        },
        description: {
          fontSize: "14px",
          color: "gray.400",
        },
        title: {
          color: "dark.100",
          fontWeight: "600",
          fontSize: "14px",
        },
      },
    },
    Select: {
      baseStyle: {
        option: {
          _selected: {
            backgroundColor: "red", // Cambia el color de fondo de la opción seleccionada
            color: "white", // Cambia el color del texto de la opción seleccionada
          },
          _focus: {
            backgroundColor: "blue", // Cambia el color de fondo de la opción enfocada
            color: "white", // Cambia el color del texto de la opción enfocada
          },
        },
      },
    },
    Text: {
      baseStyle: {},
    },
    Tag: {
      baseStyle: {
        container: {
          fontSize: "14px",
          px: "16px",
          py: "14px",
          bg: "menu.200",
          color: "primary.200",
          border: "1px",
          borderColor: "#DDE3EE",
        },
      },
    },
    List: {
      variants: {
        menu: definePartsStyle((props) => ({
          container: {
            ".active": {
              color: "primary.100",
              _before: {
                content: '""',
                position: "absolute",
                display: "flex",
                height: "100%",
                w: "4px",
                bg: "primary.100",
                left: 0,
                top: 0,
                borderRadius: "0 2px 2px 0"
              }
            }
          },
          item: {
            position: "relative",
            p: 2,
            px: 6,
            mt: 0,
            cursor: "pointer",
            _hover: {
              color: "primary.100"
            }
          },
          icon: {
            //change color for icon
            // color: mode('blue.500', 'blue.200'),
          },
        }))
      }
    },
    Table: {
      baseStyle: {
        th: {
          fontFamily: "Geomanist",
        },
      },
      variants: {
        crypto: {
          th: {
            padding: "0.5rem 0 !important",
            textAlign: "right",
            "&:first-of-type": {
              textAlign: "left",
            },
            _first: {
              pl: "32px !important",
            },
            _last: {
              pr: "32px !important",
            },
          },
          td: {
            padding: "16px 0 !important",
            textAlign: "right",
            "&:first-of-type": {
              textAlign: "left",
            },
            _first: {
              pl: "32px !important",
            },
            _last: {
              pr: "32px !important",
            },
          },
          tr: {
            borderBottom: "1px solid",
            borderColor: "gray.50",
            _last: {
              borderBottom: "none",
            },
            th: {
              fontWeight: "400",
              fontSize: "16px",
              color: "dark.100 !important",
              pb: "24px !important",
              textTransform: "capitalize",
            },
          },
        },
        trading: {
          th: {
            padding: "0.5rem 0 !important",
            textAlign: "right",
            "&:first-of-type": {
              textAlign: "left",
            },
          },
          td: {
            padding: "0.5rem 0 !important",
            textAlign: "right",
            "&:first-of-type": {
              textAlign: "left",
            },
          },
          tr: {
            th: {
              fontWeight: "400",
              fontSize: "16px",
              pb: "24px !important",
              textTransform: "capitalize",
            },
          },
        },
        simple: {
          tr: {
            th: {
              borderBottom: "1px solid",
              borderColor: "gray.50",
              _last: {
                // borderBottom: "none",
              },
              pt: "24px",
              fontWeight: "400",
              color: "dark.100 !important",
              textTransform: "capitalize",
            },
            td: {
              borderBottom: "1px solid",
              borderColor: "gray.50",
              // _last: {
              //   borderBottom: "none",
              // },
            },

            _hover: {
              td: {
                bg: "gray.10",
              },
            },
          },
        },
      },
    },
    Popover: {
      baseStyle: {
        content: {
          _focusVisible: {
            outline: "none",
            boxShadow: "none",
          },
          /* Reset the styling to allow the content to have invisible padding to help with hovering issues */
          boxShadow: "none",
          borderRadius: 0,
          bg: "none",
          border: "none",
        },
      },
    },
    Link: (props: StyleFunctionProps) => ({
      baseStyle: {
        color: mode("primary.100", "white.100")(props),
        fontSize: "16px",
        fontFamily: "Geomanist",
      },
    }),
    Portal: {
      baseStyle: {
        height: "0px",
      },
    },
    Button: {
      defaultProps: {
        size: "md",
        variant: "solid",
        colorScheme: "primary.100",
        color: "primary.100",
      },
      baseStyle: {
        borderRadius: "4px",
        width: "100%",
        display: "flex",
        fontWeight: "500",
        justifyContent: "center",
      },
      variants: {
        solid: defineStyle((props) => ({
          bg: `${props.colorScheme}`,
          color: "white",
          border: "1px solid",
          borderColor: `${props.colorScheme}`,
          _hover: {
            bg: "white",
            color: `${props.colorScheme}`,
            border: "1px solid",
            borderColor: `${props.colorScheme}`,
          },
        })),

        outline: defineStyle((props) => ({
          bg: "transparent",
          color: `${props.color}`,
          border: "1px solid",
          borderColor: `${props.color}`,
          _hover: {
            bg: `${props.color}`,
            color: "white",
            border: "1px solid",
            borderColor: `${props.color}`,
          },
        })),

        link: defineStyle((props) => ({
          bg: "transparent",
          color: `${props.colorScheme}.100`,
          _hover: {
            color: "primary.100",
            textDecoration: "none",
          },
        })),
      },
      sizes: {
        sm: {
          fontSize: "14px",
          h: "36px",
        },
        md: {
          fontSize: "16px",
          h: "48px",
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "var(--meteor-popup-bg)",
          borderRadius: "4px",
          boxShadow: "0px 1px 8px 0px rgba(136, 136, 136, 0.10)",
          // style: {
          //   "--card-shadow":"0px 1px 8px 0px rgba(136, 136, 136, 0.10)",
          // }
        },
      },
      variants: {
        unstyled: {
          container: {
            boxShadow: "none",
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: "var(--meteor-popup-bg)",
          maxHeight: "calc(100% - 2.5rem)",
          borderRadius: "4px",
        },
      },
    },
    Drawer: {
      baseStyle: {
        dialog: {
          bg: "var(--meteor-popup-bg)",
        },
        overlay: {
          backdropFilter: "blur(2px)",
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: "gray.400",
          _checked: {
            bg: "primary.100",
          },
        },
        thumb: {
          bg: "gray.200",
          _checked: {
            bg: "white.100",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: "gray.400",
          borderWidth: "1px",
          borderRadius: "0.3rem",
          bg: "white.100",
        },
      },
    },
    Accordion: {
      baseStyle: {
        button: {
          padding: 0,
          color: "menu.100",
          _hover: {
            bg: "none",
          },
          _focusVisible: {
            boxShadow: "none",
          },
        },
        container: {
          border: "none",
        },
        panel: {
          paddingTop: "0px",
          p: {
            marginTop: "12px",
            color: "menu.100",
            marginLeft: "24px",
          },
        },
      },
    },
  },
};
