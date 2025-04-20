<template>
  <div style="display: flex;  height: 100%; width: 100%">
    <div style="height: 100; width: 40%; border-right: 0.1px solid #86a2ae; display: flex; flex-direction: column;">
      <div id="tabs">
      <span class="tab" :class="selectedTab === 'discussions' ? 'selectedTab': ''" @click="selectedTab = 'discussions'" >Discussions</span>
      <span class="tab" :class="selectedTab === 'groups' ? 'selectedTab': ''" @click="selectedTab = 'groups'">Groups</span></div>
      <discussions-list v-show="selectedTab === 'discussions'" style="width: 100%; " />
      <groups-list v-show="selectedTab === 'groups'" style="width: 100%; " />
    </div>
    <div style="width: 100%;">
      <discussion-messages v-show="selectedTab === 'discussions'" />
      <group-messages v-show="selectedTab === 'groups'" />
    </div>
    
  </div>
</template>

<script setup>
/* eslint-disable */
import DiscussionsList from "@/components/DiscussionsList.vue";
import GroupsList from "@/components/GroupsList.vue";
import DiscussionMessages from "@/components/DiscussionMessages.vue";
import GroupMessages from "@/components/GroupMessages.vue";
import { ref, provide, watch } from "vue";

const selectedTab = ref('discussions');
const selectedDiscussion = ref('');
const selectedGroup = ref('');



provide('selectedDiscussion', selectedDiscussion);
provide('selectedGroup', selectedGroup);




</script>

<style scoped>
.tab{
  color:#b3cad5;
  padding: 8px 12px 8px 12px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 8px 0 8px 0;
  border-radius: 20px;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.selectedTab{
  background-color: rgb(81, 0, 106);
  color: rgb(243, 205, 255);
}

#tabs{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

}
</style>