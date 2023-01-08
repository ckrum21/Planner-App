import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        eventTitle
        createdAt
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      eventTitle
      eventAuthor
      createdAt
    }
  }
`;
