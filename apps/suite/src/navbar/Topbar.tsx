import { AppShell, Button } from '@mantine/core';
import React from 'react';
import { dcycleSquarePath } from '@xcycle-tools/components';
import { signOut } from 'firebase/auth';
import { auth } from '@xcycle-tools/config';
import { NavLink } from 'react-router-dom';
import { store } from '../app/store';

export function NavBar({ children }: { children: React.ReactNode }) {
  const {employeeProfile} = store()
  return (
    <AppShell padding={0} header={{ height: 60 }}>
      <AppShell.Header>
        <div className=" text-left flex justify-between items-center px-6">
          {/* <div /> */}
          <NavLink to={'/'}>
            <img src={dcycleSquarePath} className="p-2 pl-4" alt="dcycle" />
          </NavLink>
          <div className=" flex gap-1">
           {employeeProfile?.access !== 'employee' && <> <NavLink to={'/ledger'}>
              <Button variant="subtle">Ledger</Button>
            </NavLink>
            <NavLink to={'/journal'}>
              <Button variant="subtle">Journal</Button>
            </NavLink></>}
            <Button
              color="red"
              c={'white'}
              onClick={() => {
                signOut(auth);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </AppShell.Header>
      <div className="pt-16">{children}</div>
    </AppShell>
  );
}
