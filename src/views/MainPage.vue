<template>
  <loading-screen v-if="isLoading" />
  <div v-else class="d-flex flex-column" style="width: 100%; height: 100%; overflow: hidden;">
    <nav-bar />
    <div style="height: 100%; overflow: auto;">
        <router-view />
    </div>
    
  </div>
</template>

<script setup>
/* eslint-disable */

import { auth } from "@/firebase/firebase-config";
import router from "@/router";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from "@/components/NavBar.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import { ref } from "vue";

const isLoading = ref(true);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    router.push("/login");
    return;
  }
  isLoading.value = false;
});
</script>

<style>
</style>