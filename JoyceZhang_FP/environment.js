//VIRTUAL REALITY ENVIRONMENT

function Environment(xPos,yPos,iWidth,iHeight,col,hCol,imgS,img) {
  this.x=xPos;
  this.y=yPos;
  this.w=iWidth;
  this.h=iHeight;
  this.c=col;
  this.c2=hCol;
  this.imgS=imgS;
  this.img=img;
  this.sketch=true;
  this.hover=false;
  this.selected=false;
  this.brush=30;
  this.gl=500;
  
  //tests if mouse is hovered over image
  this.ifHover=function(x,y) {
    if((abs(x-this.x)<=this.w/2) && (abs(y-this.y)<=this.h/2)) {
      this.hover=true;
      //tests if image is clicked
      if(mouseIsPressed) {
        this.selected=true;
      }
    } else {
      this.hover=false;
    }
  }
  
  //lets user control brush size with '[' and ']'
  this.brushSize=function(s) {
    if(s===1  && this.brush>10) {
      this.brush-=10;    //smaller
    } else if(s===0) {
      this.brush+=10;    //bigger
    }
  }
  
  //reset values
  this.reset=function() {
    this.sketch=true;
    this.hover=false;
    this.selected=false;
    this.brush=30;
    this.gl=500;
  }
  
  this.display=function() {
    //draw page
    if (this.selected) {
      //sketch
      if(this.sketch) {
        //use mouse to 'draw' the sketch
        copy(this.imgS,mouseX-180,mouseY-93,this.brush,this.brush,mouseX-15,mouseY-15,this.brush,this.brush);
      //actual image
      } else {
        //reveals actual picture from bottom up
        if(this.gl>50) {
          //large chunks
          var px1=random(0,width);
          var py1=random(this.gl-20,this.gl+20);
          var pw1=random(25,55);
          var ph1=random(25,55);
          //small chunks
          copy(this.img,(px1-165)*5,(py1-78)*5,pw1*5,ph1*5,px1,py1,pw1,ph1);
          var px2=random(0,width);
          var py2=random(this.gl-30,this.gl-70);
          var pw2=random(5,15);
          var ph2=random(5,15);
          copy(this.img,(px2-165)*5,(py2-78)*5,pw2*5,ph2*5,px2,py2,pw2,ph2);
          //reveals more of picture every second (speed control)
          if(second()%1==0) {
            this.gl-=0.3;
          }
        } else {
          //display whole/completed image at the end
          //otherwise there may be a couple unrevealed spots
          image(this.img,width/2+15,height/2-22,600,400);
        }
      }
    //shelter page
    } else {
      //for choice page
      //tint(255,150);      <--making program lag a lot
      image(this.img,this.x,this.y,this.w,this.h);
      //border changes color if hovered
      if (this.hover) {
        stroke(this.c);
      } else {
        stroke(this.c2);
      }
      fill(255,50);
      strokeWeight(3);
      rect(this.x,this.y,this.w,this.h,3);
    }
    //noTint();
  }
}