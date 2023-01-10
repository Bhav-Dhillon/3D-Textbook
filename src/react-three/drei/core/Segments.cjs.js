"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("three"),r=require("react"),n=require("react-merge-refs"),o=require("@react-three/fiber"),c=require("three-stdlib");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function i(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var u=s(e),a=i(t),l=i(r),f=s(n);const m=l.createContext(null),d=l.forwardRef(((e,t)=>{l.useMemo((()=>o.extend({SegmentObject:b})),[]);const{limit:r=1e3,lineWidth:n=1,children:s,...i}=e,[f,d]=l.useState([]),[p]=l.useState((()=>new c.Line2)),[g]=l.useState((()=>new c.LineMaterial)),[h]=l.useState((()=>new c.LineSegmentsGeometry)),[w]=l.useState((()=>new a.Vector2(512,512))),[S]=l.useState((()=>Array(6*r).fill(0))),[j]=l.useState((()=>Array(6*r).fill(0))),v=l.useMemo((()=>({subscribe:e=>(d((t=>[...t,e])),()=>d((t=>t.filter((t=>t.current!==e.current)))))})),[]);return o.useFrame((()=>{for(let t=0;t<r;t++){var e;const r=null==(e=f[t])?void 0:e.current;r&&(S[6*t+0]=r.start.x,S[6*t+1]=r.start.y,S[6*t+2]=r.start.z,S[6*t+3]=r.end.x,S[6*t+4]=r.end.y,S[6*t+5]=r.end.z,j[6*t+0]=r.color.r,j[6*t+1]=r.color.g,j[6*t+2]=r.color.b,j[6*t+3]=r.color.r,j[6*t+4]=r.color.g,j[6*t+5]=r.color.b)}h.setColors(j),h.setPositions(S),p.computeLineDistances()})),l.createElement("primitive",{object:p,ref:t},l.createElement("primitive",{object:h,attach:"geometry"}),l.createElement("primitive",u.default({object:g,attach:"material",vertexColors:!0,resolution:w,linewidth:n},i)),l.createElement(m.Provider,{value:v},s))}));class b{constructor(){this.color=new a.Color("white"),this.start=new a.Vector3(0,0,0),this.end=new a.Vector3(0,0,0)}}const p=e=>e instanceof a.Vector3?e:new a.Vector3(..."number"==typeof e?[e,e,e]:e),g=l.forwardRef((({color:e,start:t,end:r},n)=>{const o=l.useContext(m);if(!o)throw"Segment must used inside Segments component.";const c=l.useRef(null);return l.useLayoutEffect((()=>o.subscribe(c)),[]),l.createElement("segmentObject",{ref:f.default([c,n]),color:e,start:p(t),end:p(r)})}));exports.Segment=g,exports.SegmentObject=b,exports.Segments=d;