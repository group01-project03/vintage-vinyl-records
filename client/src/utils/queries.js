import gql from 'graphql-tag';

export const QUERY_RECORDS = gql`
  query getRecords($genre: ID) {
    records(genre: $genre) {
        title: String
        image: String
        year: Int
        condition: String
        description: String
        price: Float
        genre: Genre
      }
    }
  }
`;

export const QUERY_ALL_RECORDS = gql`
  {
    title: String
    image: String
    year: Int
    condition: String
    description: String
    price: Float
    genre: Genre
      }
    }
  }
`;

export const QUERY_GENRES = gql`
{
    _id: ID
  name: String
}
`;

export const QUERY_USER = gql`
{
    _id: ID
    username: String
    email: String
    RecordCount: Int
    orders: [Order]
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($records: [ID]!) {
    checkout(records: $records) {
      session
    }
  }
`;