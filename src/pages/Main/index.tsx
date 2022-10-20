import { FaGithub, FaPlus } from 'react-icons/fa'

import { Container, Form, SubmitButton } from "./styles"

export const Main = () => {
    return (
        <Container>
            <h1><FaGithub size={25} /> <span>Meus Repositórios</span></h1>

            <Form>
                <input type="text" placeholder="Adicionar repositórios" />

                <SubmitButton>
                    <FaPlus color='#ffff' size={14} />
                </SubmitButton>
            </Form>
        </Container>

    )
}
