<script setup>
    import { defineProps } from 'vue';
    defineProps({
        group : {
            type: Object,
        }
    })
</script>

<template>
    <div class="groupCard">
       <p>title : {{ group.title }}</p> 
       <p>description : {{ group.description }}</p>
    </div>
</template>



<style scoped>
.groupCard {
    display: block;
    background-color: #2a2a3b;
    border: 1px solid #7c3aed;
    border-radius: 8px;
    padding: 1.5rem;
    transition: 0.3s ease;
    width: 40%;
    color: white;
}

.groupCard:hover {
    background-color: #3a3a4f;
    transform: scale(1.02);
    cursor: pointer;
}
</style>
