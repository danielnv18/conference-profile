import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import datetimeDifference from 'datetime-difference';
import Board from './layout/Board';

const client = new ApolloClient();

const { startDate, endDate } = drupalSettings.conference;
const dateTimeStart = new Date(startDate);
dateTimeStart.setDate(dateTimeStart.getDate() + 1);
const dateTimeEnd = new Date(endDate);
dateTimeEnd.setDate(dateTimeEnd.getDate() + 1);
const current = new Date(startDate);
current.setDate(current.getDate() + 1);
const lenght = datetimeDifference(dateTimeStart, dateTimeEnd);
const dates = [];

for (let i = 0; i <= lenght.days; i++) {
  dates.push(new Date(current.toDateString()));
  current.setDate(current.getDate() + 1);
}

const Dashboard = () => (
  <ApolloProvider client={client}>
    <Board startDate={dateTimeStart} endDate={dateTimeEnd} dates={dates} />
  </ApolloProvider>
);

ReactDOM.render(<Dashboard />, document.getElementById('conference-schedule-dashboard'));
