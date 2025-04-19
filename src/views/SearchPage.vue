<script setup>
    /* eslint-disable */
    import GroupCard from '@/components/GroupCard.vue';
    import UserCard from '@/components/UserCard.vue';
    import {ref} from 'vue';
    import { db } from '@/firebase/firebase-config';
    import { collection, getDocs } from 'firebase/firestore';
    import { addGroups } from '@/utilities/createGroups';
    const groupSelected = ref(false);
    const userSelected = ref(true);
    const input = ref("");
    const result_of_Search = await getDocs(collection(db, "users"));



</script>

<template>
    <main>
        <div class="searchDiv">
            <div class="search"> 
                <input type="text" v-model="input">
                <span>🔎</span>
            </div>
            <div class="type">
                <div class="groupes">Groupes</div>
                <div class="people">Users</div>
            </div>
        </div>

        <div class="display">
            <GroupCard v-if="groupSelected" v-for="x in result_of_Search" :key="x.id"/>
            <UserCard v-if="userSelected" v-for="x in result_of_Search" :key="x.id"/>
        </div>

    </main>
</template>



<style scoped>
    main{
        color: aliceblue;
    }
</style>