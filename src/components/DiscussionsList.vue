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
import { getMyDiscussions } from '@/utilities/composable';
import { auth } from '@/firebase/firebase-config';

const selected = ref(0);
function selectDiscussion(index){
    selected.value = index;
}
const discussions = ref([])

async function loadDiscussions(){
    discussions.value = await getMyDiscussions()
    console.log(auth.currentUser.uid);
    console.log(discussions.value);
}

loadDiscussions()


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