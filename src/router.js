const routes = [{
   path: '/',
   name: 'index',
   component:require('./view/page'),

},{
   path: '/login',
   name: 'login',
   component:require('./view/login')
},{
   path: '/messages',
   name: 'messages',
   component:require('./view/messages')
},{
	path:'/tab/:tab/page/:page',
	name: 'tab',
	component:require('./view/page')
},{
   path:'/user/:name',
   name:'user',
   component:require('./view/user')
},{
   path:'/topic/:id',
   name:'topic',
   component:require('./view/topic')
},{
   path:'/create',
   name:'create',
   component:require('./view/create')
}];


export default routes;