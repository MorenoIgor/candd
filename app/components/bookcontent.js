"use client"

import Markdown from "react-markdown";
import { remark } from "remark";
import remarkGfm from 'remark-gfm'

import { useState, useEffect } from "react";

export default function BookContent({chapter,page}) {

    const [textoPagina,setTextoPagina] = useState("")

    useEffect(() => {
      async function fetchData() {
        let file = '/text-markdown/'
        if (page!=undefined) {
          file += `${chapter}-${page}.md`
        } 
        else {
          file += `${chapter}.md`
        }
        await fetch(file).then (
          (res) => (res.text())
        ).then(
          (text) => {
            setTextoPagina(text)
          }
        )
    
      }
      fetchData();  
      }, [chapter, page]);

    // async function fetchData() {
    //   if(typeof window == 'undefined') { return }
    //   let file = '/text-markdown/'
    //   if (page!=undefined) {
    //     file += `${chapter}-${page}.md`
    //   } 
    //   else {
    //     file += `${chapter}.md`
    //   }
    //   await fetch(file).then (
    //     (res) => (res.text())
    //   ).then(
    //     (text) => {
    //       setTextoPagina(text)
    //     }
    //   )
  
    // }
    // fetchData();  

    return (
        <div className="bodyContent">
        <Markdown remarkPlugins={[remarkGfm]}>{textoPagina}</Markdown>
        </div>
    )

}