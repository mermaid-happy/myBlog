<template>
<div>
	<nav class="pagination">
        <router-link :to="{name: 'tab', params: {tab: currentTab, page: currentPage - 1}}" class="pre"  v-if="currentPage !== 1">上一页</router-link>
        <router-link :to="{name: 'tab', params: {tab: currentTab, page: currentPage + 1}}" class="next">下一页</router-link>
    </nav>
</div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters({
        currentPage: 'getCurrentPage',
        currentTab: 'getCurrentTab',
    }),
  };
</script>
<style>

ul,li{
    margin: 0px;
    padding: 0px;
}
li{
    list-style: none
}
.page-bar li:first-child>a {
   margin-left: 0px
}
.page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
}
.page-bar a:hover{
    background-color: #eee;
}
.page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}
.page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}
.pagination {
    font-size: 10px;
    margin: 0 auto;
    overflow: hidden;
    padding: 10px;
}
.pagination a {
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 5px;
}
.next {
    float: right;
}
</style>