export const getMsgCount = (state) => state.msgCount;
export const getToken = (state) => state.token;
export const getHint = (state) => state.hint;
export const getTopicTabs = (state) => state.topicTabs;
export const getTopicLists = (state) => state.topicLists;
export const getCurrentTab = (state) => state.currentTab;
export const getCurrentPage = (state) => Number(state.currentPage);
export const getUser = (state) => state.user;
export const getTopic = (state) => state.topic;
export const getLoginUser = (state) => state.loginUser;
export const getMessages = (state) => state.messages;
export const getMyLoginName = (state) => state.myLoginName;

export const getmsgNotLen = (state) => state.messages.hasnot_read_messages.length;
export const getmsgLen = (state) => state.messages.has_read_messages.length;