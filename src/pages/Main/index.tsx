import { Link } from 'react-router-dom';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

import useMainHook from './useMain'

import { Container, Form, List, RemoveButton, SubmitButton } from "./styles"

export const Main = () => {
    const { handleSubmit, newRepo, setNewRepo, loading, repositories, handleDelete } = useMainHook()

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
