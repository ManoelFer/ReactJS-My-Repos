import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa'

import EndpointsGitHub from 'shared/services/gitHubEndpoints/endpoints';

import { Container, OwnerContainer, Loading, BackButton, IssuesList } from "./styles";

interface IRepositoryInfos {
    owner: {
        avatar_url: string;
        login: string;
    };
    name: string;
    description: string;
}

interface ILabelInfo {
    id: number;
    name: string;
}

interface IIssueInfos {
    id: number;
    html_url: string;
    title: string;
    user: {
        avatar_url: string;
        login: string;
    };
    labels: ILabelInfo[]
}



export const Repository = () => {
    let { repository_full_name } = useParams();

    const [repository, setRepository] = useState<IRepositoryInfos>();
    const [issues, setIssues] = useState<IIssueInfos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { getDataRepository, getDataRepositoryIssues } = EndpointsGitHub()

    useEffect(() => {
        async function loadInfos() {
            const [dataRepo, dataRepoIssues] = await Promise.all([
                getDataRepository(repository_full_name || ''),
                getDataRepositoryIssues(repository_full_name || '')
            ])

            setRepository(dataRepo.data)
            setIssues(dataRepoIssues.data)
            setLoading(false)
        }

        loadInfos()
    }, [repository_full_name])


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
        </Container>
    )
}
