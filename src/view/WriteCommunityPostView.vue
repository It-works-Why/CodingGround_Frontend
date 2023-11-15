<template>
   <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
     <div class="content py-4 px-5">
       <div class="text-white fw-bold fs-1 mb-4 w-100">
         커뮤니티
       </div>

       <input v-model="postData.title" placeholder="제목을 입력해주세요." class="w-100 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" />

       <textarea v-model="postData.content" placeholder="내용을 입력해주세요." class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" />

       <div class="button">
         <WhiteButton class="cancel ms-2" button-value="취소"></WhiteButton>
         <WhiteButton class="write ms-2" button-value="작성" ></WhiteButton>
       </div>
     </div>
   </div>
</template>

<script>
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  data(){
    return{
      postData: {
        title: '',
        content: ''
      }
    }
  },
  components: {
    WhiteButton,
  },
  methods:{

  }

}
</script>

<style src="@/assets/css/view/post.css" scoped />