import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import EventCard from './eventCard';
import Header from '../navigation/header';
import { Event, User } from '../../types';

const StyledContainer = styled(Container)`
  border-radius: 7px;
  font-family: Poppins;
  margin: 5px;
  padding: 20px;
  align-items: left;
  justify-content: left;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const convertDate = (dateString: string) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const date = new Date(dateString);

  return `${days[date.getUTCDay()]} ${date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
  })}`;
};

type EventProps = {
  eventData: Event[];
  setCurrentUser: (user: User) => void;
};

export default function Events({ eventData, setCurrentUser }: EventProps) {
  eventData.sort((a: Event, b: Event) => {
    if (a.start > b.start) {
      return -1;
    }
    if (a.start < b.start) {
      return 1;
    }
    return 0;
  });

  return (
    <Header headerText="Events" navbar setCurrentUser={setCurrentUser}>
      <StyledContainer maxWidth="md">
        {eventData ? (
          eventData.map((event) => {
            return (
              <StyledLink to={`/log-hours/${event._id}`} key={event._id}>
                <EventCard
                  title={event.title}
                  date={convertDate(event.start)}
                  key={event._id}
                />
              </StyledLink>
            );
          })
        ) : (
          <p key="load"> Loading ...</p>
        )}
      </StyledContainer>
    </Header>
  );
}
