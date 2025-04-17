/* eslint-disable */

import { doc, getDoc, getDocs, collection, where, query, arrayUnion, arrayRemove, serverTimestamp, orderBy, limit } from "firebase/firestore"
import { auth, db } from "../firebase/firebase-config"


async function getUserById(uid){
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.data();
}

async function getMyDiscussions(){
    const q = query(collection(db, "discussions"), where("couple", "array-contains", auth.currentUser.uid), orderBy("lastMessage.time"));
    const discussionsSnapshot = await getDocs(q);
    
    const discussions = [];
    
    discussionsSnapshot.forEach(doc =>{
        discussions.push({id: doc.id, ...doc.data()});
    })
    let promises = [];
    discussions.forEach((e)=>{
        let otherUid = auth.currentUser.uid === e.couple[0]? e.couple[1]: e.couple[0];
        promises.push(getUserById(otherUid));
    })
    promises = await Promise.all(promises);
    console.log(promises);
    
    promises.forEach((e, i)=>{
        discussions[i]["firstName"] = e.firstName;
        discussions[i]["lastName"] = e.lastName;
        discussions[i]["profilePic"] = e.profilePic;
    })
    return discussions;

    // discussions[i] = {
    //     couple: [],
    //     uid1: "skhkhsk",
    //     uid2: "dkhklhd", 
    //     lastMessage: {},
    //     firstName: "",
    //     lastName: "",
    //     profilePic: ""
    // }
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

export {getMyGroups, getUserById, getMyDiscussions}
