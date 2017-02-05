import 'whatwg-fetch';


const _get = ({ url, query }) => {
  let _url;
  if (query) {
    _url = `https://cnodejs.org/api/v1${url}?${query}`;
  } else {
    _url = `https://cnodejs.org/api/v1${url}`;
  }

  return fetch(_url)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      return Promise.reject(new Error(res.status));
    });
};

/**
 * post请求
 * @param  {String} url    api地址
 * @param  {Object} params 包含post内容的object
 * @return {Promise}        Promise
 */
const _post = (url, params) => {
  return fetch(`https://cnodejs.org/api/v1${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  });
};


/**
 * 获取文章列表
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} topicTab         主题分类
 * @param  {Number} page             页数
 * @return {Promise}                  Promise
 */
export const fetchTopicLists = ({ commit }, {topicTab, page}) => {
  const url = '/topics';
  const query = `tab=${topicTab}&page=${page}`;
  return _get({ url, query }, topicTab)
    .then((json) => {
      if (json.success) {
        return commit('FETCH_TOPIC_LISTS_SUCCESS', {topicLists:json.data, topicTab:topicTab, page:page});
      }
      return Promise.reject(new Error('fetchTopicLists failure'));
    })
    .catch((error) => {
      commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page);
      return Promise.reject(error);
    });
};


/**
 * 获取某一文章
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} id               文章id
 * @return {Promise}                  Promise
 */
export const fetchTopic = ({ commit }, id) => {
  const url = `/topic/${id}`;
  return _get({ url })
    .then((json) => {
      if (json.success) {
        commit('FETCH_TOPIC_SUCCESS', json.data);
        return json.data.author.loginname;
      }
      return Promise.reject(new Error('fetchTopic failure'));
    })
    .catch((error) => {
      commit('FETCH_TOPIC_FAILURE');
      return Promise.reject(error)
    });
};




/**
 * 检验token的合法性
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const checkToken = ({ commit }, accesstoken) => {
  const url = '/accesstoken';
  const params = { accesstoken };
  return _post(url, params)
  .then((json) => {
    if (json.success) {
      commit('CHECK_TOKEN_SUCCESS');
      return json.loginname;
    }
    return Promise.reject(new Error('checkToken failure'));
  })
  .catch((error) => {
    commit('CHECK_TOKEN_FAILURE');
    return Promise.reject(error);
  });
};


/**
 * 改变登入用户的信息
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Object} user             包含登入用户信息的object
 */
export const changeLoginUser = ({ commit }, user) => commit('CHANGE_LOGIN_USER', user);

export const myLoginName = ({ commit }, loginName) => {
  alert(loginName);
  commit('MY_LOGIN_NAME', loginName);
};


/**
 * 获取用户信息
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} loginName        用户名
 * @return {Promise}                  Promise
 */
export const fetchUser = ({ commit }, loginName) => {
  const url = `/user/${loginName}`;
  return _get({ url })
  .then((json) => {
    if (json.success) {
      commit('FETCH_USER_SUCCESS', json.data);
      return json.data;
    }
    return Promise.reject(new Error('fetchUser failure'));
  })
  .catch((error) => {
    commit('FETCH_USER_FAILURE');
    return Promise.reject(error);
  });
};


/**
 * 获取未读消息数
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const fetchMsgCount = ({ commit }, accesstoken) => {
  const url = '/message/count';
  const query = `accesstoken=${accesstoken}`;
  return _get({ url, query })
    .then((json) => {
      if (json.success) {
        return commit('FETCH_MSG_COUNT_SUCCESS', json.data);
      }
      return Promise.reject(new Error('fetchMsgCount failure'));
    });
};


/**
 * 获取未读和已读消息
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const fetchMessages = ({ commit }, accesstoken) => {
  alert(accesstoken);
  const url = '/messages';
  const query = `accesstoken=${accesstoken}`;
  return _get({ url, query })
    .then((json) => {
      if (json.success) {
        return commit('FETCH_MESSAGES_SUCCESS', json.data);

      }
      return Promise.reject(new Error('fetchMessages failure'));
    })
    .catch((error) => {
      commit('FETCH_MESSAGES_FAILURE');
      return Promise.reject(error);
    });
};


/**
 * 改变token的值
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken            accesstoken的值
 */
export const changeToken = ({ commit }, accesstoken) => commit('CHANGE_TOKEN', accesstoken);


/**
 * 删除token
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 */
export const delToken = ({ commit }) => commit('DEL_TOKEN');



/**
 * 初始化提示
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 */
export const initHint = ({ commit }) => commit('INIT_HINT');


/**
 * 改变token的有效性
 * @param  {Function}  options.commit store对象解构出来的函数，无需手动提供
 * @param  {Boolean} isAvail          token是否有效
 */
export const changeTokenAvail = ({ commit }, isAvail) => commit('CHANGE_TOKEN_AVAIL', isAvail);


/**
 * 改变用户信息
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Object} info             包含用户信息的object
 */
export const changeUser = ({ commit }, info) => commit('CHANGE_USER', info);


/**
 * 发表评论
 * @param  {Function} options.commit    store对象解构出来的函数，无需手动提供
 * @param  {String} options.topic_id    文章id
 * @param  {String} options.content     回复内容
 * @param  {String} options.accesstoken accesstoken的值
 * @param  {String} options.reply_id    回复id
 * @param  {Object} options.replyData   包含回复内容，作者，时间，头像的object
 * @return {Promise}                     Promise
 */
export const reply = ({ commit }, { topic_id, content, accesstoken, reply_id, replyData }) => {
  const url = `/topic/${topic_id}/replies`;
  let params;
  if (reply_id) {
    params = { content, accesstoken, reply_id };
  } else {
    params = { content, accesstoken };
  }
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        replyData.reply_id = json.reply_id;
        return replyData;
        
      }
      return Promise.reject(new Error('reply failure'));
    })
    .then((r) => commit('ADD_REPLIES', r))
    .catch((error) => {
      commit('REPLY_FAILURE');
      return Promise.reject(error);
    });
};

/**
 * 点赞或取消点赞
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} reply_id         回复id
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const star = ({ commit }, { reply_id, accesstoken }) => {
  const url = `/reply/${reply_id}/ups`;
  const params = { accesstoken };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return json.action;
      }
      return Promise.reject(new Error('star failure'));
    });
};


/**
 * 发布文章
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} title            文章标题
 * @param  {String} content          文章内容
 * @param  {String} tab              文章分类
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const pubTopic = ({ commit }, pubNature) => {
  alert(pubNature);
  const url = '/topics';
  return _post(url, pubNature)
    .then((json) => {
      if (json.success) {
        alert('true');
        return Promise.resolve(json.topic_id);
      }
      return Promise.reject(new Error('pubTopic failure'));
    })
    .catch((error) => {
      commit('PUB_TOPIC_FAILURE');
      return Promise.reject(error);
    });
};


/**
 * 自定义提示
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Object} info             自定义信息
 */
export const customHint = ({ commit }, info) => commit('CUSTOM_HINT', info);

export const addStar = ({ commit }, r) => commit('ADD_STAR', r);
export const delateStar = ({ commit }, r) => commit('DELATE_STAR', r);

