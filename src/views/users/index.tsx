import { DataView } from 'primereact/dataview';
import { GET_USER_LIST } from '../../queries/getUserList';
import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';


interface User {
    userId: string;
    userName: string;
    lastSeen: Date;
}

const Users = () => {

    const { user } = useAuth0();

    const { loading, error, data } = useQuery(GET_USER_LIST, {
        variables: {
            userId: user?.sub
        }
    });

    const userTemplate = () => {

    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return <DataView value={ } itemTemplate={ }></Dataview>
};

export default Users;