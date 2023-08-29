import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect,useState } from "react"; 

const Profile = ({userObj, refreshUser }) => {
    const history = useHistory();
    const [nweDisplayName, setNweDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut()
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNweDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== nweDisplayName){
            await userObj.updateProfile( {displayName : nweDisplayName });
            refreshUser();
        }
    }

    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text"
             placheholder="Display name"
             value={nweDisplayName}/>
            <input type="submit" value="Update Profile"/>
        </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
};

export default Profile; 