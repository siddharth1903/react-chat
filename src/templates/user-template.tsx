import moment from 'moment';
import { Avatar } from 'primereact/avatar';

import { User } from '../models/user';

const userTemplate = (user: User) => {
    return (
        <div className='flex gap-2'>
            <div className='flex flex-column align-items-center'>
                <Avatar icon="pi pi-user" image={user?.picture} shape="circle" size='large' />
            </div>
            <div className='flex-column'>
                <div>
                    {user.userName || user.email}
                </div>
                <div>
                    <small className="text-500">last seen on {moment(user.lastSeen).format('MMMM Do YYYY, h:mm:ss a')}</small>
                </div>
            </div>

        </div>
    )


}

export default userTemplate;