
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
		preRemoveId:null//准备要删除的todo.id
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
    }
})

/*
 *有没有完成的关键数据跟todo有关系，所以isFinished写在todos里
 *点击button按钮删除数据--->方法
 *弹出框-->触发冒泡，点击确定的时候弹出层也一起消失--利用了冒泡
 * 
 * 
*/