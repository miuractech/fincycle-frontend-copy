import {
  Box,
  Drawer,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBook,
  IconCashBanknote,
  IconChartBar,
  IconLoadBalancer,
  IconMenu2,
  IconSettings,
  IconTool,
  IconTransactionDollar,
  IconUser,
} from '@tabler/icons-react';
import React from 'react';
import LeftLink from './LeftLink';
import { DcycleLogo, dcycleLogoPath, dcycleSquarePath } from '@xcycle-tools/components';

type Props = {
  tooglesize: boolean;
  setTooglesize: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeftBar({
  tooglesize,
  setTooglesize,
  open,
  setOpen,
}: Props) {
  const theme = useMantineTheme();
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  return (
    <div
    // onMouseEnter={()=>setTooglesize(false)}
    // onMouseLeave={()=>setTooglesize(true)}
    >
      {mediaQuery ? (
        <Box
          style={{
            // background: '#0A2540',
            color: theme.white,
            top: 59,
            transition: 'width 0.3s',
            width: tooglesize ? 60 : 250,
            height: 'calc(100% - 60px)',
          }}
          p="md"
        >
          {!tooglesize && <img src={dcycleSquarePath} alt='dcycle' />}
          <NavSections tooglesize={tooglesize} setTooglesize={setTooglesize} />
        </Box>
      ) : (
        <Drawer
          position="right"
          // transition={"rotate-left"}
          style={{ top: 59 }}
          opened={open}
          onClose={() => setOpen(false)}
        >
          {/* <img src={dcycleLogoPath} alt='dcycle' /> */}
          <NavSections
            tooglesize={tooglesize}
            setTooglesize={setTooglesize}
            setOpen={setOpen}
          />
        </Drawer>
      )}
    </div>
  );
}

type NavSectionsType = {
  tooglesize: boolean;
  setTooglesize: any;
  setOpen?: any;
};

export function NavSections({
  tooglesize,
  setTooglesize,
  setOpen,
}: NavSectionsType) {
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  return (
    <>
      <Box component={ScrollArea} mx="-xs" px={'xs'}>
        <Box py="md">
          <LeftLink
            path={'/'}
            icon={<IconUser size={16}  />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Employees'}
            setOpen={setOpen}
            name="Employees"
          />
          <LeftLink
            path={'/txn'}
            icon={<IconTransactionDollar size={16}  />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Txn Log'}
            setOpen={setOpen}
            name="TxnLog"
          />
          <LeftLink
            path={'/journal'}
            icon={<IconCashBanknote size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Journal'}
            setOpen={setOpen}
            name="Journal"
          />
          <LeftLink
            path={'/ledger'}
            icon={<IconBook size={16}  />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Ledger'}
            setOpen={setOpen}
            name="ledgers"
          />
          <LeftLink
            path={'/visualize'}
            icon={<IconChartBar size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Charts'}
            setOpen={setOpen}
            name="Charts"
          />
          
           <LeftLink
            path={'/reports'}
            icon={<IconLoadBalancer size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Financial Reports'}
            setOpen={setOpen}
            name="Financial Reports"
          /> 
          <LeftLink
            path={'/settings'}
            icon={<IconSettings size={16} />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'CMI Settings'}
            setOpen={setOpen}
            name="settings"
          />

          {/*  <LeftLink
            path={'/payment'}
            icon={<IconCreditCard size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Payment'}
            setOpen={setOpen}
            name="Payment"
          />
          <LeftLink
            path={'/timetool'}
            icon={<IconClock size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Time Tool'}
            setOpen={setOpen}
            name="timetool"
          />
          <LeftLink
            path={'/settings'}
            icon={<IconSettings size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Settings'}
            setOpen={setOpen}
            name="Settings"
          /> */}
        </Box>
      </Box>
      {/* {mediaQuery && (
        <Box className='flex flex-row flex-grow w-full h-full' mx="-xs" px={'xs'}>
          <Box
            style={{
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 12,
              // borderTop: `1px solid blue`,
            }}
          >
            <Group className='h-full' >
              <div />
              <ActionIcon
                variant="default"
                onClick={() => {
                  setTooglesize(!tooglesize);
                  if (setOpen) setOpen(false);
                }}
                size={30}
                style={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'black',
                  },
                }}
              >
                <ThemeIcon color={'#1e1e20'} variant="light">
                  {tooglesize ? (
                    <IconChevronRight color="white" size={16} />
                  ) : (
                    <IconChevronLeft color="white" size={16} />
                  )}
                </ThemeIcon>
              </ActionIcon>
            </Group>
          </Box>
          <br />
          <Button
            leftSection={<IconLogout />}
            onClick={() => {
              signOut(auth);
            }}
            variant="white"
            fullWidth
          >
            Logout
          </Button>
        </Box>
      )} */}
    </>
  );
}
