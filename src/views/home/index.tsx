import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { useState } from 'react';

import { User } from '../../models/user';
import Messages from '../messages/main';
import Users from '../users';



const Home = () => {

    const [targetUser, setTargetUser] = useState<User | undefined>();

    const { user, logout } = useAuth0();

    return (
        <div className="grid h-full">
            <div className="col">
                <div className="flex flex-column gap-2 align-items-center">
                    <Avatar icon="pi pi-user" image={user?.picture} size="xlarge" shape="circle" />
                    <div>{user?.name}</div>
                    <div>{user?.email}</div>
                    <div><Button onClick={() => logout({ logoutParams: { returnTo: window.location.href } })}>Logout</Button></div>
                </div>
            </div>
            <div className="col">
                <Users selectedUser={targetUser} onUserSelect={setTargetUser} />
            </div>

            <div className="col flex flex-column max-h-full">
                {
                    targetUser ? <Messages targetUser={targetUser} /> : 'Please select a user to show messages'
                }

            </div>



        </div>
    )
}

export default Home;