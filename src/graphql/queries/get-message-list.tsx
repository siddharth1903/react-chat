import { gql } from '@apollo/client';

export const GET_MESSAGE_LIST = gql`
query GetMessageList($targetUser: String!, $limit: Int!, $offset: Int!) {
    chat_app_messages(where: {_or: [{from: {_eq: $targetUser}}, {to: {_eq: $targetUser}}]}, limit: $limit, offset: $offset, order_by: {time: desc}) {
      id
      text
      from
      time
      to
      is_read 
      user_context
    }
  }
`