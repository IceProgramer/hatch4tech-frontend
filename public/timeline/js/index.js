var odiv_t=document.querySelector('.timeline_div');
var odiv=document.querySelectorAll('.timeline_div div');
var odiv_length=odiv.length;
var num=0,wheel;
var timeline_box=document.querySelectorAll('.timeline-box');
var timelenght=timeline_box.length;
var imgs=document.querySelectorAll('img');
var ln = 0;  
for(var i=0;i<odiv_length;i++)
{
    if(i%4==0)
    {
        odiv[i].className='f-border';
    }
    var n=parseInt( i / 4) % 2==0?num++:num--
    wheel=odiv_t.offsetHeight/5*n
    odiv[i].style.transform='translateY('+wheel+'px)';

    (function(i){
       
        setTimeout(function(){

            odiv[ln].classList.remove('active');
            odiv[i].classList.add('active'); 

            ln = i;

            if(i==odiv_length-1)
            {
               setTimeout(function(){
                odiv[i].classList.remove('active');
               },500)
            }
            timeline_box[parseInt(i/4)].style.opacity= 1;  
            timeline_box[parseInt(i/4)].style.transform='scaleX(1)';
                  

        },150*i)

    }(i))



}

for(var i=0;i<timelenght;i++)
{
    timeline_box[i].index=i;
    timeline_box[i].onmouseover=function(){
    timeline_box[this.index].style.transform=this.index%2?'translateY(10px)':'translateY(-10px)'
    imgs[this.index].style.transform='rotate(360deg)' ; 
}
    timeline_box[i].onmouseout=function(){
        timeline_box[this.index].style.transform='translateY(0)';
        imgs[this.index].style.transform='rotate(0)' ; 
    }
}