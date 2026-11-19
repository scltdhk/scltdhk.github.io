const {readFileSync}=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const code=readFileSync('block/singular-integration.js','utf8');
function run({entry='one-clipboard',enabled=true,ios=true,throwSdk=false,ready=true,checked=true}={}){
 const calls=[],buttons=[0,1].map(()=>({href:'https://www.google.com/',addEventListener(t,f){this.click=f}}));
 const notice={hidden:true},root={dataset:{}},head={appendChild(s){calls.push(['load',s.src]);if(ready)s.onload();}};
 const config={enabled,sdkKey:'offline-test',sdkSecret:'offline-test',productId:'com.scltdhk.block.web',iosBaseLink:'https://unit.sng.link/A/test'};
 const context={URL,document:{documentElement:root,head,createElement:()=>({}),querySelectorAll:()=>buttons,querySelector:s=>s==='#clipboard-notice'?notice:{checked}},location:{href:'https://www.scltdhk.com/block/?entry='+entry},navigator:{userAgent:ios?'iPhone':'Desktop',platform:'',maxTouchPoints:0},window:{BLOCK_SINGULAR_CONFIG:config,isSecureContext:true}};
 context.window.SingularConfig=class{withInitFinishedCallback(f){this.f=f;return this}};
 context.window.singularSdk={init(c){c.f()},buildWebToAppLink(...a){calls.push(['build',...a]);if(throwSdk)throw Error();return 'https://unit.sng.link/A/test?_ddl=x';},enrichUrlWithClipboardDdlFlow(u){calls.push(['clipboard']);return u+'&ecid=offline-test';}};
 vm.runInNewContext(code,context);buttons[1].click?.({});return{calls,buttons,notice,state:root.dataset};
}
let r=run();assert.equal(r.calls.filter(x=>x[0]==='clipboard').length,1);assert.equal(r.calls.find(x=>x[0]==='build')[2],'blockdoku-bdki://startup?policy=first_ad_1&v=1');assert.equal(r.calls.find(x=>x[0]==='build')[3],'block_startup_v1:clipboard');
r=run({entry:'two-ordinary'});assert.equal(r.calls.find(x=>x[0]==='build')[2],'blockdoku-bdki://startup?policy=first_ad_2&v=1');assert(!r.calls.some(x=>x[0]==='clipboard'));
for(const options of [{ios:false},{checked:false}]){r=run(options);assert.equal(r.calls.find(x=>x[0]==='build')[3],'block_startup_v1:ordinary');assert(!r.calls.some(x=>x[0]==='clipboard'));}
for(const entry of ['bad','one-clipboard&entry=two-clipboard','']){r=run({entry});assert.equal(r.calls.find(x=>x[0]==='build')[2],undefined);assert(!r.calls.some(x=>x[0]==='clipboard'));}
for(const options of [{enabled:false},{ready:false},{throwSdk:true}]){r=run(options);assert.equal(r.buttons[1].href,'https://www.google.com/');}
r=run({enabled:false});assert.equal(r.calls.length,0);assert.equal(r.state.singularState,'disabled');
console.log('PASS: fixed policies, clipboard opt-out, desktop ordinary, invalid/duplicate inputs, disabled/loading/throw fallback. Offline stub only; no attribution requests.');
