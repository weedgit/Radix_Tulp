(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{540:function(t,e,i){"use strict";i.r(e),i.d(e,"DefaultOptions",(function(){return a})),i.d(e,"default",(function(){return h}));var n=i(13),s=i.n(n),o=i(148);function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){s()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}const a={maxCount:600,speed:12};class h{constructor(t){var e=this;s()(this,"options",void 0),s()(this,"context",null),s()(this,"particles",[]),s()(this,"lastAnimationTime",0),s()(this,"isRunning",!1),s()(this,"start",(async function(t){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3;if(!t)return;e.context=t.getContext("2d"),e.particles=[];const n=e.options.maxCount;for(;e.particles.length<n;)e.particles.push(e.resetParticle({},t.width,t.height));e.isRunning=!0,requestAnimationFrame(e.renderLoop),i&&window.setTimeout(e.stop,i)})),s()(this,"stop",(async()=>{this.isRunning=!1})),s()(this,"resetParticle",((t,e,i)=>(t.x=Math.random()*e,t.y=Math.random()*-i,t.width=1.5*Math.random(),t.height=15*t.width+4,t.speed=Math.random()*this.options.speed*4/5+this.options.speed,t))),s()(this,"renderLoop",(()=>{if(this.context&&this.context.canvas)if(0===this.particles.length)this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);else{(Date.now()-this.lastAnimationTime>=15||!this.lastAnimationTime)&&(this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height),this.lastAnimationTime=Date.now(),this.animateAndRenderRaindrops()),requestAnimationFrame(this.renderLoop)}})),s()(this,"animateAndRenderRaindrops",(()=>{if(!this.context||!this.context.canvas)return;const t=this.context.canvas.height;for(const e of Object(o.b)(this.particles)){e.y+=e.speed,this.context.save(),this.context.beginPath(),this.context.rect(e.x,e.y,e.width,e.height),this.context.fillStyle="#5dadec",this.context.fill(),this.context.closePath(),this.context.restore();const i=2*t;if(e.y>t+i){const t=this.particles.indexOf(e);this.particles.splice(t,1)}}})),this.options=c(c({},a),t)}}}}]);
//# sourceMappingURL=4.js.map