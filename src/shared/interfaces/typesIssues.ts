interface ILabelInfo {
    id: number;
    name: string;
}

export interface IIssueInfos {
    id: number;
    html_url: string;
    title: string;
    user: {
        avatar_url: string;
        login: string;
    };
    labels: ILabelInfo[]
}