import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import EventCard from './eventCard';

const StyledArrow = styled(BiArrowBack)`
  margin-top: 10px;
  color: black;
  text-align: left;
  display: block;
  font-size: 25px;
`;

const StyledHeader = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  color: #000000;
`;

const StyledContainer = styled(Container)`
  border-radius: 7px;
  font-family: Poppins;
  margin: 5px;
  padding: 20px;
  align-items: left;
  justify-content: left;
`;

/*  just dummy test data for displaying events :) */

const testEvents = [
  {
    title: "Ben's party",
    start: new Date(121170000),
    end: new Date(),
    location: '35.30254888400675, -120.69751392967409',
    notes: 'very fun',
    id: 12,
  },
  {
    title: 'Kyle Concert',
    start: new Date(22222222),
    end: new Date(44444444444444),
    location: 'university union',
    notes: 'also very fun',
    id: 13,
  },
  {
    title: "Armstrong's Winter Staff Party",
    start: new Date(),
    end: new Date(),
    location: 'PAC',
    notes: "Everyone's invited!",
    id: 99900,
  },
];

const convertDate = (date: {
  getDay: () => number;
  toLocaleDateString: () => string;
}) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return `${days[date.getDay()]} ${date.toLocaleDateString()}`;
};

export default function Events() {
  const eventCards = testEvents.map((event) => {
    return (
      <EventCard
        key={event.id}
        title={event.title}
        date={convertDate(event.start)}
      />
    );
  });

  return (
    <div>
      <StyledContainer maxWidth="md">
        <Link to="/">
          <StyledArrow />
        </Link>
        <StyledHeader>Events</StyledHeader>
        {eventCards}
      </StyledContainer>
    </div>
  );
}