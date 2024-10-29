"use client"

import { useState, useEffect } from 'react';

import Link from 'next/link';

import MainMenu from '../components/mainmenu';

import { useRouter } from 'next/navigation';

const alphabeticalMonsters = [
    ["Azer"],
]

const levelSortedMonsters = [
    [], //1
    [], //2
    [], //3
    [], //4
    [], //5
    [], //6
    ["Azer"], //7
    [], //8
    [], //9
    [], //10
]


export default function MonsterList() {
    const router = useRouter()

    function navigate(chapter, page) {
        window.localStorage.setItem("CANDD_page",page.toString())
        window.localStorage.setItem("CANDD_chapter",chapter.toString())
        router.push("/")
    }

    return (
        <main id="mainView">
                    <MainMenu navigateFunction={navigate} />
                  {/* <span id="menuButton"><Link href="/"><img src="/layout/sword.png"></img></Link></span> */}
            <h1>Lista de Monstros</h1>
            <h2>Monstros em Ordem Alfabética</h2>
            {
                alphabeticalMonsters.map((el,index) => 

                    (
                        <div key={el}>
                            <h2 key={el+1}>{String.fromCharCode(index+65)}</h2>
                            <ul key={el+2}>
                                {
                                el.map((eel,index) => (
                                    <li key={eel}>
                                        <Link href={{
                                        pathname: "/monster",
                                        query: {
                                        nome: eel
                                        }
                                    }}>{eel}</Link>
                                    </li>
                                )
                                )
                                }
                            </ul>
                        </div>
                    )
                )
            }
            <hr />
            <h2>Monstros por Nível</h2>
            {
                levelSortedMonsters.map((el,index) => 

                    (
                        <div key={index}>
                            <h2 key={index+999}>{index+1}</h2>
                            <ul key={index+9999}>
                                {
                                el.map((eel,index) => (
                                    <li key={index+99999}>
                                        <Link href={{
                                        pathname: "/monster",
                                        query: {
                                        nome: eel
                                        }
                                    }}>{eel}</Link>
                                    </li>
                                )
                                )
                                }
                            </ul>
                        </div>
                    )
                )
            }
        </main>
    )

}