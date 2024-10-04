import {afterEach, describe, expect, it, vi} from 'vitest';
import {getApi} from '../api-connectors.ts';
import {MOCK_PEOPLE_RESPONSE, MOCK_PERSONS, MOCK_PLANETS} from '../mocks';
import {renderHook, waitFor} from '@testing-library/react';
import {useGetAllCharactersQuery, useGetCharacterByIdQuery, useGetPlanetByUrlsQuery} from './useQuery.ts';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import React from 'react';

vi.mock('../api-connectors', () => ({
    getApi: vi.fn(),
}));

const customWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('useQuery', () => {

    afterEach(() => vi.clearAllMocks());

    describe('useGetAllCharactersQuery', () => {
        it('should [fetch] successfully', async () => {
            vi.mocked(getApi).mockResolvedValue(MOCK_PEOPLE_RESPONSE);

            const { result } = renderHook(() => useGetAllCharactersQuery(), {
                wrapper: customWrapper(),
            });

            await waitFor(() => expect(result.current.data).toBe(MOCK_PEOPLE_RESPONSE));
        });
    });

    describe('useGetPlanetByUrlsQuery', () => {
        let planetUrls = ['https://planet/1'];

        it('should [fetch] successfully', async () => {
            vi.mocked(getApi).mockResolvedValue(MOCK_PLANETS[0]);

            const { result, rerender } = renderHook(() => useGetPlanetByUrlsQuery(planetUrls), {
                wrapper: customWrapper(),
            });

            expect(getApi).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(result.current.data).toEqual(MOCK_PLANETS.slice(0, 1)));

            vi.mocked(getApi).mockClear();

            rerender();

            expect(getApi).toHaveBeenCalledTimes(0);
            await waitFor(() => expect(result.current.data).toEqual(MOCK_PLANETS.slice(0, 1)));
        });

        it('should [not fetch] if plantUrls is empty', () => {
            planetUrls = [];
            const { result } = renderHook(() => useGetPlanetByUrlsQuery(planetUrls), {
                wrapper: customWrapper(),
            });

            expect(result.current.data).toBeUndefined();
        });
    });

    describe('useGetCharacterByIdQuery', () => {
        const personId = '1';

        it('should [fetch] successfully', async () => {
            vi.mocked(getApi).mockResolvedValue(MOCK_PERSONS[0]);

            const { result, rerender } = renderHook(() => useGetCharacterByIdQuery(personId), {
                wrapper: customWrapper(),
            });

            expect(getApi).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(result.current.data).toEqual(MOCK_PERSONS[0]));

            vi.mocked(getApi).mockClear();

            rerender();

            expect(getApi).toHaveBeenCalledTimes(0);
            await waitFor(() => expect(result.current.data).toEqual(MOCK_PERSONS[0]));
        });

        it('should [not fetch] if person is is undefined', async () => {
            const { result } = renderHook(() => useGetCharacterByIdQuery(), {
                wrapper: customWrapper(),
            });

            expect(getApi).toHaveBeenCalledTimes(0);
            await waitFor(() => expect(result.current.data).toBeUndefined());
        });

    });
});