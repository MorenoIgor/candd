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

function getNextChapter(pagina,capitulo) {
  // if (chapter_index.chapter_count==0) {
  //   return ""
  // }
  if (pagina>0) {
    pagina -= 1
  }
  return capitulo < chapter_index.chapter_count-1 ? chapter_index.chapter_titles[capitulo+1] : " "
}

function getNextPage(pagina,capitulo) {
  // if (chapter_index.chapter_count==0) {
  //   return ""
  // }
  console.log("NEXTPG: ",pagina)
  return pagina < chapter_index.pages_list[capitulo].length ? chapter_index.pages_list[capitulo][pagina] : " "
}

function getPreviousPage(pagina,capitulo) {
  // if (chapter_index.chapter_count==0) {
  //   return ""
  // }
  if (pagina>0) {
    pagina -= 1
  }
  return pagina > 0 ? chapter_index.pages_list[capitulo][pagina-1] : " "
}

function getPreviousChapter(pagina,capitulo) {
// if (chapter_index.chapter_count==0) {
//     return ""
//   }
if (pagina>0) {
    pagina -= 1
  }
  return capitulo > 0 ? chapter_index.chapter_titles[capitulo-1] : " "
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

  const [prevChap,setPrevChap] = useState(" ")
  const [prevPage,setPrevPage] = useState(" ")
  const [nextChap,setNextChap] = useState(" ")
  const [nextPage,setNextPage] = useState(" ")

  useEffect(() => {
    async function getChapterData() {
      let data = await fetch("/chapter_index.json")
      chapter_index = await data.json()
    
        setPrevChap(getPreviousChapter(pagina,capitulo))
        setPrevPage(getPreviousPage(pagina,capitulo))
        setNextChap(getNextChapter(pagina,capitulo))
        setNextPage(getNextPage(pagina,capitulo))

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
        setPrevChap(getPreviousChapter(temp,capitulo))
        setPrevPage(getPreviousPage(temp,capitulo))
        setNextChap(getNextChapter(temp,capitulo))
        setNextPage(getNextPage(temp,capitulo))
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
        setPrevChap(getPreviousChapter(newPage,newChapter))
        setPrevPage(getPreviousPage(newPage,newChapter))
        setNextChap(getNextChapter(newPage,newChapter))
        setNextPage(getNextPage(newPage,newChapter))
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
  
}>Cap.<br /> Anterior
<br /> <br />
{prevChap}</a></div>
<div className="navClick"><a onClick =
{ () => {
  changePage(-1)
  }
  
}>Pág.<br /> Anterior
<br /> <br />
{prevPage}</a></div>
<div className="navClick"><a onClick =
{ () => {
  changePage(1)
}
  
}>Próx.<br /> Página</a>
<br /> <br />
{nextPage}
</div>
<div className="navClick"><a onClick =
{ () => {
  changeChapter(capitulo+1,0)
  }
  
}>
  Próx.<br />
  Capítulo</a>
  <br /> <br />
{nextChap}
</div>

</div>

    </main>

  );
}
