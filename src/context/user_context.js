import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
	const { user, isAuthenticated, isLoading, error, loginWithRedirect, logout } = useAuth0();

	const [myUser, setMyUser] = useState(false);

	useEffect(() => {
		if (isAuthenticated) setMyUser(user);
		else setMyUser(false);
	}, [isAuthenticated]);

	return (
		<UserContext.Provider
			value={{ user, isAuthenticated, isLoading, error, loginWithRedirect, logout, myUser }}
		>
			{children}
		</UserContext.Provider>
	);
};
// make sure use
export const useUserContext = () => {
	return useContext(UserContext);
};
