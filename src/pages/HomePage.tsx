import {useNavigate} from 'react-router-dom';
import {CHARACTER_DETAILS_ROUTE} from '../constants/navigation-constants.ts';
import PersonCard from '../components/PersonCard.tsx';
import {useGetAllCharactersQuery, useGetPlanetByUrlsQuery} from '../hooks/useQuery.ts';
import {ExtendedPerson, Person} from '../interfaces';

const HomePage = () => {
    const navigate = useNavigate();
    const { data: persons, isLoading: personsLoading, error: personsError } = useGetAllCharactersQuery();

    const uniquePlanetUrls = [...new Set(persons?.results.map(person => person.homeworld) || [])];

    const { data: planets, error: planetsError, isLoading: planetsLoading } = useGetPlanetByUrlsQuery(uniquePlanetUrls);

    if (personsLoading || planetsLoading) return <div>Loading...</div>;
    if (personsError || planetsError) return <div>Error loading data</div>;
    if (!persons) return <div>No data available</div>;

    const extendedPersons: ExtendedPerson[] = persons.results.map(person => {
        const homePlanet = planets?.find(planet => planet.url === person.homeworld)?.name || 'Unknown';
        return { ...person, homePlanet };
    });

    const handlePersonCardClick = (person: Person) => {
        const id = person.url.split('/').filter(p => !!p).pop()
        navigate(`${CHARACTER_DETAILS_ROUTE}/${id}`);
    };

    return (
        <div style={{ padding: '16px' }}>
            <h1>Star war characters</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                {extendedPersons.map(person => (
                    <PersonCard key={person.name} person={person} onCardClick={() => handlePersonCardClick(person)} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;