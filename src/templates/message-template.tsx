
import moment from 'moment';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

import { MessageTemplate } from '../models/message';


const messageTemplate = (message: MessageTemplate) => {

    const lastSeenOn = `On ${moment(message.time).format('MMMM Do YYYY, h:mm:ss a')}`

    return (

        <div className='flex flex-column col-12 p-1'>
            <div className="flex gap-3 align-items-center">
                <Avatar icon="pi pi-user" image={message.picture} imageAlt={message.userName} title={message.userName} style={
                    {
                        visibility: message.picture ? 'visible' : 'hidden'
                    }
                } shape="circle" />
                <div className='flex align-items-center'>
                    <span>{message.text}</span>
                    <Button tooltipOptions={{ position: 'bottom' }} text icon="pi pi-info-circle" aria-label={lastSeenOn} tooltip={lastSeenOn}
                    />

                </div>
            </div>
        </div>
    )


}

export default messageTemplate;