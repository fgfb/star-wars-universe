import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getApi} from '../api-connectors.ts';
import {Film, PeopleResponse, Person, Planet} from '../interfaces';

const getAllCharactersUrl = 'https://swapi.dev/api/people';

export function useGetAllCharactersQuery() {
    return useQuery({
        queryKey: ['getAllCharacters'],
        queryFn: () => getApi<PeopleResponse>(getAllCharactersUrl),
        staleTime: Infinity,
        gcTime: 10 * 60 * 1000,
    });
}

export function useGetPlanetByUrlsQuery(planetUrls: string[]) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['fetchPlanetsByUrls', planetUrls],
        queryFn: async () => {
            return Promise.all(
                planetUrls.map(async url => {
                    const cachedPlanet = queryClient.getQueryData<Planet>(['planet', url]);
                    if (cachedPlanet) return cachedPlanet;
                    const planet = await getApi<Planet>(url);
                    queryClient.setQueryData<Planet>(['planet', url], planet);
                    return planet;
                })
            );
        },
        enabled: planetUrls.length > 0,
        staleTime: Infinity,
        gcTime: 10 * 60 * 1000,
    });
}

export function useGetCharacterByIdQuery(personId?: string) {
    const getCharacterUrl = `https://swapi.dev/api/people/${personId}`;
    return useQuery({
        queryKey: ['getCharacterById', getCharacterUrl],
        queryFn: () => {
            if (!personId) {
                throw new Error('No Id provided');
            }
            return getApi<Person>(getCharacterUrl)
        },
        enabled: !!personId,
        staleTime: Infinity,
        gcTime: 10 * 60 * 1000,
    });
}

export function useGetFilmsByUrlsQuery(filmUrls: string[]) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['fetchFilmsByUrls', filmUrls],
        queryFn: async () => {
            return Promise.all(
                filmUrls.map(async url => {
                    const cachedFilm = queryClient.getQueryData<Film>(['film', url]);
                    if (cachedFilm) return cachedFilm;
                    const film = await getApi<Film>(url);
                    queryClient.setQueryData<Film>(['film', url], film);
                    return film;
                })
            );
        },
        enabled: filmUrls.length > 0,
        staleTime: Infinity,
        gcTime: 10 * 60 * 1000,
    });
}