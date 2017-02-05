<template>
  <div class="main">
      <div class="content">
          <div class="panel">
              <div class="panel-header">
                   <router-link :to="{name: 'tab', params: {tab: tab.ename, page: 1}}"  v-for="tab in topicTabs" :class="tab.ename === currentTab ? 'active' : ''">{{ tab.name }}</router-link>
              </div>
              <c-list :items='topicLists'></c-list>
          </div>
      </div>
      <div class="sider">
          <c-siderbar></c-siderbar>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cList from '../components/list';
import cSiderbar from '../components/siderbar';
export default {
   computed: mapGetters({
    topicTabs: 'getTopicTabs',
    topicLists: 'getTopicLists',
    currentTab: 'getCurrentTab',
  }),
  components: {
    cList,
    cSiderbar
  },
  watch: {
    '$route' (to, from) {
      const fetchAttr={
         topicTab:this.$route.params.tab,
         page:this.$route.params.page
      }
      this.$store.dispatch('fetchTopicLists',fetchAttr);
    }
  },
  beforeRouteEnter(to, from, next) {
      if(to.name === 'index'){
          next(vm => {
            vm.$router.push('/tab/all/page/1');
          })
      }
      next();          
  }

}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.main {
    min-height: 100%;
    overflow: hidden;
    padding: 0 5%;
}
.content {
    float: left;
    min-height: 1px;
    width: 70%;
}
.panel {
    box-shadow: 0 0 5px #ccc;
    margin-bottom: 15px;
}
.panel-header {
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    font-size: 0.9em;
    padding: 10px;
}
.panel-header .active, .panel-header .active:hover {
    background-color: #80bd01;
    color: #fff;
}
.router-link-active a{
  color:#fff;
}
.panel-header a { 
    border-radius: 3px;
    margin: 0 10px;
    padding: 3px 4px;
}
.panel-header .active, .panel-header .active:hover {
    background-color: #80bd01;
    color: #fff;
}

</style>
