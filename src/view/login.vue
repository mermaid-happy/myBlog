<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a href="/" class="home">主页</a>
        <span class="c">/ </span>
        <span class="c"> 登入</span>
      </div>
      <div class="inner padding login">
        <p class="prompt"><c-hint v-if="hint.show"></c-hint></p>
        <div class="login-form">
          <label for="token">accessToken:</label>
          <input type="text" id="token" maxlength="36" v-model="tmpToken">
        </div>
        <a href="#" class="btn btn-primary" @click.prevent.stop="login">登入</a>
      </div>
    </div>
  </div>
</template>

<script>
  import cHint from '../components/hint';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        tmpToken: '',
      };
    },
  computed: mapGetters({
    token: 'getToken',
    hint: 'getHint',
  }),
  components: {
    cHint,
  },
    /* eslint-disable max-len */
  methods: {
    
    // 登入
    login() {
        if (this.tmpToken.length !== 36) {
          this.$store.dispatch('changeTokenAvail', false)
        } else {
          this.$store.dispatch('checkToken', this.tmpToken).then((loginName) => {   
              alert(loginName);
              this.$store.dispatch('changeToken', this.tmpToken);
              this.$store.dispatch('fetchUser', loginName).then((info) => {
                alert(info);
                this.$store.dispatch('changeLoginUser', info);
                const d = new Date();
                d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
                const expires = d.toGMTString();
                document.cookie = `token=${this.token};expires=${expires}`;
                const redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push(redirect);
              })
          })
      }  
    }
   
  },
  route: {
    data() {
      // 初始化hint
      this.initHint();
    },
  },
};
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
    text-align:left;
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
.login {
    padding: 70px 0;
    position: relative;
    text-align: center;
}
.padding {
    padding: 10px;
}
.inner {
    background-color: #fff;
}

.prompt {
    left: 10px;
    padding: 0 10px;
    right: 10px;
    top: 0;
    margin-bottom:10px;
}
.login-form {
    margin-bottom: 25px;
}
.login label {
    cursor: pointer;
    margin-right: 15px;
}
#token {
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: medium none;
    padding: 5px;
    transition: all 0.2s ease 0s;
    width: 200px;
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
</style>