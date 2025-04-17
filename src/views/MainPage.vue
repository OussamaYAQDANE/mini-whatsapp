<template>
  <div class="d-flex flex-column" style="width: 100%; height: 100%;">
    <nav-bar />
    <router-view />
  </div>
</template>

<script setup>
/* eslint-disable */

import { auth } from '@/firebase/firebase-config';
import router from '@/router';
import { onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue';

onAuthStateChanged(auth, async (user)=>{
    if (!user){
        router.push('/login');
        return
    }
})

</script>

<style>

</style>