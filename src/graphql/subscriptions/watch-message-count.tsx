import { gql } from '@apollo/client';

export const SUBSCRIBE_MESSAGE_COUNT = gql`
subscription GetMessageCount($targetUser: String!) {
  chat_app_messages_aggregate(where: {_or: [{from: {_eq: $targetUser}}, {to: {_eq: $targetUser}}]}) {
    aggregate {
      count
    }
  }
}
`