<script setup>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import defaultProfil from '@/assets/default-profile.png';
import {ref, onMounted} from 'vue';
import {getDoc, doc} from 'firebase/firestore';
import {db} from '@/firebase/firebase-config.js'
import { useRoute } from 'vue-router';

const route  = useRoute();
const search_for = route.params.id;
let isLoading = ref(false);
const docs = ref(null);
onMounted(async ()=>{
    isLoading.value = true;
    const docRef = doc(db,'groups', search_for);
    const docSnap = await getDoc(docRef);
    docs.value = docSnap.data();
    isLoading.value = false;
})
</script>
<template>
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
      <div>
        <div>
            <img :src="docs.icon ? docs.icon : defaultProfil"
            style="
              width: 200px;
              height: 200px;
              aspect-ratio: 1;  
              object-fit: cover;
              object-position: center;
              border-radius: 50%;
              overflow: hidden;
            "
            >
        </div>
      </div>
</template>
<style> 

</style>