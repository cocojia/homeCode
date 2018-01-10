$(function(){
		//滚滚屏幕 开始
		//页面加载完成之后 第一件事 就是把高度赋值给con盒子
		var myWheHeight = $(window).height();
		$('.myWheel').css('height',''+myWheHeight+'px');
		//窗口大小改变事件：如果用户改变了窗口的大小，就会触发此事件，并且实时的把当前窗口的高度赋值给myWheel
		$(window).resize(function(e) {
            var myWhHeight = $(window).height();
			$('.myWheel').css('height',''+myWheHeight+'px'); 
        });
		var wheNum = 0;
		$(document).mousewheel(function(event,delta){//如果myWheel盒子还在移动 那么我们就不能让以下代码执行
			if(!$('.myWheel').is(':animated') == true){
				//经过测试 如果delta等于正1代表鼠标滚轮是向上滚动 否则-1就是是向下滚动
				if(delta == -1){
					wheNum++;
					if(wheNum > 5){//判断极值
						wheNum = 5;	//保留最大值
					}	
				}else if(delta == 1){
					wheNum--;
					if(wheNum < 0){
						wheNum = 0;	
					}	
				}
				//滚动屏幕
				var bfb = wheNum * -100;//百分比
				$('.myWheel').css({'-webkit-transform':'translateY('+bfb+'%)','-moz-transform':'translateY('+bfb+'%)','-ms-transform':'translateY('+bfb+'%)','-o-transform':'translateY('+bfb+'%)','transform':'translateY('+bfb+'%)'});
				//控制圆点
				$('.yuanDian li').eq(wheNum).addClass('ydCur').siblings().removeClass('ydCur');	
			}
		});
		//点击圆点控制滚动
		$('.yuanDian li').click(function(e) {
            $(this).addClass('ydCur').siblings().removeClass('ydCur');	
			wheNum = $(this).index();
			var bfb = wheNum * -100;
			$('.myWheel').css({'-webkit-transform':'translateY('+bfb+'%)','-moz-transform':'translateY('+bfb+'%)','-ms-transform':'translateY('+bfb+'%)','-o-transform':'translateY('+bfb+'%)','transform':'translateY('+bfb+'%)'});
			
        });
		
		//滚滚屏幕 结束
		
});

$(function(){
		//固定导航  开始
		var myHead = $('.header').offset().top;
		$(window).scroll(function(e) {
            if($(window).scrollTop() > myHead){
				$('.myHead').addClass('fixedHead');
			}else{
				$('.myHead').removeClass('fixedHead');
			}
        });
		//固定导航  结束
		
		//获取导航点击到相对应的页面
		$('.nav li').click(function(e) {
			var navIndex = $(this).index()-1;
			if(navIndex == -1){
				$('html,body').animate({'scrollTop':'0px'},300);
			}else{
				var jump = $('.louCeng').eq(navIndex).offset().top;
				$('html,body').animate({'scrollTop':''+jump+'px'},300);
			}
   		});

		//
		
		//主视觉轮播 开始
		var timer01 = null;
		var num = 0;
		var fnTimer =function(){
			num++;
			if(num == $('.banner ul li').length){
				num = 0;
			}
            $('.banner ul li').eq(num).hide().stop().fadeIn().siblings().hide();
			$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');			
		}
		$('.banner ul li:first').show();
		$('.banner ol li').mouseover(function(e) {
			$(this).addClass('current').siblings().removeClass('current');
			var thisIndex = $(this).index();
            $('.banner ul li').eq(thisIndex).hide().stop().fadeIn().siblings().hide();
			num = thisIndex;
        });
		timer01 = setInterval(fnTimer,2000);
		$('.banner ul li').mouseover(function(e) {
            clearInterval(timer01);
        }).mouseout(function(e) {
            clearInterval(timer01);
			timer01 = setInterval(fnTimer,2000);
        });
		//主视觉banner轮播 结束
		

		//banner作品展示 开始  //呼吸灯轮换图效果
		var banNum = 0;//全局变量
		//定时器控制轮播 
		var timer02 = null;
		var timerBanner = function(){
			banNum++;
			$('.bannerBox ul li').css({"-webkit-transform":"rotateX(" + -90*banNum +"deg)","-moz-transform":"rotateX(" + -90*banNum +"deg)","-ms-transform":"rotateX(" + -90*banNum +"deg)","-o-transform":"rotateX(" + -90*banNum +"deg)"});
			if(banNum > 4){
				banNum = 0;
			}
		};
		timer02 = setInterval(timerBanner,2000);        		
		//轮播作品展示  结束
		
		  //无缝滚动轮换图效果

		//$('.viBox ul li:eq(0),.con ul li:eq(1)').clone(true);
		$('.viBox ul').append($('.viBox ul li:eq(0),.viBox ul li:eq(1)').clone(true));//这就代表把克隆的第0个和第1个 都插入到ul标签的最后位置
		var timer03 = null;
		var viNum = 0;
		var fangXiang = -6;//全局变量 控制方向
		//点击左右按钮控制方向
		$('.virightBtn').click(function(e) {
            fangXiang = 6;
        });
		$('.vileftBtn').click(function(e) {
            fangXiang = -6;
        });
		var myviTimer = function(){
			viNum+=fangXiang;// num = num - 3;  '+num+'
			//如果num的值小于-1200 那么我们要让num的恢复到0
			if(viNum < -7200){
				viNum = 0;
			}else if(viNum > 0){
				viNum = -7200;
			}
			$('.viBox ul').css('left',''+viNum+'px');
		};
		timer03 = setInterval(myviTimer,30);
		$('.viBox ul li').hover(function(e) {
            $(this).siblings().stop().fadeTo(300,0.3);
			//清除定时器
			clearInterval(timer03);
        },function(){
			$(this).siblings().stop().fadeTo(300,1);
			//离开的时候再开启定时器
			clearInterval(timer03);
			timer03 = setInterval(myviTimer,30);
		});
		//无缝滚动轮换图效果结束
		
		//web作品展示  开始  //突出展示效果
		var webThis = this;
		$('.webBox ul li').mouseover(function(e) {
			
            $(webThis).siblings().stop().fadeTo(300,0.5);
        }).mouseout(function(e) {
            $(webThis).siblings().stop().fadeTo(300,1);
        });
		//web作品展示  结束		
		
		//技能  开始
		$('.skill_logo li').mouseenter(function(){ 
			$(this).find('span img').stop().animate({'top':'-50px'},33);
			$(this).find('img').css({'-webkit-transform':'rotate(360deg)','-moz-transform':'rotate(360deg)','-ms-transform':'rotate(360deg)','-o-transform':'rotate(360deg)','transform':'rotate(360deg)'});
			
		}).mouseleave(function(){ 
			$(this).find('img').css({'-webkit-transform':'rotate(-360deg)','-moz-transform':'rotate(-360deg)','-ms-transform':'rotate(-360deg)','-o-transform':'rotate(-360deg)','transform':'rotate(-360deg)'});
			$(this).find('span img').stop().animate({'top':'0'},33);
		});		
		//技能  结束

})




		