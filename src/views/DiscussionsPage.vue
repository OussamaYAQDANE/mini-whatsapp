<template>
  <div style="display: flex;  height: 100%; width: 100%">
    <div style="height: 100; width: 40%; border-right: 0.1px solid #86a2ae; display: flex; flex-direction: column;">
      <div id="tabs">
      <span class="tab" :class="selectedTab === 'discussions' ? 'selectedTab': ''" @click="selectedTab = 'discussions'" >Discussions</span>
      <span class="tab" :class="selectedTab === 'groups' ? 'selectedTab': ''" @click="selectedTab = 'groups'">Groups</span></div>
      <discussions-list v-show="selectedTab === 'discussions'" style="width: 100%; " />
      <groups-list v-show="selectedTab === 'groups'" style="width: 100%; " />
    </div>
    <div style="width: 100%;">
      <discussion-messages v-show="selectedTab === 'discussions'" />
      <group-messages v-show="selectedTab === 'groups'" />
    </div>




    <modal-vue v-model="modal"> 
      <div class="modal-body mt-3" style="display: flex; flex-direction: column;">
    <form @submit.prevent="createGroup">
      <div class="mb-3">
        <label for="groupTitle" class="form-label">Group Title</label>
        <input 
          type="text" 
          class="form-control text-light" 
          id="groupTitle"
          v-model="groupTitle"
          required
          placeholder="Group title"
        >
      </div>

      <div class="mb-3">
        <label for="groupDescription" class="form-label">Description</label>
        <textarea 
          class="form-control text-light" 
          id="groupDescription" 
          rows="3"
          v-model="groupDescription"
          placeholder="Add a description for your group"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="groupIcon" class="form-label">Group Icon</label>
        <input 
          type="file" 
          class="form-control " 
          id="groupIcon"
          accept="image/*"
          @change="handleIconUpload"
          ref="iconInput"
          style="color: #86a2ae;"
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Privacy</label>
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            name="privacy"
            id="public"
            value="public"
            v-model="isPublic"
          >
          <label class="form-check-label" for="public">
            Public (Anyone can join)
          </label>
        </div>
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            name="privacy"
            id="private"
            value="private"
            v-model="isPublic"
          >
          <label class="form-check-label" for="private">
            Private (Invite only)
          </label>
        </div>
      </div>

      <button type="submit" class="btn btn-primary " :disabled="loading" >
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
        {{ loading ? 'Creating...' : 'Create Group' }}
      </button>
    </form>
  </div>
    </modal-vue>
  </div>
</template>

<script setup>
/* eslint-disable */
import DiscussionsList from "@/components/DiscussionsList.vue";
import GroupsList from "@/components/GroupsList.vue";
import DiscussionMessages from "@/components/DiscussionMessages.vue";
import GroupMessages from "@/components/GroupMessages.vue";
import { ref, provide } from "vue";
import ModalVue from "@/components/ModalVue.vue";
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '@/firebase/firebase-config'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const selectedTab = ref('discussions');
const selectedDiscussion = ref('');
const selectedGroup = ref('');



provide('selectedDiscussion', selectedDiscussion);
provide('selectedGroup', selectedGroup);

const modal = ref(false);

provide('openModal', modal)


const groupTitle = ref('');
const groupDescription = ref('');
const iconFile = ref(null);
const isPublic = ref('public');
const loading = ref(false);
const iconInput = ref(null);

const handleIconUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    iconFile.value = file;
  }
};

const createGroup = async () => {
  try {
    loading.value = true;
    let iconUrl = '';

    // Upload image if exists
    if (iconFile.value) {
      const storageReference = storageRef(storage, `group-icons/${Date.now()}_${iconFile.value.name}`);
      await uploadBytes(storageReference, iconFile.value);
      iconUrl = await getDownloadURL(storageReference);
    }

    // Create group document
    const groupData = {
      title: groupTitle.value,
      description: groupDescription.value,
      icon: iconUrl,
      members: [auth.currentUser.uid],
      admins: [auth.currentUser.uid],
      privacy: isPublic.value,
      createdAt: serverTimestamp(),
      lastMessage: {
        sender: auth.currentUser.uid,
        content: 'Created this group',
        time: serverTimestamp()
      }
    };

    await addDoc(collection(db, 'groups'), groupData);
    

    // Reset form
    groupTitle.value = '';
    groupDescription.value = '';
    iconFile.value = null;
    isPublic.value = 'public';
    if (iconInput.value) iconInput.value.value = '';
    modal.value = false;
    
  } catch (error) {
    console.error('Error creating group:', error);
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>
.tab{
  color:#b3cad5;
  padding: 8px 12px 8px 12px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 8px 0 8px 0;
  border-radius: 20px;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.selectedTab{
  background-color: rgba(163, 9, 210, 0.752);
  color: rgb(243, 205, 255);
}

#tabs{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

}

.form-control::placeholder{
  color: #b3cad58d;
}
*{
  color: #b3cad5;
}
</style>