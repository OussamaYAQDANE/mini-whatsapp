<template>
    <nav class="navbar text-light ps-3 pe-1 sticky-top">
        <div class="d-flex align-items-center justify-content-between" style="height: 100%; width: 100%;">
            <div class="navbar-brand d-flex align-items-center me-5" style="color: white; width: fit-content; font-weight: bold;"><img src="../assets/logo.png" style="height: 30px; width: 30px;" alt="" class="ms-3 me-3"> OUSSAMA</div>
        
            
    
            <div class="d-flex actions flex-row-reverse align-items-center" style="width:fit-content; justify-content: space-around;">
                <div class="d-flex align-items-center justify-content-center me-2 p-1 img-div" style="border-radius: 50%;">            
                <img 
                    :src="props.profilePic? profilePic: DefaultProfile" 
                    style= "height: 40px; 
                            width: 40px;
                            border-radius: 50%; 
                            margin: 0; 
                            object-fit: cover; 
                            object-position: top center; 
                            aspect-ratio: 1;"
                ></div>
                <div class="icon-div me-2" ><i class="material-icons" style="font-size: 25px;">notifications</i></div>
                <div class="icon-div pt-1 pb-1 ps-2 pe-3 haha" style="border-radius: 25px; font-size: 16px;"><i class="material-icons" style="font-size: 28px;">add</i> Create</div>
            </div>
    
        
        </div>
    </nav>
    </template>
    
    <script setup>
    import {defineProps} from 'vue'
    import DefaultProfile from "@/assets/default-profile.png"
    const props = defineProps({
        profilePic: String,
        modelValue: String
    })
    
    </script>
    
    
    <style scoped>
    .navbar{
        border-bottom: 0.001em ridge #fff;
        
        height: 60px;
        padding: 0;
        background-color: #202020;
    }
    .form-label {
        color: #ffffff; /* Light gray labels */
      }
      
    .form-control {
        background-color: #495057; /* Dark input background */
       
        color: #ffffff; /* White text in inputs */
    }
    
    .form-control::placeholder {
        color: #adb5bd; /* Light gray placeholder */
    }
      
    .form-control:focus {
        background-color: #495057;
        color: #ffffff;
        box-shadow: none;
    }
    
    .input-group-text{
        
        transition-duration: 0.3s;
    }
    .actions{
        height: 100%;
        padding: 4px;
    }
    
    .icon-div{
        height: 80%; display: flex; justify-content: center; align-items: center; border-radius: 50%;
        cursor: pointer; aspect-ratio: 1;
    }
    
    .icon-div:hover{
        background-color: rgba(255, 255, 255, 0.15);
    }
    
    img{
        cursor: pointer;
        overflow: hidden;
    }
    
    .img-div:hover{
        background-color: rgba(255, 255, 255, 0.15);
    }
    
    </style>