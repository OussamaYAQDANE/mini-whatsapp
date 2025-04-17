<template>
  <div id="list">
    <div class="discussion-div" :class="{selected: selected == i}"  v-for="(discussion, i) in discussions" :key="i" @click="selectDiscussion(i)">
        <discussion-div :discussion="discussion"  />
    </div>
    
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue';
import DiscussionDiv from './DiscussionDiv.vue';
const selected = ref(0);
function selectDiscussion(index){
    selected.value = index;
}
const discussions = [
    {
        couple: ["uid_123", "uid_456"],
        uid1: "uid_123",
        uid2: "uid_456",
        lastMessage: {
            content: "Yo, u still up? 😴",
            time: "2025-04-17T03:21:00Z",
            sender: "uid_123",
            seen: true
        },
        firstName: "Lina",
        lastName: "Benzakour",
        profilePic: "https://picsum.photos/id/237/200/300"
    },
    {
        couple: ["uid_789", "uid_101"],
        uid1: "uid_789",
        uid2: "uid_101",
        lastMessage: {
            content: "On God that omg omg omg omg ogmo osklhf fsdklfhdkfh niga niga niga hkh  dkhfkdhfd fdkfhdfhdf dk hff k was a W take 💯",
            time: "2025-04-17T01:15:00Z",
            sender: "uid_101",
            seen: false
        },
        firstName: "Youssef",
        lastName: "Amrani",
        profilePic: "https://picsum.photos/id/237/200/300"
    },
    {
        couple: ["uid_202", "uid_303"],
        uid1: "uid_202",
        uid2: "uid_303",
        lastMessage: {
            content: "Lemme cook 👨‍🍳🔥",
            time: "2025-04-16T22:45:00Z",
            sender: "uid_202",
            seen: true
        },
        firstName: "Nour",
        lastName: "El Idrissi",
      
    },
    {
        couple: ["uid_404", "uid_505"],
        uid1: "uid_404",
        uid2: "uid_505",
        lastMessage: {
            content: "Bro went ghost 💀💀",
            time: "2025-04-16T20:30:00Z",
            sender: "uid_505",
            seen: false
        },
        firstName: "Amine",
        lastName: "Zahidi",
        
    }
];

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
    border-right: 0.1px solid #86a2ae;
}
.discussion-div{
    border-left: 3px solid transparent;
    transition: all 0.3s ease;
}
.discussion-div:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.selected{
    border-left: 3px solid #a309d2;
    transition: all 0.1s ease-in-out;
}
.selected {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>