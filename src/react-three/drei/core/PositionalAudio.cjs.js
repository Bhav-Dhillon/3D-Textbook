"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),r=require("react"),t=require("three"),u=require("@react-three/fiber"),n=require("react-merge-refs");function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function a(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach((function(t){if("default"!==t){var u=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,u.get?u:{enumerable:!0,get:function(){return e[t]}})}})),r.default=e,Object.freeze(r)}var c=o(e),s=a(r),i=o(n);const f=s.forwardRef((({url:e,distance:r=1,loop:n=!0,autoplay:o,...a},f)=>{const d=s.useRef(),l=u.useThree((({camera:e})=>e)),[p]=s.useState((()=>new t.AudioListener)),b=u.useLoader(t.AudioLoader,e);return s.useEffect((()=>{const e=d.current;e&&(e.setBuffer(b),e.setRefDistance(r),e.setLoop(n),o&&!e.isPlaying&&e.play())}),[b,l,r,n]),s.useEffect((()=>{const e=d.current;return l.add(p),()=>{l.remove(p),e&&(e.isPlaying&&e.stop(),e.source&&e.source._connected&&e.disconnect())}}),[]),s.createElement("positionalAudio",c.default({ref:i.default([d,f]),args:[p]},a))}));exports.PositionalAudio=f;