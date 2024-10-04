import styled from 'styled-components';
import {ExtendedPerson} from '../interfaces';

const CardContainer  = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    width: 280px;
    border: 1px solid;
    cursor: pointer;
`;

const CardTitle = styled.h2`
    margin: 0;
`;

const CardContent = styled.p`
    margin: 0;
    color: #666;
`;

export interface PersonCardProps {
    person: ExtendedPerson;
    onCardClick: () => void;
}

const PersonCard = ({ person, onCardClick }: PersonCardProps) => {
    return (
        <CardContainer onClick={onCardClick}>
            <CardTitle>{person.name}</CardTitle>
            <CardContent>Gender: {person.gender}, Home planet: {person.homePlanet}</CardContent>
        </CardContainer >
    );
};

export default PersonCard;