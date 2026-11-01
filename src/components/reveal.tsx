"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
export function Reveal({children,className="",delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setVisible(true);return;}
    const node=ref.current;if(!node)return;
    const observer=new IntersectionObserver((entries)=>{if(entries.some(e=>e.isIntersecting)){setVisible(true);observer.disconnect();}},{threshold:.07,rootMargin:"0px 0px -30px 0px"});
    observer.observe(node);return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${visible?"revealed":""} ${className}`} style={{transitionDelay:`${delay}ms`}}>{children}</div>;
}
