<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <div
      class="this d-flex align-items-center justify-content-center"
      style="height: 100%; width: 100%"
      v-if="isLoading"
    >
      <loading-spinner />
    </div>

    <div class="this" v-show="!isLoading">
      <message-div
        v-for="(message, i) in messages"
        :key="i"
        :message="message"
      />
    </div>

    <form
      class="p-3 text-light input-group"
      style="width: 100%; cursor: pointer"
      @submit.prevent="()=>{
            if (toSendMessage && discussionId) { sendDiscussionMessage(discussionId,toSendMessage); toSendMessage = ''}
        }"
    >
      <input
        type="text"
        class="form-control text-light"
        style="height: 50px"
        placeholder="Send a message"
        v-model="toSendMessage"
      />
      <button
        class="input-group-text material-icons"
        type="submit"
        style="
          font-size: 1.5em;
          color: white;
          background-color: rgb(93, 37, 130);
        "
        >send</button
      >
    </form>
  </div>
</template>

<script setup>
/* eslint-disable */
import MessageDiv from "./MessageDiv.vue";
import { ref, inject, watch, onUnmounted, onMounted, watchEffect, computed } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { onSnapshot, query, orderBy, collection } from "firebase/firestore";
import {db} from "@/firebase/firebase-config"
import { sendDiscussionMessage } from "@/utilities/composable";

const isLoading = ref(false);
const toSendMessage = ref('');

const discussionId = inject('selectedDiscussion');
let unsubscribe = ()=>{};
const messages = ref([]);

watchEffect(() => {
    unsubscribe();
    isLoading.value = true;
    messages.value = [];
  if (discussionId.value) {
    const q = computed(()=>{
      return query(
      collection(db, "discussions", discussionId.value, "messages"),
      orderBy("time")
    );
    })
    
    unsubscribe = onSnapshot(q.value, (snapshot)=>{
        onUnmounted(unsubscribe)
    if (snapshot.metadata.hasPendingWrites) return;
    snapshot.docChanges().forEach(change =>{
        const doc = change.doc.data();

        if( !messages.value.length || (messages.value.length && messages.value[0].sender !== doc.sender) ){
            doc["new_continue"] = 'new'
        } else {
            doc["new_continue"] = 'continue'
        }

        messages.value.unshift(doc)

        
    })
    isLoading.value = false;
   
    
})
  }
});

onMounted(()=>{
  
})
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