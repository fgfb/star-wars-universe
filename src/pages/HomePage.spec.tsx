import {afterEach, describe, expect, it, vi} from 'vitest';
import {PersonCardProps} from '../components';
import HomePage from './HomePage.tsx';
import {render, screen} from '@testing-library/react';
import {MOCK_PEOPLE_RESPONSE, MOCK_PLANETS} from '../mocks';
import {useGetAllCharactersQuery, useGetPlanetByUrlsQuery} from '../hooks/useQuery.ts';

vi.mock('../components/PersonCard', () => ({
    default: ({ person, onCardClick }: PersonCardProps) => (
       <div onClick={onCardClick} data-testid='person-card'>
           <h2>{person.name}</h2>
           <p>{person.homePlanet}</p>
       </div>
   )
}));

vi.mock('../hooks/useQuery', () => ({
    useGetAllCharactersQuery: vi.fn(),
    useGetPlanetByUrlsQuery: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => {
   return {
       useNavigate: () => mockNavigate,
   }
});

describe('HomePage', () => {

    afterEach(() => vi.clearAllMocks());

    it('should render [loading] state', () => {
        vi.mocked(useGetAllCharactersQuery).mockReturnValue({ isLoading: true } as any);
        vi.mocked(useGetPlanetByUrlsQuery).mockReturnValue({ isLoading: true } as any);
        render(<HomePage />);

        expect(screen.getByText('Loading...')).toBeDefined();
    });

    it('should render [error] state', () => {
        vi.mocked(useGetAllCharactersQuery).mockReturnValue({ isLoading: false, error: new Error('Failed to fetch')  } as any);
        vi.mocked(useGetPlanetByUrlsQuery).mockReturnValue({ isLoading: false, error: null } as any);
        render(<HomePage />);

        expect(screen.getByText('Error loading data')).toBeDefined();
    });

    it('should render [no data] state', () => {
        vi.mocked(useGetAllCharactersQuery).mockReturnValue({ isLoading: false, data: null } as any);
        vi.mocked(useGetPlanetByUrlsQuery).mockReturnValue({ isLoading: false, data: null } as any);
        render(<HomePage />);

        expect(screen.getByText('No data available')).toBeDefined();
    });

    it('should render [characters] and their [home planet]', () => {
        vi.mocked(useGetAllCharactersQuery).mockReturnValue({ isLoading: false, data: MOCK_PEOPLE_RESPONSE } as any);
        vi.mocked(useGetPlanetByUrlsQuery).mockReturnValue({ isLoading: false, data: MOCK_PLANETS } as any);

        render(<HomePage />);

        expect(screen.getByText('Star war characters')).toBeDefined();

        const personCard = screen.getAllByTestId('person-card')
        expect(personCard).toHaveLength(MOCK_PEOPLE_RESPONSE.results.length);

        personCard[0].click();
        expect(mockNavigate).toHaveBeenCalledTimes(1);

        MOCK_PEOPLE_RESPONSE.results.forEach((person, index) => {
            expect(screen.getByText(person.name)).toBeDefined();
            expect(screen.getByText(MOCK_PLANETS[index].name)).toBeDefined();
        });

    });

    it('should handle [unknown] planet', async () => {
        vi.mocked(useGetAllCharactersQuery).mockReturnValue({ isLoading: false, data: MOCK_PEOPLE_RESPONSE } as any);
        vi.mocked(useGetPlanetByUrlsQuery).mockReturnValue({ isLoading: false, data: [] } as any);

        render(<HomePage />);

        expect(screen.getByText('Unknown')).toBeDefined();
    });
})