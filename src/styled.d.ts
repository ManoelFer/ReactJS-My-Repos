import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            backgroundColor: string,
            lettersColor: string,
            cardColor: string,
            loadingColor: string,
            colorShadow: string,
            titleH1Color: string,
            borderInputColor: string;
            colorTextInsideBodyInputButton: string;
            borderIssueColor: string;
            hoverLink: string;
        },
        fonts: string[],
        fontSizes: {
            small: string,
            medium: string,
            large: string
        }
    }
}
