import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import EndpointsGitHub from 'shared/services/gitHubEndpoints/endpoints';
import { Container } from "./styles";

export const Repository = () => {
    let { repository_full_name } = useParams();

    const [repository, setRepository] = useState<object>({});
    const [issues, setIssues] = useState<object[]>([]);
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

    return (
        <Container>

        </Container>
    )
}
