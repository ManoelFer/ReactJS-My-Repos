import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa'

import EndpointsGitHub from 'shared/services/gitHubEndpoints/endpoints';

import { filters, IFilterList } from 'shared/constants';

import { IIssueInfos, IRepositoryInfos } from 'shared/interfaces';

import { Container, OwnerContainer, Loading, BackButton, IssuesList, PageActions, FilterList } from "./styles";


export const Repository = () => {
    let { repository_full_name } = useParams();

    const [repository, setRepository] = useState<IRepositoryInfos>();
    const [issues, setIssues] = useState<IIssueInfos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [filterSelected, setFilterSelected] = useState<number>(0);

    const { getDataRepository, getDataRepositoryIssues } = EndpointsGitHub()

    useEffect(() => {
        async function loadInfos() {
            const [dataRepo, dataRepoIssues] = await Promise.all([
                getDataRepository(repository_full_name || ''),
                //@ts-ignore
                getDataRepositoryIssues(repository_full_name || '', page, filters.find(f => f.active).state)
            ])

            setRepository(dataRepo.data)
            setIssues(dataRepoIssues.data)
            setLoading(false)
        }

        loadInfos()
    }, [repository_full_name, page])

    useEffect(() => {
        async function updateIssues() {
            //@ts-ignore
            const { data } = await getDataRepositoryIssues(repository_full_name || '', page, filters[filterSelected].state)
            setIssues(data)
        }

        updateIssues()
    }, [page, filterSelected])

    const handlePage = (to: string) => {
        setPage(to === "back" ? page - 1 : page + 1)
    }

    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color='#000' size={35} />
            </BackButton>
            <OwnerContainer>
                <img src={repository?.owner.avatar_url} alt={repository?.owner.login} />
                <h1>{repository?.name}</h1>
                <p>{repository?.description}</p>
            </OwnerContainer>

            <FilterList active={filterSelected}>
                {filters.map((filter: IFilterList, index) => (
                    <button
                        type='button'
                        key={filter.label}
                        onClick={() => setFilterSelected(index)}
                    >
                        {filter.label}
                    </button>
                ))}
            </FilterList>
            <IssuesList>
                {
                    issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />

                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {
                                        issue.labels.map(label => (
                                            <span key={String(label.id)}>{label.name}</span>
                                        ))
                                    }
                                </strong>

                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))
                }
            </IssuesList>
            <PageActions>
                <button
                    type="button"
                    onClick={() => handlePage("back")}
                    disabled={page < 2}
                >
                    Voltar
                </button>
                <button
                    type="button"
                    onClick={() => handlePage("next")}
                >
                    Próxima
                </button>
            </PageActions>
        </Container>
    )
}
