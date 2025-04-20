<script setup>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import defaultProfil from "@/assets/default-profile.png";
import defaultGroupProfil from "@/assets/default-prfl.png";
import { ref, onMounted, computed } from "vue";
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase-config.js";
import { useRoute } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase-config.js";
import { serverTimestamp } from "firebase/firestore";

const route = useRoute();
const search_for = route.params.id;
let isLoading = ref(false);
const docs = ref([]);
const users = ref([]);
let newUsername = ref("");
let newMessage = ref("");

onMounted(() => {
  isLoading.value = true;
  const docRef = doc(db, "groups", search_for);
  onSnapshot(docRef, async (docSnap) => {
    if (docSnap.exists()) {
      docs.value = docSnap.data();
      await loadUsers();
    }
    isLoading.value = false;
  });
  loadUsers();
});

async function loadUsers() {
  const temp = [];

  for (const userId of docs.value.members || []) {
    const userDocRef = doc(db, "users", userId);
    const userProfil = getDoc(userDocRef).then((userData) => {
      return {
        uid: userData.id,
        ...userData.data(),
      };
    });
    temp.push(userProfil);
  }

  const aa = await Promise.all(temp);
  users.value = aa;
}
const currentUser = ref("");
onAuthStateChanged(auth, (user) => {
  if (user) currentUser.value = user;
});
const isAdmin = computed(() => {
  return currentUser.value && docs.value.admins.includes(currentUser.value.uid);
});
async function promoteToAdmin(user) {
  const docRef = doc(db, "groups", search_for);
  await updateDoc(docRef, {
    admins: arrayUnion(user.uid),
  });
}
async function kickUser(user) {
  const docRef = doc(db, "groups", search_for);
  await updateDoc(docRef, {
    members: arrayRemove(user.uid),
  });
}
async function addUserByUsername() {
  if (!newUsername.value) return;
  const q = query(
    collection(db, "users"),
    where("username", "==", newUsername.value)
  );
  const docRef2 = doc(db, "groups", search_for);
  const docsnap2 = await getDoc(docRef2);
  const docSnap = await getDocs(q);
  if (!docSnap.empty) {
    const userUid = docSnap.docs[0].id;
    if (docsnap2.data().members.includes(userUid)) {
      alert("User already exists in this group!");
    } else {
      await updateDoc(docRef2, {
        members: arrayUnion(userUid),
      });
      console.log("User added to the group!");
    }
  } else {
    alert("User not found!");
  }
  newUsername.value = "";
}
async function sendGroupMessage(groupId, message) {
  const toSend = {
    sender: auth.currentUser.uid,
    content: message,
    time: serverTimestamp(),
  };
  const docref = doc(db, "groups", groupId);
  const docSnap = await getDoc(docref);
  updateDoc(docref, {
    lastMessage: toSend,
  });
  addDoc(collection(db, "groups", groupId, "messages"), toSend);
  if (!docSnap.data().members.includes(currentUser.value.uid)) {
    updateDoc(docref, {
      members: arrayUnion(currentUser.value.uid),
    });
  }
}
</script>
<template>
  <div
    v-if="isLoading"
    class="m-0 text-light d-flex flex-column"
    style="
      border-radius: 10px;
      cursor: pointer;
      height: 100%;
      justify-content: center;
      align-items: center;
    "
  >
    <loading-spinner />
  </div>
  <div v-else>
    <div
      style="
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <img
        :src="docs.icon ? docs.icon : defaultGroupProfil"
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
      />
      <p style="color: whitesmoke; font-size: 4em">{{ docs.title }}</p>
      <div style="width: 70%">
        <p style="display: flex; justify-content: flex-end; color: whitesmoke">
          {{ docs.description }}
        </p>
      </div>
    </div>
    <div>
      <form
        @submit.prevent="sendGroupMessage(search_for, newMessage)"
        class="add-user-form"
      >
        <input
          class="form-control"
          type="text"
          v-model="newMessage"
          placeholder="Send message"
          style="max-width: 600px"
        />
      </form>
      <br />
      <form
        v-if="isAdmin"
        @submit.prevent="addUserByUsername"
        class="add-user-form"
      >
        <div class="input-group" style="max-width: 600px">
          <span class="input-group-text">@</span>
          <input
            class="form-control"
            type="text"
            v-model="newUsername"
            placeholder="Enter the username to add"
          />
        </div>
      </form>
      <div class="user-list">
        <ul class="scrollable-list">
          <li v-for="user of users" :key="user.username" class="user-item">
            <div class="user-info">
              <img
                :src="user.profilePic ? user.profilePic : defaultProfil"
                alt="user profile"
              />
              <p>
                {{ user.username }}
                <span class="crown-hover" v-if="docs.admins.includes(user.uid)">
                  <span class="crown-icon">👑</span>
                </span>
              </p>
              <div v-if="user.uid == currentUser.uid" class="actions">
                <button @click="kickUser(currentUser)">Quit</button>
              </div>
              <div
                v-if="isAdmin && user.uid != currentUser.uid"
                class="actions"
              >
                <button
                  v-if="!docs.admins.includes(user.uid)"
                  @click="promoteToAdmin(user)"
                >
                  Promote to Admin
                </button>
                <button @click="kickUser(user)">Kick</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.add-user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.add-user-form input {
  padding: 14px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.user-list {
  border: 1px solid;
  border-radius: 12px;
  padding: 10px;
  width: 40%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.form-control::placeholder {
  color: #ccc;
}
.scrollable-list {
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
  width: 100%;
}
.user-item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.user-info p {
  margin: 0;
  font-weight: bold;
  color: #333;
  flex: 1;
  padding-left: 10px;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 6px 6px;
  border: none;
  border-radius: 8px;
  background-color: #c8bfe7;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.actions button:hover {
  background-color: #b7aee2;
}
.crown-hover {
  position: relative;
  cursor: pointer;
}

.crown-icon {
  font-size: 1.2rem;
}

.crown-hover::after {
  content: "Admin";
  position: absolute;
  bottom: -20px;
  left: 0;
  background: #c8bfe7;
  color: black;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.7rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  white-space: nowrap;
  pointer-events: none;
}

.crown-hover:hover::after {
  opacity: 1;
}
</style>