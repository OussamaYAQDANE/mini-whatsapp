<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
/* eslint-disable */

import { auth } from '@/firebase/firebase-config';
import router from '@/router';
import { onAuthStateChanged } from 'firebase/auth';


onAuthStateChanged(auth, async (user)=>{
    if (!user){
        router.push('/login');
        return
    }
})

</script>

<style>

</style>