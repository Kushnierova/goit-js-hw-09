function e(e,t){return new Promise(((n,o)=>{const s=Math.random()>.3;setTimeout((()=>{s?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault();const n=t.target,o=n.elements.delay,s=n.elements.step,l=n.elements.amount,i=parseInt(o.value),a=parseInt(s.value),r=parseInt(l.value);for(let t=0;t<r;t++){e(t+1,i+t*a).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}))}n.reset()}));
//# sourceMappingURL=03-promises.b81ad036.js.map
