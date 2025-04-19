<template>

  <div id="list">
    
    <loading-spinner v-show="!done" />
    
    <div class="discussion-div" :class="{selected: selectedDiscussion == discussion.id}"  v-for="discussion in discussions" :key="discussion.id" @click="selectDiscussion(discussion.id)">
        <discussion-div :discussion="discussion"  />
    </div>
    
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, inject, onUnmounted } from 'vue';
import DiscussionDiv from './DiscussionDiv.vue';
import {getUserById } from '@/utilities/composable';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';
import LoadingSpinner from './LoadingSpinner.vue';

const selectedDiscussion = inject('selectedDiscussion');
// const groupsOrDiscussions = inject('groupsOrDiscussions');

function selectDiscussion(id){
    selectedDiscussion.value = id;
    
}

const discussions = ref([])
let done = ref(false);

const q = query(collection(db, "discussions"), where("couple", "array-contains", auth.currentUser.uid), orderBy("lastMessage.time", "desc"));
const unsubscribe = onSnapshot(q, async(snapshot)=>{
  if (snapshot.metadata.hasPendingWrites){
    return
  }

    const temp = [];

    snapshot.forEach(doc =>{
        temp.push({id: doc.id, ...doc.data()});
    })

    let promises = [];
    temp.forEach((e)=>{
        let otherUid = auth.currentUser.uid === e.couple[0]? e.couple[1]: e.couple[0];
        promises.push(getUserById(otherUid));
    })
    promises = await Promise.all(promises);
    
    promises.forEach((e, i)=>{
        temp[i]["firstName"] = e.firstName;
        temp[i]["lastName"] = e.lastName;
        temp[i]["profilePic"] = e.profilePic;
    })

    discussions.value = temp;
    console.log(temp);
    if (done.value) return;
    selectedDiscussion.value = discussions.value[0]? discussions.value[0].id: '';
    done.value = true;
  });

 

onUnmounted(unsubscribe)
</script>

<style scoped>
#list{
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    scrollbar-width: thin;
    overflow: auto;
    height: 100%;
    scrollbar-color: #fff rgb(45, 45, 45);
    
}
.discussion-div{
    border-left: 3px solid transparent;
    transition: all 0.3s ease;
}
.discussion-div:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.selected{
    border-left: 3px solid rgb(163, 9, 210);
    transition: all 0.1s ease-in-out;
}
.selected {
  background-color: rgba(255, 255, 255, 0.1);
}

</style>