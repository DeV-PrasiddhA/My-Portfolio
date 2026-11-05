import * as T from './vendor/three.module.min.js';
export function createTouchEarth(host){
 const holder=document.createElement('div');holder.className='touch-earth';holder.setAttribute('role','img');holder.setAttribute('aria-label','A slowly rotating golden Earth forms from the spark');host.append(holder);
 let renderer;
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true});}catch{holder.classList.add('fallback');return {set(p){holder.style.opacity=p;}};}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));holder.append(renderer.domElement);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(40,1,.1,20);camera.position.z=4.1;
 const group=new T.Group();scene.add(group);group.rotation.z=.14;
 const texture=new T.TextureLoader().load('assets/earth-surface.jpg');
 const material=new T.ShaderMaterial({transparent:true,uniforms:{map:{value:texture}},vertexShader:`varying vec2 vUv;varying vec3 n;varying vec3 viewDir;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);viewDir=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,fragmentShader:`uniform sampler2D map;varying vec2 vUv;varying vec3 n;varying vec3 viewDir;void main(){vec3 c=texture2D(map,vUv).rgb;float land=smoothstep(-.02,.07,c.r-c.b*.85);float lat=pow(abs(cos(vUv.y*3.14159*18.)),50.);float lon=pow(abs(cos(vUv.x*3.14159*36.)),70.);float dots=step(.55,sin(vUv.x*1500.)*sin(vUv.y*750.));float rim=pow(1.-max(0.,dot(normalize(n),normalize(viewDir))),2.7);vec3 gold=mix(vec3(.19,.10,.025),vec3(1.,.81,.43),land*(.65+dots*.35));gold+=vec3(1.,.78,.4)*(rim*.9+(lat+lon)*.15);gl_FragColor=vec4(gold,.53+land*.32+rim*.15);}`});
 const earth=new T.Mesh(new T.SphereGeometry(1,64,48),material);group.add(earth);
 const rings=[];
 for(let i=0;i<2;i++){const points=[];for(let j=0;j<=150;j++){const a=j/150*Math.PI*2;points.push(new T.Vector3(Math.cos(a)*1.27,Math.sin(a)*1.27,0));}const ring=new T.Line(new T.BufferGeometry().setFromPoints(points),new T.LineBasicMaterial({color:0xffd890,transparent:true,opacity:.45}));ring.rotation.x=1.1+i*.45;ring.rotation.y=i*.6;group.add(ring);rings.push(ring);}
 const satellites=new T.Group();group.add(satellites);for(let i=0;i<8;i++){const a=i/8*Math.PI*2,s=new T.Mesh(new T.SphereGeometry(.015,6,6),new T.MeshBasicMaterial({color:0xffe3a1}));s.position.set(Math.cos(a)*1.27,Math.sin(a)*.5,Math.sin(a)*1.1);satellites.add(s);}
 let progress=0,paused=false,last=0,size=0,dirty=true;
 const resize=new ResizeObserver(()=>dirty=true);resize.observe(holder);
 function render(ms){requestAnimationFrame(render);const dt=Math.min((ms-last)/1000,.04);last=ms;if(progress<=0||document.hidden)return;
 if(dirty){size=holder.clientWidth;renderer.setSize(size,size,false);dirty=false;}
 if(!paused){earth.rotation.y+=dt*.09;satellites.rotation.y+=dt*.14;}
 group.scale.setScalar(.3+.7*progress);renderer.render(scene,camera);
 }
 requestAnimationFrame(render);
 return {set(p,stop){progress=p;paused=stop;holder.style.opacity=p;holder.style.visibility=p>0?'visible':'hidden';}};
}
