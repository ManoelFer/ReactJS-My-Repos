

export interface IEndpointsGitHub {
    getDataRepository: (repoName: string) => Promise<any>;
    getDataRepositoryIssues: (repoName: string) => Promise<any>;
}