
import moment from 'moment';
import { Button } from 'primereact/button';

import { MessageContext } from '../models/message';

const CONTEXT_STYLE_MAP = {
    'SENDER': 'end',
    'RECEIVER': 'start'
}

const CONTEXT_LABEL_MAP = {
    'SENDER': 'You',
    'RECEIVER': 'Them'
}

const messageTemplate = (messageCtxt: MessageContext) => {

    const renderId = '' + Math.floor(Math.random() * 100);

    const lastSeenOn = `On ${moment(messageCtxt.time).format('MMMM Do YYYY, h:mm:ss a')}`

    return (

        <div id={renderId} className={`flex flex-column col-12 p-1 align-items-${CONTEXT_STYLE_MAP[messageCtxt.senderOrReceiver]}`}>
            <div className="flex gap-1 align-items-center">
                <strong>{CONTEXT_LABEL_MAP[messageCtxt.senderOrReceiver] + ':'}</strong>
                <span>{messageCtxt.text}</span>
                <Button tooltipOptions={{ position: 'bottom' }} text icon="pi pi-info-circle" aria-label={lastSeenOn} tooltip={lastSeenOn}
                />
            </div>
        </div>
    )


}

export default messageTemplate;