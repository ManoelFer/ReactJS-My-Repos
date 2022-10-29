import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import EndpointsGitHub from 'shared/services/gitHubEndpoints/endpoints';

import { IUseRepositoryHook } from "./interfaces";
import { IIssueInfos, IRepositoryInfos } from 'shared/interfaces';

import { filters } from 'shared/constants';

const useRepositoryHook = (): IUseRepositoryHook => {
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

    return {
        loading,
        repository,
        filterSelected,
        setFilterSelected,
        issues,
        page,
        handlePage
    }
}

export default useRepositoryHook;