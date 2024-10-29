"use client"

import Image from "next/image";

import Link from "next/link";

import MiniRoller from "./components/miniroller";

import BookContent from "./components/bookcontent";

import MainMenu from "./components/mainmenu";

import {changeNumber} from "./components/utils.js"

import { useState, useEffect } from "react";

let chapter_index =  {
  chapter_count: 0,
  chapter_titles: [],
  pages_array: [],
  pages_list: []
}


export default function Book() {

  let _chapter
  let _page

  if(typeof window != 'undefined'){
  if (window.localStorage.getItem("CANDD_chapter")!=null) {
    _chapter = parseInt(window.localStorage.getItem("CANDD_chapter"))
    _page = parseInt(window.localStorage.getItem("CANDD_page"))
    } else {
      _chapter = 0
      _page = 0
    }
  } else {
    _chapter = 0
    _page = 0
  }

  const [pagina,setPagina] = useState(_page)
  const [capitulo,setCapitulo] = useState(_chapter)
  const [titulo,setTitulo] = useState("")
  const [pgList,setPgList] = useState(["a","b"])

  useEffect(() => {
    async function getChapterData() {
      let data = await fetch("/chapter_index.json")
      chapter_index = await data.json()
      }
      getChapterData()
  },[])

  function changePage(newPage) {
    if(typeof window == 'undefined') { return }
    window.scrollTo(0,0)
    let temp = pagina + newPage
    if (temp<0) {
      changeChapter(capitulo-1,chapter_index.pages_array[capitulo-1])
    } else if (temp<=chapter_index.pages_array[capitulo]) {
      setPagina(temp)
      if(typeof window == 'undefined') { return }
     window.localStorage.setItem("CANDD_page",temp.toString())
     window.localStorage.setItem("CANDD_chapter",capitulo.toString())
    } else {
      changeChapter(capitulo+1,0)
    }
  }

  function changeChapter(newChapter,newPage) {
    if(typeof window == 'undefined') { return }
    window.scrollTo(0,0)
    window.localStorage.setItem("CANDD_chapter",newChapter.toString())
    window.localStorage.setItem("CANDD_page",newPage.toString())
    if (newChapter>=0 && newChapter<chapter_index.chapter_count) {
      setPagina(newPage)
      setCapitulo(newChapter)
    }
  }

  return (

    <main id="mainView">

    <MainMenu navigateFunction={changeChapter} />

    <BookContent chapter={capitulo} page={pagina} />

    <div className="navControls">


<div className="navClick"><a onClick =
{ () => {
  changeChapter(capitulo-1,0)
  }
  
}>Cap.<br /> Anterior</a></div>
<div className="navClick"><a onClick =
{ () => {
  changePage(-1)
  }
  
}>Pág.<br /> Anterior</a></div>
<div className="navClick"><a onClick =
{ () => {
  changePage(1)
}
  
}>Próx.<br /> Página</a></div>
<div className="navClick"><a onClick =
{ () => {
  changeChapter(capitulo+1,0)
  }
  
}>Próx.<br /> Capítulo</a></div>

</div>

    </main>

  );
}
