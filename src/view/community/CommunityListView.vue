<template>
  <div class="rounded-3 mt-3 py-2 top_background_box m-auto">
    <select class="season_select form-select">
      <option :key="i" :value="season" v-for="(season,i) in seasonSelectData">S{{season}}</option>
    </select>
    <input class="search_box text-white" v-model="searchInput" placeholder="닉네임을 입력해주세요.">
  </div>

  <div class="rounded-3 mt-2 py-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="index">번호</td>
        <td class="title">제목</td>
        <td class="writer">작성자</td>
        <td class="write_date">작성일시</td>
      </tr>
    </table>
    <table :key="i" :value="community" v-for="(community, i) in communityListInfo" class="mt-1 text-white list_box m-auto">
      <tr class="cursor">
        <td class="index">{{community.index}}</td>
        <td class="title">{{community.title}}</td>
        <td class="writer">{{ community.writer}}</td>
        <td class="write_date">{{community.writeDate}}</td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  data() {
    return {
      seasonSelectData: [
        "2023-1",
        "2023-2",
        "2023-3",
        "2023-4",
        "2023-5",
        "2023-6",
        "2023-7",
        "2023-8",
      ],
      searchInput: "",
      communityListInfo: [
        {
          index: '1',
          title: '헤헤헤커뮤니티 개설',
          writer: 'LHH',
          writeDate: '2023-11-21',
        },
        {
          index: '2',
          title: '에이스못먹는치치',
          writer: '위에글 좀 이상한사람 인듯',
          writeDate: '2023-11-21',
        },
        {
          index: '3',
          title: '이게 왜 되누!',
          writer: '관관이형',
          writeDate: '2023-11-21',
        },
        {
          index: '4',
          title: '텍스트 오버플로우 테스트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트트',
          writer: '악질유저',
          writeDate: '2023-11-21',
        },
        {
          index: '5',
          title: '푸링푸링 푸링푸링',
          writer: '기가푸링',
          writeDate: '2023-11-21',
        }

      ],

    }
  }

}
</script>

<style src="@/assets/css/view/communityList.css" scoped/>