import gql from 'graphql-tag';

export const QUERY_RECORDS = gql`
query getRecords($genre: ID) {
  records(genre: $genre) {
    _id
    name
    description
    price
    image
    genre {
      _id
    }
  }
}
`;


/*
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
`; */

export const QUERY_ALL_RECORDS = gql`
{
records {
  _id
  title
  description
  price
  quantity
  genre {
    name
  }
}
}
`;

/*
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
*/  


export const QUERY_GENRES = gql`
{
  genres {
    _id
    title
  }
}
`;

/*
{
    _id: ID
  name: String
}
`;
*/

export const QUERY_USER = gql`

{
  user {
    username
    orders {
      _id
      purchaseDate
      records {
        _id
        name
        description
        price
        image
      }
    }
  }
}
`;
/*
{
    _id: ID
    username: String
    email: String
    RecordCount: Int
    orders: [Order]
}
`; */

export const QUERY_CHECKOUT = gql`

query getCheckout($records: [ID]!) {
  checkout(records: $records) {
    session
  }
}
`;

/*
  query getCheckout($records: [ID]!) {
    checkout(records: $records) {
      session
    }
  }
`;
*/