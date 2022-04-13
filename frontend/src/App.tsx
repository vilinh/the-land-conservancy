import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Amplify from 'aws-amplify';

import './App.css';
import Login from './components/authentication/login';
import CreateAccount from './components/authentication/createAccount';
import ForgotPasword from './components/authentication/forgotPassword';
import ResetPassword from './components/authentication/resetPassword';
import PastShifts from './components/pages/pastShifts';
import Events from './components/pages/events';
import LogHours from './components/pages/logHours';
import CreateEvent from './components/pages/createEvent';
import VolunteerLog from './components/pages/volunteerLog';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);
Amplify.configure({
  Auth: {
    // Amazon Cognito Region
    region: 'us-west-2',
    // Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_GsGspX3dl',
    // Amazon Cognito Web Client ID
    userPoolWebClientId: '56nsvt3lp1gmb3ou6t63ldj72m',
    // Enforce user authentication prior to accessing AWS resources
    mandatorySignIn: false,
  },
});

interface Event {
  _id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
  shifts: string[];
}

interface Shift {
  _id: string;
  event: Event;
  hours: number;
  user: string;
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      await fetch('http://localhost:3001/events')
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
          // console.log(data);
        })
        .catch((err) => console.log(err));
    };

    loadEvents();
  }, []);

  // 'setUser' sets the 'currentUser' to the 'userSub' value,
  // which is a unique identifier
  /* eslint-disable */
  const [currentUser, setUser] = useState('');
  const [pastShifts, setPastShifts] = useState<Shift[]>([]);

  const user = 'sam';

  console.log(currentUser);

  useEffect(() => {
    const loadPastShifts = async () => {
      await fetch(`http://localhost:3001/users/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setPastShifts(data.pastShifts);
        })
        .catch((err) => console.log(err));
    };

    loadPastShifts();
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      await fetch('http://localhost:3001/events')
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
          // console.log(data);
        })
        .catch((err) => console.log(err));
    };

    loadEvents();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/events" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPasword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/events" element={<Events eventData={events} />} />
          <Route
            path="/log-hours/:eventId"
            element={<LogHours eventData={events} />}
          />
          <Route
            path="/past-shifts"
            element={<PastShifts pastShiftData={pastShifts} />}
          />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/volunteer-log" element={<VolunteerLog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
