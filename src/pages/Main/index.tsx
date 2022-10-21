import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';
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

    useEffect(() => {
        const repoStorage = localStorage.getItem('repositories')

        if (repoStorage) {
            setRepositories(JSON.parse(repoStorage))
        }
    }, [])

    useEffect(() => {
        if (repositories.length > 0) localStorage.setItem('repositories', JSON.stringify(repositories))
    }, [repositories])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        async function getRepositories() {
            setLoading(true)

            /**Validações manuais ================================ */
            if (!newRepo) {
                setLoading(false)
                toast.warning(`Por favor digite o nome de um repositório 🫡`)
                throw new Error('Você precisa indicar um repositório!')
            }

            const hasRepo = repositories.find(repo => repo.name === newRepo)
            if (hasRepo) {
                setLoading(false)
                toast.warning(`Repositório Duplicado! 😯`)
                throw new Error('Repositório Duplicado!')
            }
            /**Validações manuais ================================ */

            try {
                const { data } = await getDataRepository(newRepo)

                const interestingData = {
                    name: data.full_name
                }

                setRepositories([...repositories, interestingData])
                setNewRepo('')
            } catch (error) {
                console.log('Erro ao encontrar repositório :>> ', error);
                toast.error(`Repositório não encontrado 😪`)
            } finally {
                setLoading(false)
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
                            <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={20} />
                            </Link>
                        </li>
                    ))
                }
            </List>
        </Container>

    )
}
