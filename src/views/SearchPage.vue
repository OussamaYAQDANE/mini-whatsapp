<script setup>
/* eslint-disable */
import GroupCard from '@/components/GroupCard.vue';
import UserCard from '@/components/UserCard.vue';
import { ref, onMounted } from 'vue';
import { db } from '@/firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { addGroups } from '@/utilities/createGroups';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const groupSelected = ref(true);
const userSelected = ref(false);
const input = ref("");
let Loading = ref(true)
const result_of_Search = ref([]);

const switchToGroups = () => {groupSelected.value = true; userSelected.value = false;}
const switchToUsers = () => {groupSelected.value = false; userSelected.value = true;}

onMounted(async () => {
    const snapShot = await getDocs(collection(db, "users"));
    result_of_Search.value = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(result_of_Search);
    Loading.value = false;
})

onMounted(async ()=>{
    const snaptShot = await getDocs(collection(db, "groups"))
    result_of_Search.value = snaptShot.docs.map(doc => ({id:doc.id, ...doc.data()}))
    Loading.value = false;
})

</script>

<template>
    <main>
        <div class="searchDiv">
            <div class="input-group mt-3 mb-3" style="max-width: 70%;">
                <input class="form-control text-light" type="text" v-model="input" placeholder="Search...">
                <span class="material-icons input-group-text" style="background-color: purple; color: white; font-size: 25px;">search</span>
            </div>
            <div class="type">
                <div class="groupes" @click="switchToGroups">Groupes</div>
                <div class="people" @click="switchToUsers">Users</div>
            </div>
        </div>
        <LoadingSpinner v-if="Loading"/>
        <div class="display" v-else>
            <GroupCard v-if="groupSelected" v-for="x in result_of_Search" :group="x" :key="x.id" />
            <UserCard v-if="userSelected" v-for="x in result_of_Search" :user="x" :key="x.id" />
            
        </div>
        
    </main>
</template>



<style scoped>
main {
    color: aliceblue;
    padding: 2rem;
    font-family: 'Segoe UI', sans-serif;
}

.searchDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.input-group {
    width: 100%;
    max-width: 600px;
}

.form-control {
    background-color: #1e1e2f;
    border: 1px solid #444;
    color: white;
}

.form-control:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 0.2rem rgba(124, 58, 237, 0.25);
}

.form-control::placeholder {
    color: #adb5bd;
}

.input-group-text {
    background-color: #7c3aed;
    border: none;
    color: white;
}

.type {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.type div {
    padding: 0.5rem 1rem;
    border: 1px solid #aaa;
    border-radius: 5px;
    cursor: pointer;
    background-color: #222;
    color: #fff;
    transition: 0.3s;
}

.type div:hover {
    background-color: #7c3aed;
    color: white;
}

.display {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}
</style>
