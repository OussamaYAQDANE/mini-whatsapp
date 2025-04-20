<template>
  <div id="list">
    <loading-spinner v-show="!done" />
    <button class="btn btn-primary mb-2" @click="openModal = true" style="align-self: center; max-width: max-content; justify-self: end;">Create a new group</button>
    <div
      class="discussion-div"
      :class="{ selected: selectedGroup == group.id }"
      v-for="group in groups"
      :key="group.id"
      @click="selectGroup(group.id)"
    >
      <group-div :group="group" />
    </div>
    
    
  </div>

</template>
  
  <script setup>
/* eslint-disable */
import { ref, inject, onUnmounted } from "vue";
import GroupDiv from "./GroupDiv.vue";
import {} from "@/utilities/composable";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/firebase/firebase-config";
import LoadingSpinner from "./LoadingSpinner.vue";

const selectedGroup = inject("selectedGroup");

function selectGroup(id) {
  selectedGroup.value = id;
}

const openModal = inject('openModal')

const groups = ref([]);
let done = ref(false);

const q = query(
  collection(db, "groups"),
  where("members", "array-contains", auth.currentUser.uid),
  orderBy("lastMessage.time", "desc")
);
const unsubscribe = onSnapshot(q, async (snapshot) => {
  const temp = [];

  snapshot.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() });
  });

  
  groups.value = temp;
  if (done.value) return;
  selectedGroup.value = groups.value[0] ? groups.value[0].id : "";
  done.value = true;
});

onUnmounted(unsubscribe);
</script>
  
  <style scoped>
#list {
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  scrollbar-width: thin;
  overflow: auto;
  height: 100%;
  scrollbar-color: #fff rgb(45, 45, 45);
}
.discussion-div {
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}
.discussion-div:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.selected {
  border-left: 3px solid rgb(163, 9, 210);
  transition: all 0.1s ease-in-out;
}
.selected {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>