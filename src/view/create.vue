<template>
<div class="main">
    <div class="panel">
        <div class="panel-header">
	        <a href="/" class="home">主页</a>
	        <span class="c">/ </span>
	        <span class="c"> 发布话题</span>
	    </div>
	</div>
	<div class="inner padding">
	    <c-hint v-if="hint.show"></c-hint>
	    <fieldset>
          <span>选择版块</span>
          <select  v-model="postTopic.tab" class="create-tab">
                <option value="share">分享</option>
                <option value="ask">问答</option>
                <option value="job">招聘</option>
          </select>
          <input type="text" placeholder="标题字数10字以上" class="create-title" v-model="postTopic.title" @change="simCheck">
          <textarea></textarea>
          <a href="#" class="btn btn-success" @click.prevent.stop="post">提交</a>
        </fieldset>
	</div>
</div>
</template>
<script>
    import cHint from '../components/hint';
    import { mapGetters } from 'vuex';
    export default {
        data() {
		    return {
		        editor: '',
		        postTopic: {
		           tab: 'share',
                   title: '',
		        },
		    };
	    },
        computed: mapGetters({
		    token: 'getToken',
		    hint: 'getHint',
		    loginUser: 'getLoginUser',
		}),
		components: {
	      cHint,
	    },
		methods: {
		    post() {
		        const content = this.editor.codemirror.getValue();
		        const pubNature = {
		          title: this.postTopic.title,
		          content: content,
		          tab: this.postTopic.tab,
		          accesstoken: this.token
		        };

		        this.$store.dispatch('pubTopic',pubNature).then((id) => {
	                 this.$router.push({ name: 'topic', params: { id } });
	            })
		    },
		    simCheck() {
		        if (this.postTopic.title.length < 10) {
		          this.$store.dispatch('customHint',{ show: true, colorRed: true, info: '标题字数不能少于10' });
		        }
		    },
		},
		mounted() {
		    this.$store.dispatch('initHint');
		    this.editor = new Editor();
		    this.editor.render();
		    if (this.loginUser) {
		        this.$store.dispatch('changeUser',this.loginUser);
		    }
	    },
    }
</script>
<style>
.create-title {
    border: medium none;
    border-radius: 5px;
    box-shadow: 0 0 1px #333;
    box-sizing: border-box;
    display: block;
    margin: 10px 0;
    outline: medium none;
    padding: 10px;
    width: 100%;
}
fieldset {
    border: medium none;
    font-size: 14px;
}
.create-tab {
    border: 1px solid #ccc;
    height: 30px;
    outline: medium none;
    width: 220px;
}
select {
    margin-top: 10px;
}
</style>