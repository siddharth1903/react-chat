import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from 'primereact/avatar';
import { Button } from "primereact/button";
import Users from "../users";



const Home = () => {

    const { user, logout } = useAuth0();

    return (
        <div className="grid">
            <div className="col">
                <div className="flex flex-column gap-2 align-items-center">
                    <Avatar icon="pi pi-user" image={user?.picture} size="xlarge" shape="circle" />
                    <div>{user?.name}</div>
                    <div>{user?.email}</div>
                    <div><Button onClick={() => logout({ logoutParams: { returnTo: window.location.href } })}>Logout</Button></div>
                </div>
            </div>
            <div className="col">
                <Users />
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Home;