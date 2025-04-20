<script setup>
/* eslint-disable */
import { db } from '@/firebase/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import defaultProfile from '@/assets/default-profile.png'
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const route = useRoute();
const target = route.params.id;
const user = ref({})
const isLoading = ref(false)

async function loadProfile() {
    isLoading.value = true;
    const SnapDoc = await getDoc(doc(db, "users", target));
    user.value = SnapDoc.data()
    isLoading.value = false
}
loadProfile()
</script>
<template>
    <div v-if="isLoading" style="display: flex; width: 100%; height: 100%; justify-content: center; align-items: center;">
        <loading-spinner />
    </div>
    <div v-else class="profile-container">
        <div class="profile-header">
            <img :src="user.profilePic ? user.profilePic : defaultProfile" :alt="`${user.firstName}'s profile picture`"
                class="profile-pic">
            <div class="profile-info">
                <h1 class="name">{{ user.firstName }} {{ user.lastName }}</h1>
                <p class="username">@{{ user.username }}</p>
            </div>
        </div>

        <div class="bio-section">
            <h2 class="section-title">About Me</h2>
            <p class="bio-content">{{ user.bio }}</p>
        </div>
    </div>
</template>

<style scoped>
.profile-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.profile-pic {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #f0f0f0;
}

.profile-info .name {
    font-size: 2rem;
    margin: 0;
    color: #2c3e50;
}

.profile-info .username {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin: 0.5rem 0 0;
}

.bio-section {
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-radius: 10px;
}

.section-title {
    font-size: 1.5rem;
    color: #34495e;
    margin: 0 0 1rem;
}

.bio-content {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
    margin: 0;
    white-space: pre-wrap;
}

@media (max-width: 768px) {
    .profile-header {
        flex-direction: column;
        text-align: center;
    }

    .profile-pic {
        width: 120px;
        height: 120px;
    }
}
</style>
