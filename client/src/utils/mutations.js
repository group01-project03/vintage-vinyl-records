import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_ORDER = gql`
  mutation addOrder($records: [ID]!) {
    addOrder(records: $records) {
      purchaseDate
      records {
        _id
      title
      description
      price
      genre {
        name
      } 
      }
    }
  }
`;

    /*
    addOrder(records: $records) {
        purchaseDate
        records {
          _id: ID
        purchaseDate: String
        records: [Record]
      }
    }
  }
`; */


export const ADD_USER = gql`
  mutation addUser($username: String! $email: String!, $password: String!) {
    addUser(username: username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

      /*
      _id: ID
        username: String
        email: String
        RecordCount: Int
        orders: [Order]
      }
    }
  }
`; */