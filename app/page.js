"use client"

import Image from "next/image";

import MiniRoller from "./components/miniroller";

import BookContent from "./components/bookcontent";

import {changeNumber} from "./components/utils.js"

import { useState, useEffect } from "react";

let chapter_index =  {
  chapter_count: 0,
  chapter_titles: [],
  pages_array: [],
}

export default function Book() {

  const [pagina,setPagina] = useState(0)
  const [capitulo,setCapitulo] = useState(0)
  const [titulo,setTitulo] = useState("")

  async function getChapterData() {
    let data = await fetch("chapter_index.json")
    chapter_index = await data.json()
    }
    getChapterData()

  function changePage(newPage) {
    window.scrollTo(0,0)
    let temp = pagina + newPage
    if (temp<0) {
      changeChapter(capitulo-1,chapter_index.pages_array[capitulo-1])
    } else if (temp<=chapter_index.pages_array[capitulo]) {
      setPagina(temp)
    } else {
      changeChapter(capitulo+1,0)
    }
  }

  function changeChapter(newChapter,newPage) {
    window.scrollTo(0,0)
    if (newChapter>=0 && newChapter<chapter_index.chapter_count) {
      setPagina(newPage)
      setCapitulo(newChapter)
    }
  }

  return (
    <div>
    <main id="mainView">

    <BookContent chapter={capitulo} page={pagina} />

    </main>
    <div className="navControls">

<div className="navClick"><a onClick =
{ () => {
  changeChapter(capitulo-1,0)
  }
  
}>Cap. Anterior</a></div>
<div className="navClick"><a onClick =
{ () => {
  changePage(-1)
  }
  
}>Pág. Anterior</a></div>
<div className="navClick"><a onClick =
{ () => {
  changePage(1)
}
  
}>Próx. Página</a></div>
<div className="navClick"><a onClick =
{ () => {
  changeChapter(capitulo+1,0)
  }
  
}>Próx. Capítulo</a></div>

</div>
    </div>
  );
}
