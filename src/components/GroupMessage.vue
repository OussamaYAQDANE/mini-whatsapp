<template>
  <div
    class="message_box"
    :class="message.sender === auth.currentUser.uid ? 'even' : 'odd'"
  >
    <div class="message" :class="message.new_continue">
      <div v-if="message.new_continue === 'new'" style="display: flex; align-items: center;" class="sender-div">
        <img
          :src="message.profilePic ? message.profilePic : defaultProfile"
          style="
            width: 35px;
            height: 35px;
            aspect-ratio: 1/1;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 8px;
          "
          alt=""
        />
        <div style="display: flex; flex-direction: column"
        @click="$router.push(`/profile/${message.sender}`)"
        >
          <span class="fullname">{{ message.fullName }}</span>
          <span class="username">{{
            message.username ? '@'+message.username : ""
          }}</span>
        </div>
      </div>
      <p class="message_text">{{ message.content }}</p>
      <div
        class="d-flex justify-content-end"
        style="display: flex; justify-content: end; width: 100%"
      >
        <p class="time">{{ formatChatTimestamp(message.time.toDate()) }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
/* eslint-disable */
import { defineProps } from "vue";
import { auth } from "@/firebase/firebase-config";
import { formatChatTimestamp } from "@/utilities/composable";
import defaultProfile from "@/assets/default-profile.png";
defineProps({
  message: Object,
});
</script>
  
  <style scoped>
.message {
  display: flex;
  flex-direction: column;
  background-color: rgb(93, 37, 130);
  padding: 8px 8px 0 8px;
  margin: 1px 5px 1px 5px;
  width: fit-content;
  max-width: 70%;
  border-radius: 10px;
  height: fit-content;
  position: relative;
  word-break: break-word;
  overflow-wrap: break-word;
}
.time {
  font-size: 12px;
  color: #b5b5b5;
  margin-bottom: 4px;
}

.message_text {
  color: hsl(199, 27%, 90%);
  margin-bottom: 1px;
  overflow: hidden;
  font-size: 0.93em;
}

.message_box {
  width: 100%;
  display: flex;
  height: fit-content;
  margin-bottom: 0;
}
.even {
  justify-content: flex-end;
}
.even .message {
  background-color: rgb(19, 77, 55);
  margin-right: 20px;
}

.odd .message {
  margin-left: 20px;
}
.odd .new::after {
  content: "";
  position: absolute;
  top: 0;
  left: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid rgb(93, 37, 130);
}
.even .new::after {
  content: "";
  position: absolute;
  top: 0;
  right: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid rgb(19, 77, 55);
}
.continue {
  min-width: 50px;
}
.new {
  margin-top: 5px;
}

.fullname{
  color: hsl(0, 0%, 88%);
  font-size: 0.9em;
  font-weight: bold;
  line-height: 1.1;
}
.username{
  font-size: 0.7em;
  color: hsl(0, 0%, 80%);
  line-height: 1;
}

.sender-div{
    margin-bottom: 4px;
}
.sender-div:hover{
    cursor: pointer;
    
}

.sender-div:hover .username,.sender-div:hover .fullname{
    text-decoration: underline;
}
</style>