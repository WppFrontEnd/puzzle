;(function(){
	function Puzzle(){
		this.canvas = document.getElementById('pintu');
		this.context = this.canvas.getContext('2d');

		this.imgDomList =  document.querySelectorAll('img');
		this.imgCanvasList = Array.prototype.slice.call(this.imgDomList);// this.imgDomList.toArry().slice();
	}
	Puzzle.prototype = {
		init: function(url){
			var puzzleImg = new Image();
				puzzleImg.src= url;
			var self = this;
			puzzleImg.onload = function(){
				//sort images
				self.sortImg();
				//images segmentation
				self.segmentImg(puzzleImg);
				//drag images
				self.dragEvent();
			}
			
		},
		segmentImg: function(puzzleImg){
			var index =0;
			divisionNum =3; 
			var imgHeight =  puzzleImg.height;
			var imgWidth = puzzleImg.width;
			var sigelH = imgHeight/divisionNum;
			var sigelW = imgWidth/divisionNum;
			this.canvas.height = sigelH;
			this.canvas.width  = sigelW;	
			for(var i=0;i<divisionNum;i++){
				for(var j=0;j<divisionNum;j++){
					posX = sigelW * j+(5*j);
					posY = sigelH * i+(5*i);
					this.context.drawImage(puzzleImg, sigelW * j, sigelH * i, sigelW, sigelH, 0, 0, sigelW, sigelH);
					this.imgCanvasList[index].src= this.canvas.toDataURL('image/jpeg');
					this.imgCanvasList[index].id=index;
					index++;					
				}
			}
		},	
		sortImg: function(){
			this.imgCanvasList.sort(function(){
				return Math.random() - Math.random();
			});
		},
		dragEvent: function(){
			var contain = document.getElementById('game');
			//bind dragStart function
			var imgList = contain.querySelectorAll('img');
			var that = this;
			var listLen = that.imgDomList.length;
			var originImgIndex;
			var dragImgIndex;
			

			for(var i=0, len = that.imgDomList.length; i < len; i++ ){
				var draggie = new Draggabilly(that.imgDomList[i]);
				draggie.on( 'dragStart', function( event, pointer) {
					dragImg = event.srcElement;
				});

				draggie.on( 'dragEnd', function( event, pointer) {
					console.log(pointer);
					var clickX = pointer.pageX;
					var clickY = pointer.pageY;
					console.log(clickX+ '   '+clickY);
					var index =0;
					for(var i=0;i<listLen;i++){
						var posX1 = that.imgDomList[i].offsetTop;
						var posX2 = posX1+that.imgDomList[i].height;
						var posY1 = that.imgDomList[i].offsetLeft;
						var posY2 = posY1+that.imgDomList[i].width;
						if(clickX>=posY1&&clickX<=posY2&&clickY>=posX1&&clickY<=posX2){
							index++;
							if(index==1){
								originImgIndex = i;
							}else if(index==2){
								dragImgIndex = i;
								index=0;
							}
						}
					}
					
					var originImgId = that.imgDomList[originImgIndex].id;
					var originObj = document.getElementById(originImgId);
					var cache = {
                        'src': originObj.src,
                        'id': originObj.id
                    };
                    
                    if(!dragImgIndex){
                    	originObj.style.left=0;
	                    originObj.style.top=0;
	                    originImgIndex="";
	                    dragImgIndex="";
                    }else{
                    	var endObjId = that.imgDomList[dragImgIndex].id;
						var endObj = document.getElementById(endObjId);
						originObj.src=endObj.src;
						originObj.id=endObj.id;
						endObj.src = cache.src;
	                    endObj.id = cache.id;
	                    originObj.style.left=0;
	                    originObj.style.top=0;
	                    endObj.style.left=0;
	                    endObj.style.top=0;
	                   	originImgIndex="";
	                    dragImgIndex="";
                    }
                    that.isSuccess();
				})
			}
			
		},
		isSuccess: function(){
			var flag=0;
			for(var i=0,len=this.imgDomList.length;i<len;i++){
				console.log(i+'  '+this.imgDomList[i].id);
				if(i==this.imgDomList[i].id){
					flag++					
				}
			}
			if(flag==this.imgDomList.length){
				setTimeout(function(){alert('成功')},500);
			}
		}

	}
	var puzzle = new Puzzle();
	puzzle.init("../../images/img4.jpg");

})();

