import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Card,
  Drawer,
  TextInput,
} from '@mantine/core';
import React, { useState } from 'react';
import LeftBar from './leftBar';
import { useMediaQuery } from '@mantine/hooks';
import {
  XcycleLogoPath,
} from '@xcycle-tools/components';
import { IconSend } from '@tabler/icons-react';

export function NavBar({ children }: { children: React.ReactNode }) {
  const [tooglesize, setTooglesize] = useState(true);
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  return (
    <AppShell padding={0} header={{ height: 60 }}>
      <AppShell.Navbar bg={'#fff'} className="h-full ">
        <LeftBar
          tooglesize={tooglesize}
          setTooglesize={setTooglesize}
          open={open}
          setOpen={setOpen}
        />
      </AppShell.Navbar>
      <AppShell.Header bg={'#011629'}>
        <div className=" text-left flex justify-between items-center px-4">
          {/* <div /> */}
          <img src={XcycleLogoPath} className="p-2 pl-4 h-14" alt="dcycle" />
          {!mediaQuery && (
            <Burger
              opened={open}
              onClick={() => setOpen((o) => !o)}
              color="white"
            />
          )}
          <Button onClick={() => setChatOpen(true)}>Ask AI</Button>
          <Drawer
            position="right"
            styles={{
              title: { fontWeight: 600, textAlign: 'center', width: '100%' },
            }}
            title="Chat With your Financial Data"
            onClose={() => setChatOpen(false)}
            opened={chatOpen}
          >
            <div className="h-full ">
              <div className="bottom-4 h-[calc(100vh_-_100px)] flex flex-col justify-end items-end">
                <div className="w-full grid gap-2">
                  <Card withBorder bg={'#e0e0e0'} className="cursor-pointer">
                    How much Tax I have to pay this month?
                  </Card>

                  <Card withBorder bg={'#e0e0e0'} className="cursor-pointer">
                    What expenses has steadily increased in past 3 months?
                  </Card>

                  <Card withBorder bg={'#e0e0e0'} className="cursor-pointer">
                    What is the total EMI paid in last year?
                  </Card>

                  <TextInput
                    size="lg"
                    bg={'#f0ff8f'}
                    styles={{
                      input: { backgroundColor: '#f0f8ff' },
                      root: { backgroundColor: '#f0f8ff' },
                      wrapper: { backgroundColor: '#f0f8ff' },
                      section: { backgroundColor: '#f0f8ff' },
                    }}
                    className="w-full"
                    placeholder="Ask Any question"
                    rightSection={
                      <ActionIcon>
                        <IconSend />
                      </ActionIcon>
                    }
                  />
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </AppShell.Header>
      <div className="pt-20 pl-20 pr-4">{children}</div>
    </AppShell>
  );
}
