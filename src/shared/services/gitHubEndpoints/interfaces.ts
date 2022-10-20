

export interface IEndpointsGitHub {
    getDataRepository: (repoName: string) => Promise<any>;
}