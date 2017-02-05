<template>
    <div class="siderbar">
         <div class="panel" v-if="$route.name === 'topic' || $route.name === 'user' || token">
            <div class="panel-header">
                个人信息
            </div>
            <div class="inner padding">
                <div class="user-info">
                  <router-link :to="{ name: 'user', params: { name: user.loginname } }" class="user-logo"><img :src="user.avatar_url" ></router-link>
                  <router-link :to="{ name: 'user', params: { name: user.loginname } }" class="user-name">{{ user.loginname }}</router-link>
                  <div class="user-score">积分：{{ user.score }}</div>
                </div>
            </div>
         </div>
         <div class="panel" v-if=" $route.name !== 'topic' && $route.name !== 'user'  && !token">
             <div class="panel-header">CNode：Node.js专业中文社区</div>
             <div class="inner padding">
                <div class="sign-about">您可以通过accessToken登入</div>
                <a href="#" class="btn btn-primary" @click.prevent.stop="preLogin">通过token登入</a>
             </div>
         </div>
         <div class="panel" v-if="token">
            <div class="inner padding">
              <router-link :to="{name: 'create'}" class="btn btn-success">发布话题</router-link>
            </div>
         </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default{
	computed: mapGetters({
	    token: 'getToken',
       user: 'getUser'
	}),
	methods: {
	    preLogin() {
	        if(document.cookie.length > 0){
	            const arr = document.cookie.split(';');
	            let t;
              for(let v of arr){
                 v = v.trim();
                 if (v.startsWith('token=')) {
                      t = v.split('=')[1];
                      break;
                  }
              }

              if(t){
                  this.$store.dispatch('changeToken',t);
                  this.$store.dispatch('checkToken',t).then((loginName) => {
                    this.$store.dispatch('myLoginName',loginName);
                    this.$store.dispatch('fetchUser',loginName).then((info) =>{
                      this.$store.dispatch('changeLoginUser',info)
                    });
                    
                  })

              }else{
                  this.$router.push({ name: 'login' });
              }
	    }else{
          this.$router.push({ name: 'login' });
      }
	  }
	}
}
</script>
<style>
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
.padding {
    padding: 10px;
}
.inner {
    background-color: #fff;
}
.sign-about {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .sider {
    box-sizing: border-box;
    float: left;
    padding-left: 20px;
    width: 30%;
}
.btn-primary {
    background-color: #5bc0de;
}
.btn {
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    padding: 8px;
    transition: all 0.2s ease 0s;
}
.user-logo {
    margin-right: 8px;
}
.user-name {
    color: #778087;
}
.user-score {
    margin: 10px 0;
}
</style>