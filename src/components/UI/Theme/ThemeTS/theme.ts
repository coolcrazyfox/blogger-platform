//@ts-ignore
import {createGlobalStyle} from 'styled-components'

type CssProps = {
    background:string
    text:string
}

export const theme = {
    day:{
        background:'#fffff',
        text:'white',
    },
    night: {
        background:'#15202b',
        text:'#F7F9F9',
    }
}
export const GlobalStyle = createGlobalStyle`
    body{
        background:${({theme}:{theme:CssProps}) => theme.background};
        color: ${({theme}:{theme:CssProps}) => theme.text};
        transition: all .5s linear;
    }
`