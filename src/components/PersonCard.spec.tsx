import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ExtendedPerson} from '../interfaces';
import {render, screen} from '@testing-library/react';
import PersonCard from './PersonCard.tsx';
import {MOCK_PERSONS} from '../mocks';

const mockPerson: ExtendedPerson = {
  ...MOCK_PERSONS[0], homePlanet: 'Tatooine'
};

const mockClick = vi.fn();

describe('PersonCard', () => {

    beforeEach(() => {
        render(<PersonCard person={mockPerson} onCardClick={mockClick} />);
    });

    it('should display with provided information on the card', () => {
        expect(screen.getByText(mockPerson.name)).toBeDefined();
    });

    it('should trigger onClick event when clicked on a card', () => {
        const card = screen.getByText(mockPerson.name);
        card.click();

        expect(mockClick).toHaveBeenCalledTimes(1);
    });
});