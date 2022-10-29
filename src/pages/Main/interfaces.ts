import { IRepositoryInfos } from "shared/interfaces";

export interface IButton {
    loading: boolean;
}

export interface IUseMainHook {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    newRepo: string;
    setNewRepo: (newRepo: string) => void;
    loading: boolean;
    repositories: IRepositoryInfos[];
    handleDelete: (repoName: string) => void;
}
