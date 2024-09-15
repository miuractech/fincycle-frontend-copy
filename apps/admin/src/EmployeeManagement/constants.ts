import { db } from "@xcycle-tools/config";
import { collection } from "firebase/firestore";

export const staffCollection = collection(db, 'employees')