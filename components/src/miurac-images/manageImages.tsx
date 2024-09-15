import { Box, Tabs } from '@mantine/core';
import { FirebaseApp } from 'firebase/app';
import React, { useState } from 'react';
import { stateUrl } from './miurac-image';
import UploadImage from './uploadImage';
import UserImages from './userImages';
// import { TabPanel } from './utils/tabPanel';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  editMode: boolean;
  setUrl: React.Dispatch<React.SetStateAction<stateUrl | null>>;
  app: FirebaseApp;
  getUrl: (url: string | string[]) => unknown | void;
  updateFirestore: boolean;
  allowMultiple: boolean;
  optionOrder?: string[]
  count?:(current:number, total:number)=> void;
};

// eslint-disable-next-line no-empty-pattern
export default function ManageImages({
  editMode,
  setUrl,
  app,
  getUrl,
  updateFirestore,
  allowMultiple,
  optionOrder,
  count
}: Props) {

  return (
    <div>
      <Box style={{ width: '100%' }}>
        <Box style={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs defaultValue={optionOrder?optionOrder[0]:'Recent Uploads'}>
            <Tabs.List>
              {optionOrder ? (
                optionOrder.map(ord => (
                  <Tabs.Tab
                    value={ord}
                    style={(theme) => ({
                      color: 'black',
                    })}
                  >
                    {ord}
                  </Tabs.Tab>
              ))
              ): (
                  <div>
                    <Tabs.Tab
                      value="Recent Uploads"
                      style={(theme) => ({
                        color: 'black',
                      })}
                    >
                      Recent Uploads
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="Uploads"
                      style={(theme) => ({
                        color: 'black',
                      })}
                    >
                      Uploads
                    </Tabs.Tab>
                </div>
              )}
          </Tabs.List>

          <Tabs.Panel value="Recent Uploads" pt="xs">
            <UserImages
              getUrl={getUrl}
              setUrl={setUrl}
              editMode={editMode}
              app={app}
            />
          </Tabs.Panel>
          <Tabs.Panel value="Uploads" pt="xs">
            <UploadImage
              allowMultiple={allowMultiple}
              app={app}
              getUrl={getUrl}
              editMode={editMode}
              setUrl={setUrl}
              updateFirestore={updateFirestore}
              count={count}
            />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Box>
    </div >
  );
}
