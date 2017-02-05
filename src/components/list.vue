<template>
    <div class="inner">
       <div class="topic-list">
          <div class="cell" v-for="topicItem in items">
              <router-link :to="{name: 'user', params: {name: topicItem.author.loginname}}" class="avatar">
                <img :src="topicItem.author.avatar_url" alt="avator">
              </router-link>
              <span class="info-count">
                 <span class="reply-count">{{ topicItem.reply_count }}</span>
                 <span class="seperator">/</span>
                 <span class="visited-count">{{ topicItem.visit_count }}</span>
              </span>
              <div class="topic-wrapper fl">
                <router-link :to="{name: 'topic', params: {id: topicItem.id}}" class="avatar">
                   {{ topicItem.title }}
                </router-link>
              </div>
              <span class="last-time">
                 {{ topicItem.last_reply_at | timeToNow}}
              </span>
          </div>
       </div>
       <c-pagination></c-pagination>
    </div>
</template>

<script>
  import cPagination from './pagination';
  export default {
    props: ['items'],
    components: {
      cPagination,
    },
  };
</script>
<style>
.inner {
    background-color: #fff;
}
.cell {
    overflow: hidden;
    padding: 10px;
}
.avatar {
    float: left;
}
.panel img {
    border-radius: 3px;
    height: 30px;
    width: 30px;
}
.info-count {
    float: left;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    width: 70px;
}
.fl{
  float:left;
}
.reply-count {
    color: #9e78c0;
    font-size: 13px;
}
.top {
    background-color: #80bd01;
    border-radius: 3px;
    color: #fff;
    font-size: 10px;
    padding: 3px;
}
.topic-wrapper{
  line-height:32px;
}
.last-time {
    float: right;
    font-size: 12px;
    line-height: 30px;
}
</style>