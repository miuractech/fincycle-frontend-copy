import { useState } from 'react';
import Cropper from 'react-easy-crop';
import './image-crop-input.css';
import { dataURLtoFile } from './hooks/dataURLtoFile';
import { editConfigType, stateUrl } from './miurac-image';
import getCroppedImg from './utils/cropImage';
import useStorage from './hooks/useStorage';
import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Button } from '@mantine/core';

type Props = {
  url: stateUrl;
  editConfig: editConfigType;
  getUrl: (url: string) => unknown | void;
  app: FirebaseApp;
  updateFirestore: boolean;
};

type crop = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export default function EditImage({
  url,
  editConfig,
  getUrl,
  app,
  updateFirestore,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [cropped, setCropped] = useState<null | crop>(null);
  const { upload, progress, loading } = useStorage({ app, updateFirestore });
  const onCropComplete = (__: crop, croppedAreaPixels: crop) => {
    setCropped(croppedAreaPixels);
  };

  //   const updateFile = async()=>{
  //       try{
  //           const updatedFile = await dataURLtoFile(croppedAreaPixels) as File
  //           console.log(updatedFile,croppedAreaPixels);
  //       }
  //       catch(err){
  //           console.log(err);
  //       }
  //   }
  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image={url.url}
          crop={crop}
          zoom={zoom}
          aspect={editConfig?.aspectX / editConfig?.aspectY}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(Number(e.target.value));
          }}
          className="zoom-range"
        />
        <Button
          disabled={loading}
          variant="filled"
          onClick={async () => {
            try {
              const croppedImage = await getCroppedImg(url.url, cropped);
              const updatedFile = (await dataURLtoFile(
                croppedImage,
                url.fileName
              )) as File;
              const user = getAuth(app).currentUser;
              const uploadedUrl = (await upload({
                file: updatedFile,
                fileName: updatedFile.name,
                path: `/uploads/${user?.uid}/images`,
              })) as string;
              getUrl(uploadedUrl);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {loading ? 'uploading...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
