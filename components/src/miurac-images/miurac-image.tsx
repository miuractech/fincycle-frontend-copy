import { ActionIcon, AspectRatio, Button } from '@mantine/core';
import { ReactNode, useState } from 'react';
import EditImage from './editImage';
import ManageImages from './manageImages';
import './miurac-image.css';
import SimpleModal from './utils/simple-modal';
import { app, auth } from '@xcycle-tools/config';
import { IconEdit } from '@tabler/icons-react';

export type editConfigType = {
  aspectX: number;
  aspectY: number;
};
export interface MiuracImageProps {
  image?: string;
  authComponent?: React.ReactElement;
  updateFirestore: boolean;
  editConfig: editConfigType | null;
  setUrlFunc: (url: string | string[]) => unknown | void;
  buttonComponent?: ReactNode;
  minHeight?: number;
  minWidth?: number;
  allowMultiple?: boolean;
  count?: (current: number, total: number) => void;
}

export type stateUrl = { url: string; fileName: string };

export function MiuracImage({
  authComponent,
  updateFirestore,
  editConfig,
  setUrlFunc,
  buttonComponent,
  minHeight,
  minWidth,
  allowMultiple,
  image,
  count,
}: MiuracImageProps) {
  const user = auth.currentUser;
  const [url, setUrl] = useState<stateUrl | null>(null);
  const [open, setOpen] = useState(false);
  const editMode = Boolean(editConfig);

  const getUrl = (url: string | string[]) => {
    setUrlFunc(url);
    setUrl(null);
    setOpen(false);
  };
  if (user) {
    return (
      <div>
        <SimpleModal open={open} onClose={() => setOpen(false)}>
          <ManageImages
            app={app}
            updateFirestore={updateFirestore}
            editMode={editMode}
            setUrl={setUrl}
            getUrl={getUrl}
            count={count}
            allowMultiple={allowMultiple ?? false}
            optionOrder={['Uploads', 'Recent Uploads']}
          />
          {editConfig && url && url.url && (
            <SimpleModal open={Boolean(url)} onClose={() => setUrl(null)}>
              <EditImage
                url={url}
                updateFirestore={updateFirestore}
                editConfig={editConfig}
                getUrl={getUrl}
                // setUrl = {setUrl}
                app={app}
                // minHeight={minHeight}
                // minWidth={minWidth}
              />
            </SimpleModal>
          )}
        </SimpleModal>
        {image ? (
          <div className="relative max-w-xs">
            <div className="absolute right-0 top-0 z-10">
              <ActionIcon variant="filled" onClick={() => setOpen(true)}>
                <IconEdit />
              </ActionIcon>
            </div>
            <AspectRatio maw={320} mah={320} >
            <img src={image} className="w-full" alt="" />
            </AspectRatio>
          </div>
        ) : buttonComponent ? (
          <div
            // style={{ display: 'inline-block' }}
            onClick={() => setOpen(true)}
          >
            {buttonComponent}
          </div>
        ) : (
          <Button variant="filled" onClick={() => setOpen(true)}>
            Upload Image
          </Button>
        )}
      </div>
    );
  } else {
    return authComponent ?? <>You're not authenticated</>;
  }
}

export default MiuracImage;
