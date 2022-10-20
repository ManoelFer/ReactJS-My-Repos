import { useState, useCallback } from 'react'

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

import { toast } from 'react-toastify';

import EndpointsGitHub from 'shared/services/gitHubEndpoints/endpoints'

import { Container, Form, List, RemoveButton, SubmitButton } from "./styles"

interface IRepositoryResponse {
    name: string;
}

export const Main = () => {
    const [newRepo, setNewRepo] = useState<string>('')
    const [repositories, setRepositories] = useState<IRepositoryResponse[]>([])
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
                toast.error(`Repositório não encontrado 😪`)
                // alert('Erro ao encontrar repositório')
            }
        }

        getRepositories()
    }, [newRepo, repositories])

    const handleDelete = useCallback((repoName: string) => {
        const findRepoDifferent = repositories.filter(r => r.name !== repoName)
        setRepositories(findRepoDifferent)
    }, [repositories])

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

            <List>
                {
                    repositories.map((repo, index) => (
                        <li key={index}>
                            <span>
                                <RemoveButton onClick={() => handleDelete(repo.name)}>
                                    <FaTrash size={14} />
                                </RemoveButton>
                                {repo.name}
                            </span>
                            <a href="">
                                <FaBars size={20} />
                            </a>
                        </li>
                    ))
                }
            </List>
        </Container>

    )
}
