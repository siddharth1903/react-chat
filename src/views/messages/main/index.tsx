import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';

import { MARK_AS_READ } from '../../../graphql/mutation/mark-as-read';
import { GET_MESSAGE_LIST } from '../../../graphql/queries/get-message-list';
import { SUBSCRIBE_MESSAGE_COUNT } from '../../../graphql/subscriptions/watch-message-count';
import { Message, MessageTemplate } from '../../../models/message';
import { User } from '../../../models/user';
import messageTemplate from '../../../templates/message-template';
import SendMessageForm from '../form';


interface ComponentProps {
    targetUser: User;
}

const Messages: React.FC<ComponentProps> = ({ targetUser }) => {

    const [chatMessages, setChatMessages] = useState<MessageTemplate[] | []>([]);

    const { user: { picture: userPicture, name, email } = {} } = useAuth0();

    const [first, setFirst] = useState(0);

    const [offset, setOffset] = useState(0);

    const [limit, setLimit] = useState(10);


    const [fetchMessages, { error, loading, data }] = useLazyQuery(GET_MESSAGE_LIST, {
        variables: {
            targetUser: targetUser.userId,
            limit: limit

        }
    });

    const { data: totalCount } = useSubscription(SUBSCRIBE_MESSAGE_COUNT, {
        variables: {
            targetUser: targetUser.userId
        }
    });

    const [markAsRead] = useMutation(MARK_AS_READ);


    useEffect(() => {

        const checkForUnreadMessages = () => {

            return !!(data.chat_app_messages.find((msg: Message) => !msg.is_read && msg.from === targetUser.userId));

        }

        const markPageAsRead = () => {

            const messageIds = data.chat_app_messages.map((msg: Message) => (!msg.is_read && msg.from === targetUser.userId) && msg.id);

            markAsRead({
                variables: {
                    messageIds: messageIds
                }
            })

        }

        if (data && data.chat_app_messages) {

            const messageTemplateList: MessageTemplate[] = data.chat_app_messages.map((message: Message, index: number, list: Message[]) => {

                const { user_context } = message;

                const shouldAddPicture = !list[index - 1] || (list[index - 1] && list[index - 1].from !== message.from);

                const picture = user_context === 'SENDER' ? userPicture : targetUser.picture;

                const userName = user_context === 'SENDER' ? (name || email) : targetUser.userName;

                return {
                    ...message,
                    ...shouldAddPicture ? { picture, userName } : {}

                }
            })

            setChatMessages(messageTemplateList);

            setFirst(offset);

            if (checkForUnreadMessages()) {

                markPageAsRead();
            }
        }

    }, [data, offset, targetUser.userId, markAsRead, targetUser.picture, userPicture, targetUser.userName, name, email]);

    useEffect(() => {

        fetchMessages({
            variables: {
                offset: offset
            }
        })

    }, [offset, fetchMessages])

    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <h3>{`Your chat with ${targetUser.userName || targetUser.email}`}</h3>
            <DataView dataKey='id'
                layout={'list'}
                first={first}
                pt={{
                    grid: {
                        className: 'overflow-auto flex-column',
                        style: {
                            height: '500px'

                        }
                    }
                }}
                lazy
                alwaysShowPaginator={false}
                loading={loading}
                value={chatMessages}
                totalRecords={totalCount?.chat_app_messages_aggregate.aggregate.count}
                paginator rows={10} itemTemplate={messageTemplate}
                onPage={(e) => {
                    const isLastPage = e.page === (e.pageCount - 1);
                    const newLimit = isLastPage ? totalCount?.chat_app_messages_aggregate.aggregate.count - e.first : e.rows;
                    setLimit(newLimit);
                    setOffset(e.first);

                }}
            />
            <SendMessageForm targetUser={targetUser} />
        </>
    )

}

export default Messages;