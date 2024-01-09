import { gql } from '@apollo/client';

export const MARK_AS_READ = gql`
mutation MarkPageAsRead($messageIds: [Int!]!) {
  update_chat_app_messages(where: {id: {_in: $messageIds}}, _set: {is_read: true}) {
    affected_rows
  }
}
`