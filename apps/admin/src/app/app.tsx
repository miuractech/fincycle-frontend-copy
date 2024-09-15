import { Suspense, useEffect } from 'react';
import AdminAuth from '../UserAuth/index.ui';
import { store } from './store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@xcycle-tools/config';
import { LoadingOverlay } from '@mantine/core';
import CompanyRegistration from '../companyProfile';
import { getCompanyProfile } from '../companyProfile/form';
import { NavBar } from '../navbar/Topbar';
import { Route, Routes } from 'react-router-dom';
import { BalanceSheet, Dashboard, Journals, Ledgers, Transactions } from '@xcycle-tools/financial-statement';
import { Employee } from '../EmployeeManagement';
export function App() {
  const { user, setUser, companyProfile, setCompany } = store();
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      setUser(cred);
      if (cred) {
        const companyProfile = await getCompanyProfile(cred.uid);
        setCompany(companyProfile);
      }
    });
    return () => Unsubscribe();
  }, []);

  if (user === undefined) return <LoadingOverlay visible />;
  else if (!user)
    return (
      <Suspense fallback={<LoadingOverlay visible />}>
        <AdminAuth />
      </Suspense>
    );
  else if (companyProfile === undefined) return <LoadingOverlay visible />;
  else if (user && !companyProfile)
    return (
      <div>
        {/* <img src={LOGO} className="m-4 h-16 block mx-auto" alt="" /> */}
        <CompanyRegistration />
      </div>
    );
  return (
    <NavBar>
      <Routes>
        <Route element={<Employee />} path="/" />
        <Route
          element={<Transactions companyId={companyProfile?.id ?? ''} />}
          path="txn"
        />
        <Route
          element={<Ledgers companyId={companyProfile?.id ?? ''} />}
          path="ledger"
        />
        <Route
          element={<Journals companyId={companyProfile?.id ?? ''} />}
          path="journal"
        />
        <Route
          element={<Dashboard />}
          path="visualize"
        />
        <Route
          element={<BalanceSheet companyId={companyProfile?.id ?? ''} />}
          path="reports"
        />
         <Route
          element={<CompanyRegistration editMode={true} />}
          path="settings"
        />
      </Routes>
    </NavBar>
  );
}

export default App;
