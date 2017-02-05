<template>
<div class="main">
	<div class="content">
	    <c-hint v-if="hint.show"></c-hint>
	    <div class="panel">
	        <div class="panel-header">
		        <a href="/" class="home">主页</a>
		        <span class="c">/ </span>
		        <span class="c"> 新消息</span>
	        </div>
	        <div class="inner">
	            <div class="item" >无消息</div>
		        <template  v-for="item in messages.hasnot_read_messages">
		            <div class="item" v-if="item.type === 'at'">
		                <router-link :to="{name: 'user', params: {name: item.author.loginname}}">{{ item.author.loginname }}</router-link>在话题
		                <router-link :to="{name: 'topic', params: {id: item.topic.id}}">{{ item.topic.title }}</router-link>中@了你
		            </div>
		            <div class="item" v-if="item.type === 'reply'">
		                <router-link :to="{name: 'user', params: {name: item.author.loginname}}">{{ item.author.loginname }}</router-link>回复了你的话题
		                <router-link :to="{name: 'topic', params: {id: item.topic.id}}">{{ item.topic.title }}</router-link>
		            </div>
		        </template>
	        </div>
		</div>
		<div class="panel">
		    <div class="panel-header">
	          过往信息
	        </div>
	        <div class="inner">
	            <div class="item" >无消息</div>
	            <template  v-for="item in messages.has_read_messages">
		            <div class="item" v-if="item.type === 'at'">
		              <router-link :to="{name: 'user', params: {name: item.author.loginname}}">{{ item.author.loginname }}</router-link>在话题
		              <router-link :to="{name: 'topic', params: {id: item.topic.id}}">{{ item.topic.title }}</router-link>中@了你
		            </div>
		            <div class="item" v-if="item.type === 'reply'">
		              <router-link :to="{name: 'user', params: {name: item.author.loginname}}">{{ item.author.loginname }}</router-link>回复了你的话题
		              <router-link :to="{name: 'topic', params: {id: item.topic.id}}">{{ item.topic.title }}</router-link>
		            </div>
		        </template>
	        </div>
		</div>
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: mapGetters({
        messages: 'getMessages',
        token: 'getToken',
        hint: 'getHint',
        msgNotLen:'getmsgNotLen',
        msgLen:'getmsgLen',
	}),
	mounted(){
	    alert(this.messages);
	    this.$store.dispatch('fetchMessages',this.token);
	}
}
</script>
<style>
    .item {
	    border-top: 1px solid #f0f0f0;
	    font-size: 14px;
	    line-height: 1.6;
	    padding: 15px 10px;
	}
	.item a {
	    color: #08c;
	}
</style>