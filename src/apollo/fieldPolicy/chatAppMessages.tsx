import { TypePolicies } from '@apollo/client/cache/inmemory/policies';

export const FIELD_CHAT_APP_MESSAGES: TypePolicies =
{
    chat_app_messages: {
        fields: {
            senderOrReceiver: {
                read: (_, { variables, readField }) => {

                    if (variables?.targetUser) {

                        return variables.targetUser === readField('to') ? 'SENDER' : 'RECEIVER';
                    }
                    return undefined;

                }
            }
        }
    }
}
