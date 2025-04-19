<script setup>
  /* eslint-disable */
  import { defineProps } from 'vue';
  const {user} = defineProps({
    user : {
        type : Object,
    }
  })

</script>

<template>
    <div class="userCard">
        <p>Firest Name : {{ user.firstName }}</p>
        <p>Last Name : {{ user.lastName }}</p>
    </div>
</template>



<style scoped>
.userCard {
    background-color: #2a2a3b;
    border: 1px solid #7c3aed;
    border-radius: 8px;
    padding: 1.5rem;
    transition: 0.3s ease;
    width: 300px;
    color: white;
}

.userCard:hover {
    background-color: #3a3a4f;
    transform: scale(1.02);
    cursor: pointer;
}
</style>
