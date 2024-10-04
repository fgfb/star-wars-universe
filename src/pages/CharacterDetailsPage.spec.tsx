import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import CharacterDetailsPage from './CharacterDetailsPage.tsx';
import {useParams} from 'react-router-dom';
import {PERSON_ID_PARAM} from '../constants/navigation-constants.ts';
import {useGetCharacterByIdQuery, useGetFilmsByUrlsQuery} from '../hooks/useQuery.ts';
import {MOCK_FILMS, MOCK_PERSONS} from '../mocks';

vi.mock('react-router-dom', () => ({
    useParams: vi.fn(),
}));

vi.mock('../hooks/useQuery', () => ({
    useGetCharacterByIdQuery: vi.fn(),
    useGetFilmsByUrlsQuery: vi.fn(),
}));

describe('CharacterDetailsPage', () => {

    beforeEach(() => vi.mocked(useParams).mockReturnValue({ [PERSON_ID_PARAM]: '1' }));

    afterEach(() => vi.clearAllMocks());

    it('should render [loading] state', () => {
        vi.mocked(useGetCharacterByIdQuery).mockReturnValue({ isLoading: true } as any);
        vi.mocked(useGetFilmsByUrlsQuery).mockReturnValue({ isLoading: true } as any);

        render(<CharacterDetailsPage />);
        expect(screen.getByText('Loading...')).toBeDefined();
    });

    it('should render [error] state', () => {
        vi.mocked(useGetCharacterByIdQuery).mockReturnValue({ isLoading: false, error: new Error('Failed to fetch') } as any);
        vi.mocked(useGetFilmsByUrlsQuery).mockReturnValue({ isLoading: false, error: null } as any);

        render(<CharacterDetailsPage />);
        expect(screen.getByText('Error loading data')).toBeDefined();
    });

    it('should render [no data] state', () => {
        vi.mocked(useGetCharacterByIdQuery).mockReturnValue({ data: null, isLoading: false } as any);
        vi.mocked(useGetFilmsByUrlsQuery).mockReturnValue({ data: null, isLoading: false } as any);

        render(<CharacterDetailsPage />);
        expect(screen.getByText('No details available')).toBeDefined();
    });

    it('renders [character details] with [films]', () => {
        vi.mocked(useGetCharacterByIdQuery).mockReturnValue({ data: MOCK_PERSONS[0], isLoading: false } as any);
        vi.mocked(useGetFilmsByUrlsQuery).mockReturnValue({ data: MOCK_FILMS, isLoading: false } as any);

        render(<CharacterDetailsPage />);

        expect(screen.getByText(`${MOCK_PERSONS[0].name}'s Details`)).toBeDefined();
        expect(screen.getByText(`Height: ${MOCK_PERSONS[0].height}`)).toBeDefined();
        expect(screen.getByText(MOCK_FILMS[0].title)).toBeDefined();
        expect(screen.getByText(MOCK_FILMS[1].title)).toBeDefined();
    });

    it('should handle [unknown] film data', () => {
        vi.mocked(useGetCharacterByIdQuery).mockReturnValue({ data: MOCK_PERSONS[0], isLoading: false } as any);
        vi.mocked(useGetFilmsByUrlsQuery).mockReturnValue({ data: [], isLoading: false } as any);

        render(<CharacterDetailsPage />);

        expect(screen.getAllByText('Unknown')).toHaveLength(2);
    });
});