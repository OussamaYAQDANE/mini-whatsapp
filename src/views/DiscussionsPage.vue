<template>
  <div style="display: flex;  height: 100%;">
    <discussions-list style="width: 40%; height: 100%; " />
    <discussion-messages />
  </div>
</template>

<script setup>
/* eslint-disable */
import DiscussionsList from "@/components/DiscussionsList.vue";
import DiscussionMessages from "@/components/DiscussionMessages.vue";
import { ref, provide } from "vue";

const selectedDiscussion = ref('');

provide('selectedDiscussion', selectedDiscussion);


</script>

<style>

</style>