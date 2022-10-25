

export interface IEndpointsGitHub {
    getDataRepository: (repoName: string) => Promise<any>;
    getDataRepositoryIssues: (repoName: string, page: number) => Promise<any>;
}