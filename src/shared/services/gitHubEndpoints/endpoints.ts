
import instance from '../axios.config'
import { IEndpointsGitHub } from './interfaces'


const EndpointsGitHub = (): IEndpointsGitHub => {

    async function getDataRepository(repoName: string) {
        return instance.get(`repos/${repoName}`)
    }

    return { getDataRepository }
}

export default EndpointsGitHub