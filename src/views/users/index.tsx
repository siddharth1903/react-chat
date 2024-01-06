import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { ListBox } from 'primereact/listbox';
import { Dispatch, SetStateAction } from 'react';

import { GET_USER_LIST } from '../../graphql/queries/getUserList';
import { User } from '../../models/user';
import userTemplate from '../../templates/user-template';


interface ComponentProps {
    selectedUser: User | undefined;
    onUserSelect: Dispatch<SetStateAction<User | undefined>>;
}

const Users: React.FC<ComponentProps> = ({ onUserSelect }) => {

    const { user } = useAuth0();

    const { loading, error, data } = useQuery(GET_USER_LIST, {
        variables: {
            userId: user?.sub
        }
    });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <h3 className="text-center">List of users </h3>
            <ListBox value="" onChange={(e) => onUserSelect(e.value)} dataKey='userId' options={data.chat_app_users} itemTemplate={userTemplate} filter filterBy='userName,email'></ListBox>
        </>

    )
};

export default Users;