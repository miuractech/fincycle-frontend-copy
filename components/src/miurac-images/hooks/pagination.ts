import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";

type loadMoreProps = {
    lastVisibleRecord: any
    setLastVisibleRecord: any
    setDosExists: any
    setImagesList: any
    queryLimit:number
    setLoading:any
}

export const usePagination = (app: FirebaseApp) => {

    const db = getFirestore(app)
    const user = getAuth(app).currentUser

    const loadMore = async ({ lastVisibleRecord, setLastVisibleRecord, setDosExists, setImagesList,queryLimit,setLoading }: loadMoreProps) => {
        setLoading(true)
        const next = query(collection(db, `uploads/${user?.uid}/images`), orderBy("createdAt", 'desc'),
            startAfter(lastVisibleRecord),
            limit(queryLimit));
        const querySnapshot = await getDocs(next);
        if (querySnapshot.size === 0) return setDosExists(false)
        else setDosExists(true)
        const doc = querySnapshot.docs.map((data) => ({ ...data.data(), id: data.id }))
        setImagesList((prev: any) => [...prev, ...doc])
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        setLastVisibleRecord(lastVisible)
        setLoading(false)
    }

    return { loadMore }
}
