import { useState, useCallback } from 'react'

import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa'

import EndpointsGitHub from 'shared/services/gitHubEndpoints/endpoints'

import { Container, Form, SubmitButton } from "./styles"

export const Main = () => {
    const [newRepo, setNewRepo] = useState<string>('')
    const [repositories, setRepositories] = useState<object[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { getDataRepository } = EndpointsGitHub()

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        async function getRepositories() {
            setLoading(true)
            try {
                const { data } = await getDataRepository(newRepo)

                const interestingData = {
                    name: data.full_name
                }

                setRepositories([...repositories, interestingData])
                setNewRepo('')
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log('Erro ao encontrar repositório :>> ', error);
                // alert('Erro ao encontrar repositório')
            }
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

                <SubmitButton loading={loading}>
                    {
                        loading ?
                            <FaSpinner color='#ffff' size={14} />
                            :
                            <FaPlus color='#ffff' size={14} />
                    }

                </SubmitButton>
            </Form>
        </Container>

    )
}
