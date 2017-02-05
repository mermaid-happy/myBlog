<template>
<div class="main">
   <div class="content">
      <template v-if="topic">
          <c-article></c-article>
          <c-comment></c-comment>
      </template>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</div>
</template>
<script>
  import cSiderbar from '../components/siderbar';
  import cArticle from '../components/article';
  import cComment from '../components/comment';
  import { mapGetters } from 'vuex';
  export default {
    components: {
      cSiderbar,
      cArticle,
      cComment,
    },
    computed: mapGetters({
	    topic: 'getTopic',
      myLoginName:'getMyLoginName'
	  }),
    mounted() {
          this.$store.dispatch('fetchTopic' ,this.$route.params.id).then((loginName)=>{
             this.$store.dispatch('fetchUser' ,loginName)
          })
    },
    beforeRouteLeave (to, from, next) {
        if(this.myLoginName){
           this.$store.dispatch('fetchUser',this.myLoginName);
        }
       next();
    },
  }
</script>