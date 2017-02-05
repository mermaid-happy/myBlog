<template>
<div class="main">
	<div class="content">
	    <div class="panel">
	        <div class="panel-header">
	           <router-link :to="{name:'index'}">主页</router-link>
	           <span class="c">/</span>
	        </div>
	        <div class="inner padding">
	           <div class="user-head">
	            <img :src="user.avatar_url" alt="avatar">
	            <span>{{ user.loginname }}</span>
	          </div>
	          <ul class="user-profile">
	            <li>{{ user.score }}积分</li>
	            <li>
	              <a :href="'https://github.com/' + user.githubUsername" target="_blank"><i class="fa fa-lg fa-github"></i>https://github.com/{{ user.githubUsername }}</a>
	            </li>
	            <li>注册于{{ user.create_at | timeToNow }}</li>
	          </ul>
	        </div>
	    </div>
        <div class="panel">
            <div class="panel-header">
              最近创建的话题
            </div>
            <c-list :items='user.recent_topics'></c-list>
        </div>
        <div class="panel">
            <div class="panel-header">
              最近参与的话题
            </div>
            <c-list :items='user.recent_replies'></c-list>
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
    user: 'getUser',
    myLoginName:'getMyLoginName'
  }), 
  mounted() {
     this.$store.dispatch('initHint');
     this.$store.dispatch('fetchUser',this.$route.params.name); 
  },
  beforeRouteLeave (to, from, next) {
     if(this.myLoginName){
           this.$store.dispatch('fetchUser',this.myLoginName);
     }
     next();
  },
  components:{
     cList,
     cSiderbar
  },
  
};
</script>
<style>
.panel-header {
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    font-size: 0.9em;
    padding: 10px;
}
.panel-header a {
    border-radius: 3px;
    color: #80bd01;
    margin: 0 10px;
    padding: 3px 4px;
}
.c {
    color: #999;
}
.user-head {
    font-size: 14px;
    text-align:left;
}
.user-head img {
    height: 40px;
    width: 40px;
}
.panel .inner a {
    color: #778087;
}
.panel img {
    border-radius: 3px;
    height: 30px;
    width: 30px;
}
a{
    text-decoration: none;
}
.user-head span {
    color: #778087;
    margin-left: 7px;
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
.main {
    min-height: 100%;
    overflow: hidden;
    padding: 0 5%;
}
.user-profile {
    font-size: 14px;
    padding: 5px 0;
}
.user-profile li {
    margin: 10px 0;
    text-align:left;
}
</style>