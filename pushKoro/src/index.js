
// 初始化数据，为了第一次创建地图
var col=12;//上下移动的div数量
var level=0;//初始第一关
var goalList=[4,3,4,4,3,5,5,6,5,4]; //每关箱子数量。
var origin=[54,15,39,29,17,21,45,94,39,56];//每关初始皮卡丘的位置（相对于全部div）
var goal=goalList[level]; //过关条件
var position=origin[level];

var builder=[
    //二维数组 ，一行十二个，代表html对应的每一行div
    //0代表不可抵达区域，1代表目标（要被推到的地方），2代表普通路径（可以走的），3代表墙，4代表箱子
    [
        0,0,0,0,3,3,3,0,0,0,0,0,
        0,0,0,0,3,1,3,0,0,0,0,0,
        0,0,0,0,3,2,3,3,3,3,0,0,
        0,0,3,3,3,4,2,4,1,3,0,0,
        0,0,3,1,2,4,2,3,3,3,0,0,
        0,0,3,3,3,3,4,3,0,0,0,0,
        0,0,0,0,0,3,1,3,0,0,0,0,
        0,0,0,0,0,3,3,3,0,0,0,0
    ],
    [
        0,0,3,3,3,3,3,0,0,0,0,0,
        0,0,3,2,2,2,3,0,0,0,0,0,
        0,0,3,2,4,4,3,0,3,3,3,0,
        0,0,3,2,4,2,3,0,3,1,3,0,
        0,0,3,3,3,2,3,3,3,1,3,0,
        0,0,0,3,3,2,2,2,2,1,3,0,
        0,0,0,3,2,2,2,3,2,2,3,0,
        0,0,0,3,2,2,2,3,3,3,3,0,
        0,0,0,3,3,3,3,3,0,0,0,0
    ],
    [
        0,0,3,3,3,3,3,3,3,0,0,0,
        0,0,3,2,2,2,2,2,3,3,3,0,
        0,3,3,4,3,3,3,2,2,2,3,0,
        0,3,2,2,2,4,2,2,4,2,3,0,
        0,3,2,1,1,3,2,4,2,3,3,0,
        0,3,3,1,1,3,2,2,2,3,0,0,
        0,0,3,3,3,3,3,3,3,3,0,0
    ],
    [
        0,0,0,0,3,3,3,3,0,0,0,0,
        0,0,0,3,3,2,2,3,0,0,0,0,
        0,0,0,3,2,2,4,3,0,0,0,0,
        0,0,0,3,3,2,2,3,3,0,0,0,
        0,0,0,3,3,4,4,2,3,0,0,0,
        0,0,0,3,1,4,2,2,3,0,0,0,
        0,0,0,3,1,1,2,1,3,0,0,0,
        0,0,0,3,3,3,3,3,3,0,0,0
    ],
    [
        0,0,0,3,3,3,3,3,0,0,0,0,
        0,0,0,3,2,2,3,3,3,0,0,0,
        0,0,0,3,2,4,2,2,3,0,0,0,
        0,0,3,3,3,2,3,2,3,3,0,0,
        0,0,3,1,3,2,3,2,2,3,0,0,
        0,0,3,1,4,2,2,3,2,3,0,0,
        0,0,3,1,2,2,2,4,2,3,0,0,
        0,0,3,3,3,3,3,3,3,3,0,0
    ],
    [
        0,0,0,0,3,3,3,3,3,3,3,0,
        0,0,0,3,3,2,2,3,2,2,3,0,
        0,0,0,3,2,2,2,3,2,2,3,0,
        0,0,0,3,4,2,4,2,4,2,3,0,
        0,0,0,3,2,4,3,3,2,2,3,0,
        0,3,3,3,2,4,2,3,2,3,3,0,
        0,3,1,1,1,1,1,2,2,3,0,0,
        0,3,3,3,3,3,3,3,3,3,0,0
    ],
    [
        0,0,0,0,3,3,3,3,3,3,0,0,
        0,0,3,3,3,2,2,2,2,3,0,0,
        0,3,3,1,2,4,3,3,2,3,3,0,
        0,3,1,1,4,2,4,2,2,2,3,0,
        0,3,1,1,2,4,2,4,2,3,3,0,
        0,3,3,3,3,3,3,2,2,3,0,0,
        0,0,0,0,0,0,3,3,3,3,0,0
    ],
    [
        0,0,3,3,3,3,3,3,3,3,3,0,
        0,0,3,2,2,3,3,2,2,2,3,0,
        0,0,3,2,2,2,4,2,2,2,3,0,
        0,0,3,4,2,3,3,3,2,4,3,0,
        0,0,3,2,3,1,1,1,3,2,3,0,
        0,3,3,2,3,1,1,1,3,2,3,3,
        0,3,2,4,2,2,4,2,2,4,2,3,
        0,3,2,2,2,2,2,3,2,2,2,3,
        0,3,3,3,3,3,3,3,3,3,3,3
    ],
    [
        0,0,0,0,3,3,3,3,3,3,0,0,
        0,0,0,0,3,2,2,2,2,3,0,0,
        0,0,3,3,3,4,4,4,2,3,0,0,
        0,0,3,2,2,4,1,1,2,3,0,0,
        0,0,3,2,4,1,1,1,3,3,0,0,
        0,0,3,3,3,3,2,2,3,0,0,0,
        0,0,0,0,0,3,3,3,3,0,0,0
    ],
    [
        0,0,3,3,3,3,0,0,3,3,3,3,
        3,3,3,2,2,3,0,0,3,2,2,2,
        3,3,2,4,2,3,3,3,3,4,2,2,
        3,3,2,2,4,1,1,1,1,2,4,2,
        3,3,3,2,2,2,2,3,2,2,2,3,
        3,0,3,3,3,3,3,3,3,3,3,3
    ]
];

$("button").click(function(){
    level=$("select").val();//赋值关卡
    goal = goalList[level]; //赋值过关箱子。
    position = origin[level];//皮卡丘位置
    create(); //创建地图
})

var box=$('.box div'); 
create();//第一关地图

function create(){ //创建地图函数
    box.each(function(index){ //index的数量是固定的，是box div下面div的数量
         // 每次创建地图初始化div
        box.eq(index).removeClass();
    });
    box.each(function(index,element){ //循环整个div的数量 二维数组里数量不够的 默认为空白
        if(builder[level][index]){ //过滤0
            box.eq(index).addClass('type'+builder[level][index]);
        }
    });
    box.eq(origin[level]).addClass("pusher"); //皮卡丘位置
}

$(document).keydown(function (e) {
    var key=e.which;
    switch(key){
        //方向键上或者w
        case 87:
        case 38:
            move(-col);
        break;
        //方向键下或者s
        case 83:
        case 40:
           move(col);
        break;
        //方向键左或者a
        case 65:
        case 37:
            move(-1);
        break;
        //方向键右或者d
        case 68:
        case 39:
            move(1);
        break;
    }

    setTimeout(win,500); //按键之后调判断是否过关
});



function move(step){ //是否移动判断
     // 分为两个判断条件一个是推箱子，一个是不推箱子 自然移动。 否则不移动皮卡丘
     //step 上下是12个div一个周期，左右是1个div positin是皮卡丘的原来位置
    var pikaqiu1=box.eq(position);//皮卡丘现在的地方
    var pikaqiu2=box.eq(position+step);//皮卡丘要去的下一个地方
    var pushBox=box.eq(position+step*2);//箱子要去的下一个地方
    if(!pikaqiu2.hasClass('type4')&&( pikaqiu2.hasClass('type1')||pikaqiu2.hasClass('type2'))){ //自然移动
        //这一步和下一步判断是否有type4的原因是普通路径会变成有type4的路径，这时候就会出现问题
        pikaqiu1.removeClass("pusher");
        pikaqiu2.addClass("pusher");//移动皮卡丘
        position=position+step;//增加position值
    }
    else if((pikaqiu2.hasClass('type4'))&&(!pushBox.hasClass('type4'))&&(pushBox.hasClass('type1')|| pushBox.hasClass('type2')) ) {
        //推箱子    
        //如果下一个div的class包含type4并且 不包含重叠type4 并且 包含class type1（目标位置）或者 包含type2(空路)
       pikaqiu2.removeClass('type4');
        pikaqiu1.removeClass("pusher");
        pushBox.addClass('type4');
        pikaqiu2.addClass("pusher").addClass("type2");//本来是type4 移除之后，这里没有class了，要变成普通路径
        position=position+step;//增加position值 
    }
}

function win(){ //胜利条件判断
    if($(".type1.type4").length===goal){ //推的箱子与关卡设置通过箱子对比
        if(level<9) {
            alert("666，挑战下一关吧--OBKoro1");
            level++; //关卡+1
            goal = goalList[level];
            position = origin[level];
            create();
        }else {
            alert("厉害啊 大佬 通关了都");
        }
    }
}
