import { useLazyQuery, useQuery } from '@apollo/client';
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';

import { GET_MESSAGE_COUNT } from '../../../graphql/queries/get-message-count';
import { GET_MESSAGE_LIST } from '../../../graphql/queries/get-message-list';
import { MessageContext } from '../../../models/message';
import { User } from '../../../models/user';
import messageTemplate from '../../../templates/message-template';
import SendMessageForm from '../form';


interface ComponentProps {
    targetUser: User;
}

const Messages: React.FC<ComponentProps> = ({ targetUser }) => {

    const [chatMessages, setChatMessages] = useState<MessageContext[] | []>([]);

    const [first, setFirst] = useState(0);

    const [offset, setOffset] = useState(0);

    const [fetchMessages, { error, loading, data }] = useLazyQuery(GET_MESSAGE_LIST, {
        variables: {
            targetUser: targetUser.userId
        }
    });

    const { data: totalCount, loading: countLoading } = useQuery(GET_MESSAGE_COUNT, {
        variables: {
            targetUser: targetUser.userId
        }
    });

    useEffect(() => {

        if (data && data.chat_app_messages) {

            setChatMessages(data.chat_app_messages);

            setFirst(offset)
        }

    }, [data, offset, targetUser.userId]);

    useEffect(() => {

        fetchMessages({
            variables: {
                offset: offset
            }
        })

    }, [offset, fetchMessages])

    if (countLoading) return <p>Loading Messages...</p>;

    if (error) return <p>Error : {error.message}</p>;


    return (
        <>
            <h3>{`Your chat with ${targetUser.userName || targetUser.email}`}</h3>
            <DataView dataKey='id'
                first={first}
                pt={{
                    grid: {
                        className: 'overflow-auto',
                        style: {
                            height: '500px'
                        }
                    }
                }}
                lazy
                loading={loading}
                value={chatMessages}
                totalRecords={totalCount?.chat_app_messages_aggregate.aggregate.count}
                paginator rows={30} itemTemplate={messageTemplate}

                onPage={(e) => setOffset(e.page * e.rows)}
            />
            <SendMessageForm targetUser={targetUser} />
        </>
    )

}

export default Messages;