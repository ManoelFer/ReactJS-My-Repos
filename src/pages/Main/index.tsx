import { useState, useCallback } from 'react'

import { FaGithub, FaPlus } from 'react-icons/fa'

import EndpointsGitHub from 'shared/services/gitHubEndpoints/endpoints'

import { Container, Form, SubmitButton } from "./styles"

export const Main = () => {
    const [newRepo, setNewRepo] = useState<string>('')
    const [repositories, setRepositories] = useState<object[]>([])
    const { getDataRepository } = EndpointsGitHub()

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        async function getRepositories() {
            try {
                const { data } = await getDataRepository(newRepo)

                const interestingData = {
                    name: data.full_name
                }

                setRepositories([...repositories, interestingData])
                setNewRepo('')
            } catch (error) {
                console.log('Erro ao encontrar repositório :>> ', error);
                alert('Erro ao encontrar repositório')
            }

            console.log('newRepo :>> ', newRepo);
        }

        getRepositories()
    }, [newRepo, repositories])

    return (
        <Container>
            <h1><FaGithub size={25} /> Meus Repositórios</h1>

            <Form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Adicionar repositórios"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                />

                <SubmitButton>
                    <FaPlus color='#ffff' size={14} />
                </SubmitButton>
            </Form>
        </Container>

    )
}
