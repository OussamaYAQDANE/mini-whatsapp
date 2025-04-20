<script setup>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import defaultProfil from '@/assets/default-profile.png';
import defaultGroupProfil from '@/assets/default-prfl.png'
import {ref, onMounted} from 'vue';
import {getDoc, doc} from 'firebase/firestore';
import {db} from '@/firebase/firebase-config.js'
import { useRoute } from 'vue-router';



const route  = useRoute();
const search_for = route.params.id;
let isLoading = ref(false);
const docs = ref([]);
const users = ref([]);
onMounted(async () => {
  isLoading.value = true;

  const docRef = doc(db, 'groups', search_for);
  const docSnap = await getDoc(docRef);
  docs.value = docSnap.data();

  users.value = []; 
  

  for (const userId of docs.value.members) {
    const docRef2 = doc(db, 'users', userId);
    users.value.push(getDoc(docRef2))
  }
  users.value = await Promise.all(temp)

  isLoading.value = false;
});
  let user_to_add = ref('');
  function add_user(){

  }
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
            <img :src="docs.icon ? docs.icon : defaultGroupProfil"
            style="
              width: 200px;
              height: 200px;
              aspect-ratio: 1/1;  
              object-fit: cover;
              object-position: center;
              border-radius: 50%;
              overflow: hidden;
              display: block;
            "
            >
            <h1>{{ docs.title }}</h1>
            <div style="display: flex; justify-content: flex-end;">{{ docs.description }}</div>
        </div>
        <div style="display: flex;">
            <div>
                <div v-for="user in users" :key="user">
                    <ul>
                        <li>
                            <img :src="user.profilPic ? user.profilPic : defaultProfil">
                            <p>{{ user.username }}</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <form @submit.prevent="add_user">
                        <input type="text" v-model="user_to_add">
                    </form>
                </div>
            </div>
        </div>
      </div>
</template>
<style> 

</style>