//@ts-ignore
import {createGlobalStyle} from 'styled-components'

type CssProps = {
    background:string,
    text:string
}

export const themE = {
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
        background:${({themE}:{themE:CssProps}) => themE.background};
        color: ${({themE}:{themE:CssProps}) => themE.text};
        transition: all .5s linear;
    }
`