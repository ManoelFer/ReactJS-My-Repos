import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Loading = styled.div`
    color: ${({ theme }) => theme.colors.loadingColor};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const Container = styled.div`
    max-width: 700px;
    background-color: ${({ theme }) => theme.colors.cardColor};
    border-radius: 4px;
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.colorShadow};
    padding: 30px;
    margin: 180px auto;
`

export const OwnerContainer = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1 {
        font-size: 30px;
        color: ${({ theme }) => theme.colors.titleH1Color}
    }

    p {
        margin-top: 5px;
        font-size: 1vh;
        color: ${({ theme }) => theme.colors.lettersColor};
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`