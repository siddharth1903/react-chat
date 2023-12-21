import { gql } from "@apollo/client";

export const GET_USER_LIST = gql`
query getUserList($userId: String!) {
  chat_app_users(where: {_not: {user_id: {_eq: $userId}}}) {
    userName: name
    userId: user_id
    picture: profile_picture
    email: email_address
    lastSeen: last_seen
  }
} 
`