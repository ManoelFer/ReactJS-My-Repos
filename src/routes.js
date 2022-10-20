import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Main, Repository } from './pages'

export const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/repository/:repository_full_name" element={<Repository />} />
            </Routes>
        </BrowserRouter>
    )
}
