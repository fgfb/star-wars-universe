import {useParams} from 'react-router-dom';
import {PERSON_ID_PARAM} from '../constants/navigation-constants.ts';
import {useGetCharacterByIdQuery, useGetFilmsByUrlsQuery} from '../hooks/useQuery.ts';

const CharacterDetailsPage = () => {
    const params = useParams<{ [PERSON_ID_PARAM]?: string }>();

    const { data: person, isLoading: personLoading, error: personError } = useGetCharacterByIdQuery(params[PERSON_ID_PARAM]);

    const { data: films, error: filmsError, isLoading: filmsLoading } = useGetFilmsByUrlsQuery(person?.films ?? []);

    if (personLoading || filmsLoading) return <div>Loading...</div>;
    if (personError || filmsError) return <div>Error loading data</div>;
    if (!person) return <div>No details available</div>;

    const getFilmName = (filmUrl: string) => films?.find(film => film.url === filmUrl)?.title;

    return (
        <div style={{ padding: '16px' }}>
            <h2>{person.name}'s Details</h2>
            <div>
                <p>Height: {person.height}</p>
                <p>Mass: {person.mass}</p>
                <p>Hair Color: {person.hair_color}</p>
                <p>Eye Color: {person.eye_color}</p>
                <h4>Films</h4>
                <ul>
                    {person.films.map(film => (
                        <li key={film}>{getFilmName(film) || 'Unknown'}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CharacterDetailsPage;