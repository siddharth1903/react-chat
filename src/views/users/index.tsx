import { DataView } from 'primereact/dataview';
import { GET_USER_LIST } from '../../queries/getUserList';
import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from 'primereact/avatar';
import moment from 'moment';


interface User {
    userId: string;
    userName: string;
    lastSeen: Date;
    email: string;
    picture: string;
}

const Users = () => {

    const { user } = useAuth0();

    const { loading, error, data } = useQuery(GET_USER_LIST, {
        variables: {
            userId: user?.sub
        }
    });

    const userTemplate = (user: User) => {
        return (
            <div className='grid'>
                <div className='col-12 md:col-2 flex flex-column align-items-center'>
                    <Avatar icon="pi pi-user" image={user?.picture} shape="circle" />
                </div>
                <div className='col'>
                    <div>
                        {user.userName || user.email}
                    </div>
                    <div>
                        <small>last seen on {moment(user.lastSeen).format('MMMM Do YYYY, h:mm:ss a')}</small>
                    </div>
                </div>

            </div>
        )


    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return <DataView value={data.chat_app_users} itemTemplate={userTemplate}></DataView>
};

export default Users;