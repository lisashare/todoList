
new Vue({
    el:'#app',//不允许挂载在body上
    data:{
		todos:[
		//有没有完成的关键数据跟todo有关系，所以isFinished写在todos里面
			{id:1,title:'我爱编程',isFinished:false},
			{id:2,title:'coding使我快乐',isFinished:true}
		],
		isRemoveShow:false, //弹出框
		//点击弹出层确定的时候，发现没得传，找一个桥梁
		preRemoveId:null,//准备要删除的todo.id
    	showBtns:[ 		//控制显示类型的按钮数据   theme主题
    		{id:1,title:'A',type:'all',theme:"success"},
    		{id:2,title:'F',type:'finished',theme:"primary"},
    		{id:3,title:'U',type:'unfinished',theme:"danger"}
    	],
    	activeShowType:'all' //用来处理到底要显示什么类型的数据
    },
    methods:{
    	//检查当前的todo是否完成的方法，如果未完成，显示弹出框，否则直接删除
    	checkFinished(id,isFinished){
    		//未完成
    		if(!isFinished){
    			this.isRemoveShow = true;
    			//把准备要删除的id先存一波
    			this.preRemoveId = id; 
    			return false;
    		}
    		//已经完成
    		this.removeTodo(id)
    	},
    	//负责删除某一个todo，接收到要删除的todo的id，当数据改变后，vue重新编译模板
    	removeTodo (id) {
    		this.todos = this.todos.filter(todo=>{
    			return todo.id !== id ? todo:false;
    		})
    	}
    },
    computed:{
    	//全部都是已经完成的
    	finishedTodos(){
    		//根据现有的全部的todos去生成一个全部都是已经完成的todos新数据
    		return this.todos.filter(todo=>{
    			return todo.isFinished?todo:false; 
    		})
    	},
    	//全部都是未完成的
    	unfinishedTodos(){
    		//根据现有的全部的todos去生成一个全部都是未完成的todos新数据
    		return this.todos.filter(todo=>{
    			return !todo.isFinished?todo:false; 
    		})
    	},
    	//真正要显示的数据
    	showTodos(){
    		switch( this.activeShowType ){
    			case 'all':return this.todos;
    			case 'finished':return this.finishedTodos;
    			case 'unfinished':return this.unfinishedTodos;
    		}
    	}
    }
})

/*
 *有没有完成的关键数据跟todo有关系，所以isFinished写在todos里
 *点击button按钮删除数据--->方法
 *弹出框-->触发冒泡，点击确定的时候弹出层也一起消失--利用了冒泡
 * 下方按钮，最好用数据循环，方便后期维护
 * 点击按钮切换数据，
*/
// 难点：
// 1. 在控制要显示的数据的时候，千万不要通过点击按钮来直接控制所有的数据，而是利用计算属性，创造出两个新的数据。一个全部都是完成的，一个全部都是未完成的，然后再创造一个真正要显示的数据,也就是当点击按钮之后，activeShowType发生改变，然后showTodos就会重新计算出真正要显示的数据