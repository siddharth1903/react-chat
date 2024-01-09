import { gql } from '@apollo/client';

export const SUBSCRIBE_TO_NEW_MESSAGE = gql`
subscription GetMessageList($targetUser: String!, $limit: Int = 30, $offset: Int!) {
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