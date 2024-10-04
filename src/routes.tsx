import {createBrowserRouter, Navigate} from 'react-router-dom';
import Layout from './pages/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import {CHARACTER_DETAILS_ROUTE, PERSON_ID_PARAM} from './constants/navigation-constants.ts';
import CharacterDetailsPage from './pages/CharacterDetailsPage.tsx';

export const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: `${CHARACTER_DETAILS_ROUTE}/:${PERSON_ID_PARAM}`,
                element: <CharacterDetailsPage />
            },
            {
                path: '*',
                element: <Navigate to='/' replace />
            }
        ]
    }
]);
