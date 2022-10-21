import { useParams } from "react-router-dom";

export const Repository = () => {
    let { repository_full_name } = useParams();

    return (
        <h1 style={{ color: "#fff" }}>
            {repository_full_name}
        </h1>
    )
}
