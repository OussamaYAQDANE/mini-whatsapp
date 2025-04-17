<template>
  <nav class="navbar text-light ps-3 pe-1 sticky-top">
    <div
      class="d-flex align-items-center justify-content-between"
      style="height: 100%; width: 100%"
    >
      <div
        class="navbar-brand d-flex align-items-center me-5"
        style="color: white; width: fit-content; font-weight: bold"
      >
        <img
          src="../assets/logo.png"
          style="height: 30px; width: 30px"
          alt=""
          class="ms-3 me-3"
        />
        OUSSAMA
      </div>
      <div>
        <!--------------------------------- Router links go here my niggas ------------------------------------>
        <router-link to="/">LOL</router-link>
      </div>
      <div
        class="d-flex actions flex-row-reverse align-items-center"
        style="width: fit-content; justify-content: space-around"
      >
        <div
          class="d-flex align-items-center justify-content-center me-2 p-1 img-div"
          style="border-radius: 50%"
        >
          <img
            :src="props.profilePic ? profilePic : DefaultProfile"
            style="
              height: 40px;
              width: 40px;
              border-radius: 50%;
              margin: 0;
              object-fit: cover;
              object-position: top center;
              aspect-ratio: 1;
            "
          />
        </div>
        <div
          class="icon-div pt-1 pb-1 ps-2 pe-3 haha"
          style="border-radius: 25px; font-size: 16px; margin-right: 12px"
          @click="signOut(auth)"
        >
          <i class="material-icons" style="font-size: 28px" >logout</i> Logout
        </div>
      </div>
    </div>
  </nav>
</template>
 












<script setup>
import { defineProps } from "vue";
import DefaultProfile from "@/assets/default-profile.png";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
const props = defineProps({
  profilePic: String,
  modelValue: String,
});
</script>
    
    
    <style scoped>
.navbar {
  border-bottom: 0.001em ridge #fff;

  height: 60px;
  padding: 0;
  background-color: #202020;
}

.actions {
  height: 100%;
  padding: 4px;
}

.icon-div {
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  aspect-ratio: 1;
}

.icon-div:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

img {
  cursor: pointer;
  overflow: hidden;
}

.img-div:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
.haha:hover {
  background-color: rgba(255, 0, 0, 0.8);
}
</style>