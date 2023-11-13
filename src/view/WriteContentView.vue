<template>
 <ContentForm :>
   <template v-slot:button>
     <WhiteButton class="cancel ms-5" button-value="취소"></WhiteButton>
     <WhiteButton class="write ms-5" button-value="작성" ></WhiteButton>
   </template>
 </ContentForm>
</template>

<script>
import ContentForm from "@/components/ContentForm.vue";
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  data(){
    return{

    }
  },
  components: {
    WhiteButton,
    ContentForm
  },
  methods:{

  }

}
</script>

<style scoped>

</style>