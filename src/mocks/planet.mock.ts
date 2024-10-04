import {Planet} from '../interfaces';

export const MOCK_PLANETS: Planet[] = [
    {
        name: 'Planet 1',
        rotation_period: '43',
        orbital_period: '424',
        diameter: '11',
        climate: 'Humid',
        gravity: '45',
        terrain: 'Flat',
        surface_water: 'yes',
        population: '342',
        residents: [],
        films: [
            'https://film/11', 'https://film/4'
        ],
        created: '421434321',
        edited: '532535643',
        url: 'https://planet/1',
    },
    {
        name: 'Planet 2',
        rotation_period: '63',
        orbital_period: '344',
        diameter: '186',
        climate: 'Dust',
        gravity: '993',
        terrain: 'Mountains',
        surface_water: 'yes',
        population: '9',
        residents: [],
        films: [
            'https://film/11', 'https://film/1'
        ],
        created: '489283',
        edited: '399283',
        url: 'https://planet/2',
    }
]