<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <div
      class="this d-flex align-items-center justify-content-center"
      style="height: 100%; width: 100%"
      v-if="isLoading"
    >
      <loading-spinner />
    </div>

    <div class="this" ref="scrollRef" v-show="!isLoading">
      <message-div
        v-for="(message, i) in messages"
        :key="i"
        :message="message"
      />
    </div>

    <div
      class="p-3 text-light input-group"
      style="width: 100%; cursor: pointer"
    >
      <input
        type="text"
        class="form-control text-light"
        style="height: 50px"
        placeholder="Send a message"
        v-model="toSendMessage"
      />
      <span
        class="input-group-text material-icons"
        style="
          font-size: 1.5em;
          color: white;
          background-color: rgb(93, 37, 130);
        "
        @click="()=>{
            if (toSendMessage && discussionId) {sendDiscussionMessage(discussionId,toSendMessage)}
        }"
        >send</span
      >
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { getDiscussionMessages, sendDiscussionMessage } from "@/utilities/composable";
import MessageDiv from "./MessageDiv.vue";
import { ref, inject, watch, nextTick } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const scrollRef = ref(null);
const isLoading = ref(false);
const toSendMessage = ref('');

const discussionId = inject('selectedDiscussion');


const selectDiscussion = inject("selectedDiscussion");
watch(selectDiscussion, async () => {
  isLoading.value = true;
  await loadMessages();
  isLoading.value = false;
  scrollToBottom();
});
const messages = ref([]);
watch(messages, scrollToBottom);
async function loadMessages() {
  if (!selectDiscussion.value) return;
  messages.value = await getDiscussionMessages(selectDiscussion.value);
  
}

async function scrollToBottom() {
  await nextTick();
  scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
}
</script>

<style scoped>
.this {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  position: relative;
  scrollbar-color: #fff rgb(45, 45, 45);
  scrollbar-width: thin;
}
.form-control::placeholder {
  color: #adb5bd; /* Light gray placeholder */
}
</style>