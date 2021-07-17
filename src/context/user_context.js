import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
	const { user, loginWithRedirect, logout } = useAuth0();

	const [myUser, setMyUser] = useState(false);

	useEffect(() => {
		setMyUser(user);
	}, [user]);

	return (
		<UserContext.Provider value={{ user, loginWithRedirect, logout, myUser }}>
			{children}
		</UserContext.Provider>
	);
};
// make sure use
export const useUserContext = () => {
	return useContext(UserContext);
};
