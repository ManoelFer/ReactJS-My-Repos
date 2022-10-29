import { useState, useCallback, useEffect } from 'react'

import { toast } from 'react-toastify';

import EndpointsGitHub from 'shared/services/gitHubEndpoints/endpoints'

import { IRepositoryInfos } from 'shared/interfaces';
import { IUseMainHook } from './interfaces';


//TODO:Arquivo que contêm a lógica separada da interface do usuário
const useMainHook = (): IUseMainHook => {

    const [newRepo, setNewRepo] = useState<string>('')
    const [repositories, setRepositories] = useState<IRepositoryInfos[]>([])
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
                    owner: {
                        avatar_url: "",
                        login: "",
                    },
                    name: data.full_name,
                    description: "",
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

    return {
        handleSubmit,
        newRepo,
        setNewRepo,
        loading,
        repositories,
        handleDelete
    }
}

export default useMainHook;