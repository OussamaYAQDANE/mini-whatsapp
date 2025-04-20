<script setup>
    import { defineProps } from 'vue';
    import { useRouter } from 'vue-router';
    const props = defineProps({
        group : {
            type: Object,
        }
    })
    import defaultProfile from "@/assets/default-profile.png";
    const router = useRouter();
    const goToGroupPage = () =>{
        router.push(`group/${props.group.id}`)
    }
</script>

<template>
    <div class="groupCard" @click="goToGroupPage">
        <div class="lightInfos">
            <p>
                <img
                    :src="group.icon ? group.icon : defaultProfile"
                    alt="img"
                    style="
                        width: 45px;
                        height :45px;
                        border-radius: 50%;
                    "
                    >
            </p>
            <p class="infos m-lg-2">{{ group.title }}</p>
        </div>
        <div class="bio">
            <p>{{ group.description }}</p>
        </div>
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
    display: flex;
    flex-direction: column;
}

.lightInfos{
    display: flex;
    flex-direction: row;   
}

.lightInfos .infos{
    width: 70%;
}

.lightInfos .infos{
    width: 70%;
    font-weight: bolder;
}

.groupCard:hover {
    background-color: #3a3a4f;
    transform: scale(1.02);
    cursor: pointer;
}
p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>
