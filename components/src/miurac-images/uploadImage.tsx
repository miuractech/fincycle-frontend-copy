import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import usePreviewImage from './hooks/previewHook';
import useStorage from './hooks/useStorage';
import { IconFileUpload, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { stateUrl } from './miurac-image';
import { useDropzone } from 'react-dropzone';
import { Button, Group, Loader, Progress, Text, useMantineTheme } from '@mantine/core';
type Props = {
  editMode: boolean;
  setUrl: React.Dispatch<React.SetStateAction<stateUrl | null>>;
  app: FirebaseApp;
  getUrl: (url: string | string[]) => unknown | void;
  updateFirestore: boolean;
  allowMultiple: boolean;
  count?: (current: number, total: number) => void;
};

export default function UploadImage({
  editMode,
  setUrl,
  app,
  getUrl,
  updateFirestore,
  allowMultiple,
  count
}: Props) {
  const [previewUpload, setpreviewUpload] = useState<null | string>(null);
  const [progress, setProgress] = useState({
    Total: 0,
    current: 0
  })
  const user = getAuth(app).currentUser;
  const { upload, loading } = useStorage({ app, updateFirestore });
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      accept: {
        'image/*': ['.png', '.svg', '.jpg', '.jpeg'],
      },
    });
  const previewUploads = usePreviewImage(acceptedFiles[0]);

  const handlePreview = async () => {
    if (editMode) {
      setUrl({ url: previewUploads.preview, fileName: acceptedFiles[0]?.name });
    } else {
      try {
        if (allowMultiple) {
          const urls: string | string[] = [];
          let currentCount = 0
          for (const acptFile of acceptedFiles) {
            currentCount = currentCount + 1
            const url = (await upload({
              file: acptFile,
              path: `uploads/${user?.uid}/images`,
              fileName: acptFile.name,
            })) as string;
            urls.push(url);
            if (count) {
              count(currentCount, acceptedFiles.length)
              setProgress({ current: currentCount, Total: acceptedFiles.length })
            }
          }
          getUrl(urls);
        } else {
          const url = (await upload({
            file: acceptedFiles[0],
            path: `uploads/${user?.uid}/images`,
            fileName: acceptedFiles[0].name,
          })) as string;
          getUrl(url);
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };
  useEffect(() => {
    if (previewUploads.preview) {
      handlePreview();
    }
  }, [previewUploads.preview]);

  if (loading) {
    return (
      <div>
        <Progress animate value={progress.current / progress.Total * 100} />
        <Text align='center'>{progress.current + "/" + progress.Total}</Text>
      </div>
    )
  };
  return (
    <div>
      {previewUpload ? (
        <div>
          <img
            height={200}
            width={200}
            src={previewUpload}
            alt="uploaded img"
          />
          <div
            style={{
              display: 'flex',
              columnGap: '20px',
              justifyContent: 'center',
              paddingTop: '30px',
            }}
          >
            <Button variant="filled" onClick={() => setpreviewUpload('')}>
              Cancel
            </Button>
            <Button variant="filled">Save</Button>
          </div>
        </div>
      ) : (
        <section style={{ cursor: 'pointer' }}>
          <div
            {...getRootProps({ className: 'dropzone' })}
              style={{ height: '100%', minHeight: 300, marginTop: "50px" }}
          >
            <input {...getInputProps()} />
              <div className='flex justify-center'>
                <IconFileUpload />  
            </div>
            <Text variant="text" color={'gray'} align="center">
              click to upload or drop files to upload
            </Text>
            {fileRejections.length > 0 && (
              <Text color={'red'} align="center">
                Only Images are accepted
              </Text>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
