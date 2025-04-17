/* eslint-disable */

import { doc, getDoc, getDocs, collection, where, query, arrayUnion, arrayRemove, serverTimestamp, orderBy, limit } from "firebase/firestore"
import { auth, db } from "./firebase"


async function getUserById(uid){
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc;
}

async function getMyDiscussions(){
    const q = query(collection(db, "discussions"), where("couple", "array-contains", auth.currentUser.uid), orderBy("lastMessage.time"));
    const discussionsSnapshot = await getDocs(q);
    
    const discussions = [];
    
    discussionsSnapshot.forEach(doc =>{
        discussions.push({id: doc.id, ...doc.data()});
    })
    
    return discussions;
}

async function getMyGroups(){
    const q = query(collection(db, "groups"), where("members", "array-contains", auth.currentUser.uid), orderBy("lastMessage.time"));
    const groupsSnapshot = await getDocs(q);
    
    const groups = [];

    groupsSnapshot.forEach(doc => {
        groups.push({id: doc.id, ...doc.data()});    
    })
    
    return discussions;
}

async function getGroupMessages(){
    

}
