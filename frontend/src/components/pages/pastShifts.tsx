import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import EventSlot from './eventSlot';

const StyledContainer = styled(Container)`
  border radius: 7px;

  margin: 5px;
  padding: 10px;
`;

const StyledHeader = styled.h1`
  text-align: center;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
`;

const testEvents = [
  {
    title: 'Event one',
    date: 'Tuesday 1/04/2022',
    hours: 6,
    key: 1,
  },

  {
    title: 'Event two',
    date: ' Monday 11/04/2021',
    hours: 4,
    key: 2,
  },

  {
    title: 'Event three',
    date: ' Wednesday 1/20/2021',
    hours: 3,
    key: 3,
  },
];

export default function PastShifts() {
  const eventSlots = testEvents.map((event) => {
    return (
      <EventSlot
        key={event.key}
        title={event.title}
        date={event.date}
        hours={event.hours}
      />
    );
  });

  return (
    <div>
      <StyledContainer>
        <StyledHeader>Past Shifts</StyledHeader>
        {eventSlots}
      </StyledContainer>
    </div>
  );
}