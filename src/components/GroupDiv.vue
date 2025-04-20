<template>
  <hr class="m-0" style="color: #86a2ae" />

  <div
    v-if="isLoading"
    class="container m-0 text-light d-flex flex-column"
    style="
      border-radius: 10px;
      cursor: pointer;
      height: 200px;
      justify-content: center;
      align-items: center;
    "
  >
    <loading-spinner />
  </div>
  <div
    v-else
    class="container m-0 text-light d-flex flex-row pb-0"
    style="cursor: pointer; align-items: center; justify-content: space-between"
    @click="count = 0"
  >
    <div class="d-flex flex-column mb-3">
      <div class="d-flex align-items-center mt-2">
        <div class="me-2 p-1">
          <img
            :src="group.icon ? group.icon : defaultProfile"
            style="
              width: 30px;
              height: 30px;
              aspect-ratio: 1;
              object-fit: cover;
              object-position: center;
              border-radius: 50%;
              overflow: hidden;
            "
            alt=""
          />
        </div>
        <router-link class="author" 
        :to="{ name: 'groupPage', params: { id: group.id, title: group.title } }">
  {{ group.title }}
</router-link>
        <span style="color: #86a2ae" class="m-1">•</span>
        <span class="date">{{
          props.group.lastMessage.time
            ? getTimeAgo(props.group.lastMessage.time)
            : ""
        }}</span>
      </div>
      <p class="ms-2" style="color: #b3cad5; font-size: 0.95em">
        {{
          props.group.lastMessage
            ? (group.lastMessage.sender == auth.currentUser.uid ? "You: " : "") +
              group.lastMessage.content
            : ""
        }}
      </p>
    </div>
  </div>
</template>
      
  <script setup>
/* eslint-disable */

import { defineProps } from "vue";
import defaultProfile from "@/assets/default-profile.png";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import getTimeAgo from "@/utilities/relativeTime";
import { auth } from "@/firebase/firebase-config";
const props = defineProps({
  group: Object,
});
</script>
      
      
  <style scoped>
.overlay {
  background-color: rgba(255, 255, 255, 0.1);
}

.author {
  color: #b3cad5;
  font-weight: bold;
  font-size: 0.9em;
}

.date {
  color: #86a2ae;
  font-size: 0.8em;
}
p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0 !important;
  word-break: break-all;
}

.new-messages {
  background-color: rgb(139, 21, 174);
  width: 30px;
  height: 30px;
  aspect-ratio: 1/1;
  justify-content: center;
  align-items: center;
}

.author{
  text-decoration: none;
}

.author:hover{
  text-decoration: underline;
}
</style>