<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <div
      class="this d-flex align-items-center justify-content-center"
      style="height: 100%; width: 100%;"
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

    <div class="p-3 text-light input-group" style="width: 100%;" >
      <input type="text" class="form-control text-light" />
      <span class="input-group-text material-icons">send</span>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { getDiscussionMessages } from "@/utilities/composable";
import MessageDiv from "./MessageDiv.vue";
import { ref, inject, watch, nextTick } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const scrollRef = ref(null);
const isLoading = ref(false);

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
  messages.value.reverse();
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
</style>