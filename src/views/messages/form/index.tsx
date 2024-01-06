import { useMutation } from '@apollo/client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SEND_MESSAGE } from '../../../graphql/mutation/send-message';
import { User } from '../../../models/user';

interface ComponentProps {
    targetUser: User;
}

interface ChatFormInput {
    messageText: string;
}

const SendMessageForm: React.FC<ComponentProps> = ({ targetUser }) => {

    const { register, handleSubmit, reset, formState: { isSubmitSuccessful }, formState } = useForm<ChatFormInput>();

    const [sendMessage] = useMutation(SEND_MESSAGE);

    const onSubmit: SubmitHandler<ChatFormInput> = (data: ChatFormInput) => {

        formState
        sendMessage({
            variables: {
                targetUser: targetUser.userId,
                messageText: data.messageText
            }
        })
    }

    useEffect(() => {

        if (isSubmitSuccessful) {
            reset({
                messageText: ''
            })
        }

    }, [isSubmitSuccessful, reset])

    return (

        <form className="flex gap-2 flex-none" onSubmit={handleSubmit(onSubmit)}>
            <InputText {...register('messageText')} className="flex-1" placeholder="Type your message here..." />
            <Button type="submit" disabled={!formState.isDirty || !formState.isValid} icon="pi pi-check" aria-label="Send Message" title="Send Message"></Button>
        </form>

    )
}

export default SendMessageForm;
