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

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderIssueColor};
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;

        & + li {
            margin-top: 12px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid ${({ theme }) => theme.colors.backgroundColor};
        }

        div {
            flex: 1;
            margin-left: 12px;

            p {
                margin-top: 10px;
                margin-top:12px;
                color: ${({ theme }) => theme.colors.lettersColor};
            }
        }

        strong {
            font-size: 15px;

            a{
                text-decoration: none;
                color: ${({ theme }) => theme.colors.colorTextInsideBodyInputButton};

                &:hover{
                    color: ${({ theme }) => theme.colors.hoverLink};
                }
            }

            span {
                background-color: ${({ theme }) => theme.colors.colorTextInsideBodyInputButton};
                color: ${({ theme }) => theme.colors.cardColor};
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                padding: 5px 7px;
                margin-left: 10px;
            }
        }
    }
`

export const PageActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        outline: 0;
        border: 0;
        background-color: ${({ theme }) => theme.colors.colorTextInsideBodyInputButton};
        color: ${({ theme }) => theme.colors.cardColor};
        padding: 5px 10px;
        border-radius: 4px;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`

interface IFilterListStyled {
    active: number;
}

export const FilterList = styled.div<IFilterListStyled>`
    margin: 15px 0;

    button {
        outline: 0;
        border: 0;
        padding: 8px;
        border-radius: 4px;
        margin: 0 3px;

        //TODO: Fazer estilizações com base na posição de um item, dentro de um arra
        &:nth-child(${props => props.active + 1}){
            background-color: ${({ theme }) => theme.colors.hoverLink};
            color: ${({ theme }) => theme.colors.cardColor};
        }
    }
`
