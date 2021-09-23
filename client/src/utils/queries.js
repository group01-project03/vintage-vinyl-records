import gql from 'graphql-tag';

export const QUERY_RECORDS = gql`
query getRecords($genre: ID) {
  records(genre: $genre) {
    _id
    title
    description
    price
    image
    quantity
    genre {
      _id
    }
  }
}
`;

export const QUERY_ALL_RECORDS = gql`
{
  records{
    _id
    title
    description
    year
    condition
    price
    image
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
  me {
    username
    orders {
      _id
      purchaseDate
      records {
        _id
        title
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
