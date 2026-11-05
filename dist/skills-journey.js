(()=>{
const projects=document.querySelector('#projects');document.querySelector('.project-movie-ending')?.remove();projects.insertAdjacentHTML('afterend','<section id="skills" aria-label="Follow the light"></section>');
const clamp=v=>Math.max(0,Math.min(1,v)),ease=v=>{v=clamp(v);return v*v*v*(v*(v*6-15)+10)};
const stage=document.createElement('section');stage.className='light-journey';stage.setAttribute('aria-label','From a spark to a new path');
stage.innerHTML=`<div class="lp-dark"></div><div class="lp-world"><img src="assets/light-path-final.png" alt="Silver and gold streams of light converge on a bright distant horizon"><div class="lp-shade"></div><div class="lp-copy"><p class="eyebrow">06 / FOLLOW THE LIGHT</p><h2>Every idea begins<br>with a <em>spark.</em></h2><p>Curiosity lights the way.</p></div></div><nav class="lp-controls" aria-label="Path controls"><button class="lp-motion">Pause motion</button><a href="#projects">Back to projects ↑</a></nav>`;
document.body.append(stage);const q=s=>stage.querySelector(s);let last=-1,lastPaused=null,dirty=true;addEventListener('resize',()=>dirty=true);q('.lp-motion').onclick=()=>document.querySelector('#motion').click();
let finale;import('./journey-finale.js').then(m=>{finale=m.createFinale(stage);dirty=true;});
let cinema;import('./cinematic-world.js').then(m=>{cinema=m.createCinematicWorld(stage);dirty=true;});
let awards;import('./awards-journey.js').then(m=>{awards=m.createAwardsJourney(stage);dirty=true;});
let experience;import('./experience-journey.js').then(m=>{experience=m.createExperienceJourney(stage);dirty=true;});
let pipeline;import('./skills-pipeline.js').then(m=>{pipeline=m.createSkillsPipeline(stage);dirty=true;});
function frame(){requestAnimationFrame(frame);const y=window.cinematicY??scrollY,paused=document.querySelector('#motion').getAttribute('aria-pressed')==='true';if(!dirty&&Math.abs(last-y)<.01&&lastPaused===paused)return;last=y;lastPaused=paused;dirty=false;
 const start=projects.offsetTop+(projects.offsetHeight-innerHeight)*.9,raw=(y-start)/innerHeight,t=raw+1.5*ease((raw-1.75)/.3),arrival=ease((t-3.55)/1.15),travel=ease((t-4.35)/3.1);
 stage.style.visibility=t>0?'visible':'hidden';stage.inert=t<=0;
 q('.lp-dark').style.opacity=ease((t-.15)/1.6);q('.lp-world').style.opacity=arrival;
 // Advance along the optical axis toward the photographed light source.
 const image=q('.lp-world img'),width=Math.max(innerWidth,innerHeight*1150/646),height=width*646/1150;
 Object.assign(image.style,{position:'absolute',width:width+'px',height:height+'px',left:(innerWidth/2-width*.484)+'px',top:(innerHeight*.55-height*.543)+'px',maxWidth:'none',transformOrigin:'48.4% 54.3%',transform:`scale(${paused?1:1/(1-.86*travel)})`});
 q('.lp-copy').style.opacity=ease((t-4.15)/.65)*(1-ease((t-6.25)/.85));q('.lp-copy').style.transform=paused?'none':`translateY(${(1-arrival)*12}px)`;
 finale?.update(t,paused);cinema?.update(t,paused);pipeline?.update(t,paused);experience?.update(t-2.5,paused);awards?.update(t,paused);
 const aw=q('.awards-film');if(aw){aw.style.opacity=String(ease((t-39.4)/1.1)*(1-ease((t-52)/1.1)));aw.inert=t<39.4||t>53;}
 const exp=q('.experience-film');if(exp){exp.style.opacity=String(ease((t-22.05)/1.1)*(1-ease((t-39.4)/1.1)));exp.inert=t<22.05||t>40.5;}
 q('.skills-pipeline')?.style.setProperty('opacity',String(ease((t-7.8)/.9)*(1-ease((t-22.05)/1.1))));if(q('.skills-pipeline'))q('.skills-pipeline').inert=t<7.8||t>23;
 q('.lp-controls a').style.visibility=t>23?'hidden':'visible';
 q('.lp-motion').textContent=paused?'Resume motion':'Pause motion';
}
requestAnimationFrame(frame);
})();
