
import instance from '../axios.config'
import { IEndpointsGitHub } from './interfaces'


const EndpointsGitHub = (): IEndpointsGitHub => {

    async function getDataRepository(repoName: string) {
        return instance.get(`repos/${repoName}`)
    }

    async function getDataRepositoryIssues(repoName: string) {
        return instance.get(`repos/${repoName}/issues`, {
            params: {
                state: 'open',
                per_page: 5
            }
        })
    }

    return { getDataRepository, getDataRepositoryIssues }
}

export default EndpointsGitHub