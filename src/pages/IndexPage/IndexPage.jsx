import { CatalogPage } from '../CatalogPage/catalog-page'
import { useContext } from 'react'
import { UserContext } from "../../context/userContext";
import { MainPage } from '../MainPage/MainPage';

export function IndexPage() {
    const { token } = useContext(UserContext)

    if (token) {
        return <CatalogPage />
    }

    return <MainPage />
}