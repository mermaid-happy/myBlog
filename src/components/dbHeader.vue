<template>
<div>
    <header>
      <a class="brand v-link-active">
	      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="cnodejs-logo">
      </a>
      <ul class="navbar">
	         <li><router-link :to="{name: 'index'}">首页</router-link></li>
	         <li v-if="!token"><router-link :to="{name: 'login'}">登入</router-link></li>
	         <template v-else>
		        <li><router-link :to="{name: 'messages'}">未读消息<span class="h"  v-if="msgCount">{{ msgCount }}</span></router-link></li>
		        <li><a href="#" @click.prevent.stop="exit">退出</a></li>
		    </template>
      </ul>
    </header>
</div>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
    computed: mapGetters({
      token: 'getToken',
      msgCount: 'getMsgCount',
    }),
    methods: {
       exit() {
          this.$store.dispatch('delToken');
          this.$router.push('/tab/all/page/1');
       }
    }
}
</script>
<style scoped>
a {
    color: #ccc;
    text-decoration: none;
}
header {
    overflow: hidden;
    background-color: #444;
    padding: 0 5%;
    margin-bottom: 20px;
  }

.brand {
	float: left;
	width: 120px;
	height: 28px;
	padding: 5px 20px;
}
.navbar {
    float: right;
    overflow: hidden;
    display: block;
}
.navbar li {
  float: left;
}

.navbar a {
  font-size: 13px;
  display: block;
  padding: 16px;
}
.h {
    background-color: #80BD01;
    height: 14px;
    min-width: 14px;
    padding: 0 2px;
    padding-top: 1px;
    margin-left: 1px;
    display: inline-block;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    border-radius: 10px;
    color: #FFF;
  }
</style>