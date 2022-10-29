import { FaArrowLeft } from 'react-icons/fa'

import { filters, IFilterList } from 'shared/constants';

import useRepositoryHook from './useRepository';

import { Container, OwnerContainer, Loading, BackButton, IssuesList, PageActions, FilterList } from "./styles";

export const Repository = () => {
    const { loading, repository, filterSelected, setFilterSelected, issues, page, handlePage } = useRepositoryHook()

    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color='#000' size={35} />
            </BackButton>
            <OwnerContainer>
                <img src={repository?.owner.avatar_url} alt={repository?.owner.login} />
                <h1>{repository?.name}</h1>
                <p>{repository?.description}</p>
            </OwnerContainer>

            <FilterList active={filterSelected}>
                {filters.map((filter: IFilterList, index) => (
                    <button
                        type='button'
                        key={filter.label}
                        onClick={() => setFilterSelected(index)}
                    >
                        {filter.label}
                    </button>
                ))}
            </FilterList>
            <IssuesList>
                {
                    issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />

                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {
                                        issue.labels.map(label => (
                                            <span key={String(label.id)}>{label.name}</span>
                                        ))
                                    }
                                </strong>

                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))
                }
            </IssuesList>
            <PageActions>
                <button
                    type="button"
                    onClick={() => handlePage("back")}
                    disabled={page < 2}
                >
                    Voltar
                </button>
                <button
                    type="button"
                    onClick={() => handlePage("next")}
                >
                    Próxima
                </button>
            </PageActions>
        </Container>
    )
}
