import gql from 'graphql-tag';

export const QUERY_RECORDS = gql`
  query getRecords($genre: ID) {
    records(genre: $genre) {
      _id
      name
      description
      price
      quantity
      image
      genre {
        _id
      }
    }
  }
`;

export const QUERY_ALL_RECORDS = gql`
  {
    records {
      _id
      name
      description
      price
      quantity
      genre {
        name
      }
    }
  }
`;

export const QUERY_GENRES = gql`
{
  genres {
    _id
    name
  }
}
`;

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    orders {
      _id
      purchaseDate
      records {
        _id
        name
        description
        price
        quantity
        image
      }
    }
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($records: [ID]!) {
    checkout(records: $records) {
      session
    }
  }
`;