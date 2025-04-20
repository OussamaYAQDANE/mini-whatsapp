<script setup>
  /* eslint-disable */
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const {user} = defineProps({
    user : {
        type : Object,
    }
  })
  import defaultProfile from "@/assets/default-profile.png";
  const goToUserPage = ()=>{
    router.push(`/profile/${user.id}`);
  }
</script>

<template>
    <div class="userCard" @click="goToUserPage">
        <div class="lightInfos">
            <div class="image">
                <img
                :src="user.profilePic ? user.profilePic : defaultProfile"
                alt="img"
                style="
                    width: 45px;
                    height: 45px;
                    aspect-ratio: 1/1;
                    object-fit: cover;
                    object-position: center;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 8px;
                ">
            </div>
            <div class="infos">
                <p class="fullname"> {{ user.firstName }} {{ user.lastName }}</p>
                <p class="username">@{{ user.username ? user.username : ""}}</p>
            </div>
        </div>
        <div class="bio mt-2">{{ user.bio }}</div>

    </div>
</template>



<style scoped>
.userCard {
    background-color: #2a2a3b;
    border: 1px solid #7c3aed;
    border-radius: 8px;
    padding: 1rem;
    transition: 0.3s ease;
    width: 300px;
    color: white;
    display: flex;
    flex-direction: column;

}

.lightInfos{
    display: flex;
    flex-direction: row;  
    align-items: center; 
}

.lightInfos .infos{
    width: 70%;
}
.lightInfos .infos p{
    margin: 0;
    padding: 0;

}

.lightInfos .infos .username{
    
    font-weight: lighter;
    font-size: 0.75em;
  color: hsl(0, 0%, 80%);
  line-height: 1;
}

.lightInfos .infos .fullname{
    color: hsl(0, 0%, 88%);
  font-size: 0.9em;
  font-weight: bold;
  line-height: 1.1;
}

.bio{
 
    line-height: 1;
    font-size: 0.85em;
}

.userCard:hover {
    background-color: #3a3a4f;
    transform: scale(1.02);
    cursor: pointer;
}
</style>
