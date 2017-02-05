<template>
<div>
  <article class="panel">
    <div class="panel-header article-header">
      <h2>
        <span class="top" v-if="topic.top">置顶</span>
        <span class="top" v-else v-if="topic.good">精华</span>
        {{ topic.title }}
      </h2>
      <div class="info">
        <span>发布于{{ topic.create_at | timeToNow }}</span>
        <span>作者{{ topic.author.loginname }}</span>
        <span>{{ topic.visit_count }}次浏览</span>
        <span>来自 {{ topic.tab | transTab }}</span>
      </div>
    </div>
    <div class="inner padding">
      <div class="markdown-body" v-html="topic.content">
      </div>
    </div>
  </article>
</div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters({
	    topic: 'getTopic',
	}),
  }
</script>
<style>
  .delate{
    cursor:pointer;

  }
  .panel {
    box-shadow: 0 0 5px #ccc;
    margin-bottom: 15px;
 }
 .article-header {
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 15px;
}
.panel-header h2{
	padding-top:20px;
	padding-bottom:20px;
}
.panel-header {
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    font-size: 0.9em;
    padding: 10px;
}
.top {
    background-color: #80bd01;
    border-radius: 3px;
    color: #fff;
    font-size: 0.6em;
    padding: 3px;
}
.article-header {
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 15px;
}
.panel-header {
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    font-size: 0.9em;
    padding: 10px;
}
.info {
    color: #838383;
    font-size: 12px;
}
.info span::before {
    content: "•";
}
.main {
    min-height: 100%;
    overflow: hidden;
    padding: 0 5%;
}
.sider {
    box-sizing: border-box;
    float: left;
    padding-left: 20px;
    width: 30%;
}
.markdown-body blockquote, .markdown-body dl, .markdown-body ol, .markdown-body p, .markdown-body pre, .markdown-body table, .markdown-body ul {
    margin-bottom: 16px;
    margin-top: 0;
}
.markdown-body p {
    margin-bottom: 10px;
    margin-top: 0;
}
.markdown-body h2 {
    border-bottom: 1px solid #eee;
    font-size: 1.75em;
    line-height: 1.225;
    padding-bottom: 0.3em;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 16px;
    margin-top: 1em;
}
.markdown-body h2 {
    font-size: 21px;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    line-height: 1.5;
    margin-bottom: 0;
    margin-top: 0;
}
.markdown-text{
	text-align:left;
}
</style>