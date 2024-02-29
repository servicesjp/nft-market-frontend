import { createStyles, makeStyles } from '@mui/styles';

const globalStyles = createStyles({
    '@global': {
        '@font-face': {
            fontFamily: 'Geomanist',
            src: `
          local('Geomanist Medium'), 
          local('Geomanist-Medium'),
          url('./fonts/Geomanist-Medium.woff2') format('woff2')
        `,
            fontWeight: 500,
            fontStyle: 'normal',
        },
    },
});

const useStyles = makeStyles({
    ...globalStyles,
    messageContent: {
        '& .cs-message__content': {
            backgroundColor: "white !important",
        }
    },
    inputBox: {
        '& .cs-message-input__content-editor': {
            backgroundColor: "#F8F9FD !important",
        },
        '& .cs-message-input__content-editor-container': {
            backgroundColor: "#F8F9FD !important",
        },
        '& .cs-message-input__content-editor-wrapper': {
            backgroundColor: "#F8F9FD !important",
        },
    },
    searchBox: {
        backgroundColor: "white", border: "solid", borderRadius: 0, borderColor: "#DDE3EE", margin: 20,
        '& .cs-search__input': {
            backgroundColor: "#F8F9FD !important",
        },
    },
    productDetails: {
        "& .productInfo": {
            marginTop: "20px",
            color: "#231C35",
            fontSize: "24px",
            fontFamily: "Geomanist",
            fontWeight: 500,
            lineHeight: "31.68px",
            wordWrap: "break-word"
        },
        "& .productTitle": {
            fontSize: "14px",
        },
        "& .priceTag": {
            marginTop: "20px",
            fontSize: "24px",
        },
        "& .description": {
            marginTop: "20px",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "19.60px",
        }
    },
});

export default useStyles;