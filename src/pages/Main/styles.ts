import styled, { keyframes, css } from 'styled-components'

export const Container = styled.div`
    max-width: 700px;
    background-color: ${({ theme }) => theme.colors.cardColor};
    margin: 180px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.colorShadow};

    h1 {
        font-size: 20px;
        display: flex;
        align-items: center;

        svg {
            margin-right: 10px;
        }
    }
`

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${({ theme }) => theme.colors.borderInputColor};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`

interface IButton {
    loading: boolean;
}

/*ANIMAÇÃO DE LOADING UTILIZANDO O KEYFRAMES DO STYLED-COMPONENTS
o valor é da onde surge até onde vai
*/
const animatedSpinner = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`

export const SubmitButton = styled.button.attrs<IButton>(
    ({ loading }) => ({
        disabled: loading,
        type: "submit"
    })
) <IButton>`
    background-color: #0D2636;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${({ loading }) => loading && css`
        svg{
            animation: ${animatedSpinner} 2s linear infinite;
        }
    `}
`


export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content:space-between;
        padding: 15px 0;

        & + li {
            border-top: 1px solid #eee;
        }

        a{
            color: #0D2636;
            text-decoration: none;
        }
    }
`

export const RemoveButton = styled.button.attrs({
    type: 'button',
})`

    background-color: transparent;
    color: #0D2636;
    border: 0;

    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`