<template>
    <div>
		<div class="panel" v-if="topic.reply_count !== 0">
		    <div class="panel-header">
		        {{ topic.reply_count }}条评论
		    </div>
		    <div class="inner padding" v-for="reply in topic.replies">
			    <div class="author-content">
			        <router-link :to="{name: 'user', params: {name: reply.author.loginname}}">
			            <img :src="reply.author.avatar_url" alt="avatar">
			        </router-link>
			        <div class="author-info">
			            <router-link :to="{name: 'user', params: {name: reply.author.loginname}}">{{ reply.author.loginname }}</router-link>
			            <span>{{reply.create_at | timeToNow }}</span>
			            <div class="user-action">
				            <a href="#" @click.prevent.stop="toStar(reply)"><i class="fa fa-thumbs-o-up"></i> {{ reply.ups.length }}</a>
				            <a href="#" @click.prevent.stop="replyOne(reply)"><i class="fa fa-reply"></i></a>
			            </div>
			        </div>
			    </div>
		        <div class="comment-content markdown-body" v-html="reply.content"></div>
		    </div>
		</div>
		<div class="panel" v-if="token">
		    <div class="panel-header">
		      添加回复
		    </div>
		    <c-hint v-if="hint.show"></c-hint>
		    <div class="inner padding">
		      <textarea></textarea>
		      <a href="#" class="btn btn-success" @click.prevent.stop="toReply">回复</a>
		    </div>
		</div>
    </div>
</template>
<script>
  import cHint from '../components/hint';
  const MarkdownIt = require('markdown-it');
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        editor: '',
        rid: '',
      };
    },
	computed: {
	    ...mapGetters({
	        hint: 'getHint',
            topic: 'getTopic',
            token: 'getToken',
            loginUser: 'getLoginUser',
	    }),
	},
	components: {
      cHint,
    },
	methods: {
	    toStar(r) { 
	        const star={
	           reply_id:r.id,
	           accesstoken: this.token,
	        };
	        this.$store.dispatch('star',star).then((v) => {
	        console.log(v)
	           if(v === 'down'){
	               	this.$store.dispatch('delateStar',r);	               	
	           }else if(v === 'up'){
	           		this.$store.dispatch('addStar',r);	           		
	           }
	        })
        },
	    toReply() {
	        const content = this.editor.codemirror.getValue();
	        const md = new MarkdownIt();
	        const replyData = {
	          author: this.loginUser,
	          content: md.render(content),
	          ups: [],
	          reply_id: '',
	          create_at: new Date(),
	        };
	        const params = {
	          topic_id: this.topic.id,
	          content,
	          accesstoken: this.token,
	          reply_id: this.rid,
	          replyData,
	        };
	        this.$store.dispatch('reply',params)
	          .then(() => this.editor.codemirror.setValue(''))
	          .catch((e) => console.log(e));
	        },
		    // 回复某人
		    replyOne(r) {
		        const cm = this.editor.codemirror;
		        const line = cm.lastLine();
		        cm.focus();
		        cm.setLine(line, `${cm.getLine(line)} @${r.author.loginname} `);
		        this.rid = r.reply_id;
		    },
	},
	mounted() {
	  this.$store.dispatch('initHint');
      if (this.token) {
        this.editor = new Editor();
        this.editor.render();
      }
    },
  }
</script>
<style>
.panel img {
    border-radius: 3px;
    height: 30px;
    width: 30px;
}
.author-info {
    height: 30px;
    line-height: 30px;
    margin-left: 40px;
}
.author-content > a {
    float: left;
}
.comment-content {
    margin-left: 30px;
}
.markdown-body {
    padding: 0 15px;
}
.markdown-body {
    color: #333;
    font-family: Helvetica Neue,Helvetica,Segoe UI,Arial,freesans,sans-serif;
    font-size: 14px;
    line-height: 1.6;
    overflow-wrap: break-word;
}
.user-action{
	float:right;
}
.btn-success {
    background-color: #80bd01;
    color:#fff;
}
.btn {
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    padding: 8px;
    transition: all 0.2s ease 0s;
}
</style>