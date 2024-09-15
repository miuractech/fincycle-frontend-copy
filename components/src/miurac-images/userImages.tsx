import { Button, Card, Grid, Image, Loader, Title } from '@mantine/core';
import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { usePagination } from './hooks/pagination';
import { stateUrl } from './miurac-image';

type Props = {
  app: FirebaseApp;
  getUrl: (url: string) => void;
  setUrl: React.Dispatch<React.SetStateAction<stateUrl | null>>;
  editMode: boolean;
};

const queryLimit = 12;
export default function UserImages({ app, getUrl, setUrl, editMode }: Props) {
  const { loadMore } = usePagination(app);

  const [lastVisibleRecord, setLastVisibleRecord] = useState<any>(null);
  const [imagesList, setImagesList] = useState<any>([]);
  const [dosExists, setDosExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const db = getFirestore(app);
  const user = getAuth(app).currentUser;

  useEffect(() => {
    getRecentlyUploaded();
  }, []);

  const getRecentlyUploaded = async () => {
    const q = query(
      collection(db, `uploads/${user?.uid}/images`),
      orderBy('createdAt', 'desc'),
      limit(queryLimit)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === queryLimit) {
      setDosExists(true);
    }
    setImagesList(
      querySnapshot.docs.map((data) => ({ ...data.data(), id: data.id }))
    );
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastVisibleRecord(lastVisible);
    setLoading(false);
  };

  if (loading) return <Loader />;
  return (
    <div>
      {imagesList.length > 0 ? (
        <Grid style={{ width: '100%', height: 600, overflow: 'auto' }}>
          {imagesList.map((item: any) => (
            <Grid.Col
              key={item.id}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (editMode) {
                  setUrl({ url: item.url, fileName: item.name });
                } else {
                  getUrl(item.url);
                }
              }}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Card withBorder>
                <Image
                  radius="md"
                  src={item.url}
                  // alt="Random unsplash image"
                  // caption="My dog begging for treats"
                />
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Title align="center" order={6} color="gray">
          upload your first picture...
        </Title>
      )}
      <div ref={endRef} />
      <div style={{ display: 'flex', gap: '50px', justifyContent: 'center' }}>
        {dosExists && (
          <Button
            variant="filled"
            onClick={() =>
              loadMore({
                lastVisibleRecord,
                setLastVisibleRecord,
                setDosExists,
                setImagesList,
                queryLimit,
                setLoading,
              })
            }
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
