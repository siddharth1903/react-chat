import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
mutation SendMessage($messageText: String!, $targetUser: String!) {
    insert_chat_app_messages(objects: {text: $messageText, to: $targetUser}) {
      affected_rows
    }
  }  
`