import { Select, TextInput } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@xcycle-tools/config';

export const FilterComponent = ({
  setData,
  setLoading,
}: {
  setData: any;
  loading: boolean;
  setLoading: any;
}) => {
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [filter, setFilter] = useState('searchableName');
  const [lastVisibleRecords, setlastVisibleRecords] = useState<any>([]);

  const changed = debounce((text: string) => {
    setFilterValue(text);
  }, 400);

  let unsub: Unsubscribe;
  useDidMountEffect(() => {
    setLoading(true);
    const tutorRef = collection(db, 'employees');
    if (filterValue) {
      const strlength = filterValue.length;
      const strFrontCode = filterValue.slice(0, strlength - 1);
      const strEndCode = filterValue.slice(strlength - 1, filterValue.length);
      const endcode =
        strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
      const q = query(
        tutorRef,
        where(filter, '>=', filterValue),
        where(filter, '<', endcode),
        limit(10)
      );
      unsub = onSnapshot(q, (querySnapshot) => {
        const Doc = querySnapshot.docs.map((shops: any) => ({
          ...shops.data(),
          id: shops.id,
        }));
        setData(Doc);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setlastVisibleRecords([lastVisible]);
        setLoading(false);
      });
    } else if (!filterValue || filterValue === '') {
      const first = query(tutorRef, limit(10));
      unsub = onSnapshot(first, (querySnapshot) => {
        const Doc = querySnapshot.docs.map((shop: any) => ({
          ...shop.data(),
          id: shop.id,
        }));
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setlastVisibleRecords([...lastVisibleRecords, lastVisible]);
        setData(Doc);
        setLoading(false);
      });
    }

    return () => unsub();
  }, [filterValue]);

  return (
    <div className="flex gap-x-3">
      <Select
        value={filter}
        placeholder="Pick one"
        onChange={(e) => e && setFilter(e)}
        data={[
          { value: 'searchableName', label: 'Name' },
          { value: 'email', label: 'Email' },
        ]}
      />
      <TextInput
        className="grow"
        onChange={(e) => changed(e.target.value.toLocaleLowerCase())}
        placeholder="search"
      />
    </div>
  );
};

const useDidMountEffect = (func: any, deps: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
