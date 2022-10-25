
import instance from '../axios.config'
import { IEndpointsGitHub } from './interfaces'


const EndpointsGitHub = (): IEndpointsGitHub => {

    async function getDataRepository(repoName: string) {
        return instance.get(`repos/${repoName}`)
    }

    async function getDataRepositoryIssues(repoName: string, page: number, state: string) {
        return instance.get(`repos/${repoName}/issues`, {
            params: {
                state: state,
                per_page: 5,
                page: page
            }
        })
    }

    return { getDataRepository, getDataRepositoryIssues }
}

export default EndpointsGitHub