import { Button, Center, LoadingOverlay } from '@mantine/core';
import {
  AddNewInvoice,
  EditInvoice,
  Invoice,
  Journals,
  Ledgers,
  Transactions,
} from '@xcycle-tools/financial-statement';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserAuth from '../UserAuth/index.ui';
import { auth, db } from '@xcycle-tools/config';
import { store } from './store';
import { collection, doc, getDoc } from 'firebase/firestore';
import { EmployeeProfile } from '@xcycle-tools/types';
import { NavBar } from '../navbar/Topbar';
export function App() {
  const { user, setUser, setEmployee, employeeProfile } = store();
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      setUser(cred);
      if (cred?.email) {
        getDoc(doc(collection(db, 'employees'), cred.email)).then((snap) => {
          if (snap.exists()) {
            setEmployee(snap.data() as EmployeeProfile);
          } else {
            setEmployee(null);
          }
        });
      }
    });
    return () => Unsubscribe();
  }, []);
  console.log(user);

  if (user === undefined) return <LoadingOverlay visible />;
  else if (!user)
    return (
      <Suspense fallback={<LoadingOverlay visible />}>
        <UserAuth />
      </Suspense>
    );
  else if (employeeProfile === undefined) return <LoadingOverlay visible />;
  else if (!employeeProfile || !employeeProfile?.enabled)
    return (
      <Center h={'100vh'}>
        Contact Administrator for Access
        <Button onClick={() => signOut(auth)}>Signout</Button>
      </Center>
    );
  return (
    <NavBar>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Transactions
                companyId={employeeProfile.companyId}
                employeeId={user.uid}
                employeeProfile={employeeProfile}
              />
            }
          />
          <Route
            path="add"
            element={
              <AddNewInvoice
                companyId={employeeProfile.companyId}
                employeeId={user.uid}
              />
            }
          />
          <Route path="edit/:invoiceId" element={<Invoice />} />
          <Route path="invoice/:invoiceId" element={<Invoice />} />
        </Route>
        <Route
          element={<Ledgers companyId={employeeProfile.companyId} />}
          path="ledger"
        />
        <Route
          element={<Journals companyId={employeeProfile.companyId} />}
          path="journal"
        />
      </Routes>
    </NavBar>
  );
}

export default App;
