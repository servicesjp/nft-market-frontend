import { Text } from "@chakra-ui/react"

export const PageTitle = (({ children, highlight } : PageTitleProps) => {
    
    // make sure we have 3 parts, just to make it easy
    let parts = []
    if (children.startsWith(highlight)) {
        parts = [ '', highlight, children.split(highlight) ]
    } else {
        parts = [ children.split(highlight), highlight ]
        if (parts.length == 2) {
            parts.push('')
        }
    }
    
    return (<Text color="primary.200"
        fontSize={{ base: 36, sm: 48, md: 72 }}
        lineHeight={{ base: 44, md: 70 }}
        fontWeight={500}
        marginBottom={'32px'}
        textAlign={'left'}>{ parts[0]} <Text as="span" color='primary.100'>{ parts[1] }</Text>{ parts[2] }</Text>)
})


export interface PageTitleProps {
    highlight: string;
    children: string;
}