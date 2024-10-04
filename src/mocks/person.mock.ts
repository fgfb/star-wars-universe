import {PeopleResponse, Person} from '../interfaces';

export const MOCK_PERSONS: Person[] = [
    {
        name: 'Person 1',
        height: '56',
        mass: '34',
        hair_color: 'black',
        skin_color: 'blue',
        eye_color: 'brown',
        birth_year: '3002',
        gender: 'male',
        homeworld: 'https://planet/1',
        films: [
            'https://film/1',
            'https://film/5',
        ],
        species: [],
        vehicles: [],
        starships: [],
        created: '1248320',
        edited: '4r4230q',
        url: 'https://people/1',
    }
];

export const MOCK_PEOPLE_RESPONSE: PeopleResponse = {
    count: MOCK_PERSONS.length,
    next: null,
    previous: null,
    results: MOCK_PERSONS,
}