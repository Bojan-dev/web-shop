import { auth } from '../config/firebaseConfig';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminsRef } from '../config/firebaseConfig';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';

type AdminsUids = {
  uids: string[];
};

const userInitialValue = {
  email: '',
  isLoggedIn: false,
  isAdmin: false,
};

const ctxInitialValue = {
  currentUser: { email: '', isLoggedIn: false, isAdmin: false },
};

const LoginCtx = createContext(ctxInitialValue);

const LoginProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(userInitialValue);

  const adminsQuery = useFirestoreDocumentData(['admins'], adminsRef);

  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      if (adminsQuery.isSuccess) {
        const admins = adminsQuery.data as AdminsUids;

        const isUserAdmin = admins.uids.find(
          (uid) => uid === auth.currentUser?.uid
        )
          ? true
          : false;

        userData?.email
          ? setCurrentUser({
              email: userData.email,
              isLoggedIn: true,
              isAdmin: isUserAdmin,
            })
          : setCurrentUser(userInitialValue);
      }
      if (adminsQuery.isError) {
        userData?.email
          ? setCurrentUser({
              email: userData.email,
              isLoggedIn: true,
              isAdmin: false,
            })
          : setCurrentUser(userInitialValue);
      }
    });
  }, [adminsQuery.data, adminsQuery.isError, adminsQuery.isSuccess]);

  return (
    <LoginCtx.Provider value={{ currentUser }}>{children}</LoginCtx.Provider>
  );
};

export default LoginProvider;

export const useGetCurrentUser = () => {
  const { currentUser } = useContext(LoginCtx);

  return currentUser;
};
