// Image-space weather: remains attached to the window as the camera enters the screen.
const photo=document.querySelector('#entry-photo'),host=document.querySelector('.photo-zoom'),layer=document.querySelector('#photo-entry');
const canvas=document.createElement('canvas');canvas.className='workspace-weather';canvas.setAttribute('aria-hidden','true');host.append(canvas);const c=canvas.getContext('2d');let w=0,h=0,time=0,last=0;
function size(){w=photo.offsetWidth;h=photo.offsetHeight;const d=Math.min(devicePixelRatio,1.5);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);Object.assign(canvas.style,{left:photo.offsetLeft+'px',top:photo.offsetTop+'px',width:w+'px',height:h+'px'});c.setTransform(d,0,0,d,0,0)}
photo.addEventListener('load',size);addEventListener('resize',size);size();
const drops=Array.from({length:135},(_,i)=>({x:((i*0.61803398875)%1),y:((i*.41421356)%1),speed:.07+(i%8)*.009,length:.006+(i%5)*.002}));
function windowMask(){c.beginPath();c.moveTo(w*.255,h*.09);c.lineTo(w*.546,h*.06);c.lineTo(w*.548,h*.412);c.lineTo(w*.288,h*.40);c.closePath();c.moveTo(w*.637,h*.055);c.lineTo(w,h*.018);c.lineTo(w,h*.478);c.lineTo(w*.81,h*.44);c.lineTo(w*.64,h*.422);c.closePath();c.clip()}
function frame(ms){requestAnimationFrame(frame);const dt=Math.min(.05,(ms-last)/1000);last=ms;if(document.hidden||getComputedStyle(layer).visibility==='hidden')return;const paused=document.querySelector('#motion').getAttribute('aria-pressed')==='true';if(!paused)time+=dt;c.clearRect(0,0,w,h);if(!w)return;
c.save();windowMask();c.globalCompositeOperation='screen';
for(const d of drops){const y=((d.y+time*d.speed)%1)*h*.51,x=(.22+d.x*.81)*w;c.strokeStyle=`rgba(174,218,240,${.12+(d.speed-.07)*2})`;c.lineWidth=Math.max(.65,w*.0008);c.beginPath();c.moveTo(x,y);c.lineTo(x-w*.004,y+h*d.length);c.stroke()}
// Slower droplets track down the glass in front of the distant rain.
for(let i=0;i<21;i++){const x=w*(.26+(i*.173% .73)),y=h*((i*.079+time*.017)% .5);c.strokeStyle='rgba(193,226,239,.25)';c.lineWidth=w*.0014;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+w*.003,y+h*.012,x-w*.001,y+h*.026);c.stroke()}
const shimmer=.035+.018*Math.sin(time*.7);const g=c.createLinearGradient(0,h*.24,w,h*.4);g.addColorStop(0,'rgba(96,173,220,0)');g.addColorStop(.6,`rgba(96,173,220,${shimmer})`);g.addColorStop(1,'rgba(245,184,112,0)');c.fillStyle=g;c.fillRect(0,0,w,h);c.restore();
// Wisps rise from the photographed mug, with no replacement figure or hand.
c.save();c.globalCompositeOperation='screen';for(let j=0;j<4;j++){const phase=(time*.19+j*.25)%1;const x=w*.327+Math.sin(time*.8+j)*w*.006,y=h*(.564-phase*.064);c.strokeStyle=`rgba(208,220,224,${Math.sin(phase*Math.PI)*.13})`;c.lineWidth=w*(.003+phase*.005);c.filter=`blur(${Math.max(1,w*.002)}px)`;c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x-w*.012,y-h*.012,x+w*.014,y-h*.023,x+w*.002,y-h*.033);c.stroke()}c.restore();
}requestAnimationFrame(frame);
