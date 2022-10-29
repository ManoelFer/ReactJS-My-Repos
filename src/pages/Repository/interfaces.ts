import { IIssueInfos, IRepositoryInfos } from "shared/interfaces";

export interface IFilterListStyled {
    active: number;
}

export interface IUseRepositoryHook {
    loading: boolean;
    repository?: IRepositoryInfos;
    filterSelected: number;
    setFilterSelected: (filterSelected: number) => void;
    issues: IIssueInfos[];
    page: number;
    handlePage: (to: string) => void;
}
