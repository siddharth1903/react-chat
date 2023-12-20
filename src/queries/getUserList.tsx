import { gql } from "@apollo/client";

export const GET_USER_LIST = gql`
query getUserList($userId: String!) {
    chat_app_users(where: {_not: {user_id: {_eq: $userId}}}) {
      name
      user_id
      profile_picture
      email_address
    }
  }
  
`