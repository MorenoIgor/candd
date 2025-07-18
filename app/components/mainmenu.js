"use client"


import Link from "next/link";

import { useState, useEffect } from "react";

let chapter_index =  {
  chapter_count: 0,
  chapter_titles: [],
  pages_array: [],
  pages_list: []
}

export default function MainMenu({navigateFunction}) {

  const [menuItems,setMenuItems] = useState(new Array())
  const [pgList,setPgList] = useState(["a","b"])
  const [menu,setMenu] = useState(true)

  useEffect(() => {
    async function getChapterData() {
      let data = await fetch("/chapter_index.json")
      chapter_index = await data.json()
      setMenuItems(chapter_index.chapter_titles)
      setPgList(chapter_index.pages_list)
      }
      getChapterData()
  },[])


  return (
    <div>
      <span id="menuButton" onClick={
      () => {
      setMenu(!menu)
      }
    }><img src={
      menu == true ? "/layout/closedbook.png" : "/layout/openbook.png"
    } ></img></span>
      <div id="sideBar" className={
        menu == true ? "slide-in-element" : "slide-out-element" 
      }>
        {
          menuItems.map(
            (chap, index) => (
              <p key={chap}>
              <span className="chapterLink"><a onClick = {
                () => {
                //setMenu(false)
                navigateFunction(index,0)
                }
              }>{chap}</a><br /></span>
              
              {
              pgList[index].map (
                (pg,ind) => (
                  <span className="pageLink" key={pg}>
                  <a onClick = {
                () => {
                  //setMenu(false)
                navigateFunction(index,ind+1)
                }
              }>{pg}</a> <br />
                  </span>
                )
              )
              }

              </p>
            )
          )
        }
        <p> 
          <Link href={{
            pathname: "/monsterlist",
          }} className="chapterLink">Lista de Monstros</Link>
        </p>
        <p> 
          <Link href={{
            pathname: "/monsterbuilder",
          }} className="chapterLink">Criador de Monstros</Link>
        </p>
      </div>
    
    </div>
  );
}
