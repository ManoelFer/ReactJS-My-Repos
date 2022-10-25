

export interface IEndpointsGitHub {
    getDataRepository: (repoName: string) => Promise<any>;
    getDataRepositoryIssues: (repoName: string, page: number, state: string) => Promise<any>;
}