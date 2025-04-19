<template>
  <div style="display: flex;  height: 100%; width: 100%">
    <div style="height: 100; width: 40%; border-right: 0.1px solid #86a2ae;">
      <!-- <div id="tabs">
      <span class="tab selectedTab"   >Discussions</span>
      <span class="tab" @click="groupsOrDiscussions = 'groups'">Groups</span></div> -->
      <discussions-list style="width: 100%; " />
    </div>
    <div style="width: 100%;">
      <discussion-messages v-show="selectedDiscussion" />
    </div>
    
  </div>
</template>

<script setup>
/* eslint-disable */
import DiscussionsList from "@/components/DiscussionsList.vue";
import DiscussionMessages from "@/components/DiscussionMessages.vue";
import { ref, provide, watch } from "vue";

const groupsOrDiscussions = ref('discussions');
const selectedDiscussion = ref('');
const selectedGroup = ref('');

provide('selectedDiscussion', selectedDiscussion);
provide('selectedGroup', selectedGroup);
provide('groupsOrDiscussions', groupsOrDiscussions);

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