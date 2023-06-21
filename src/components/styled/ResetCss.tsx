import { createGlobalStyle } from "styled-components";

export const ResetCss = createGlobalStyle`
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Open sans", sans-serif;
}

body {
    background: #F3F5F7;
}

a { text-decoration: none}
`;
