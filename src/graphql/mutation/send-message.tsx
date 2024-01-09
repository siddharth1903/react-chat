import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
mutation SendMessage($messageText: String!, $targetUser: String!) {
    insert_chat_app_messages(objects: {text: $messageText, to: $targetUser}) {
      returning {
        id
        text
        from
        time
        to
        is_read 
        user_context
      }
    }
  }  
`