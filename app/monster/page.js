"use client"

import { useSearchParams } from 'next/navigation';

import { useState, useEffect} from 'react';

import Link from 'next/link';

import StatBlock from "../components/statblock"

let monster = {}

    /*
        STATS
        nome
        nivel
        pa
        defesa
        vida
        resistencia
        imunidade
        vulnerabilidade
        tamanho
        arma
        tier
        habilidades
        imagem
    */

export default function Monster() {

    const [monster, setMonster] = useState({})

    const params = useSearchParams()

    useEffect(() => {
        async function pegarDados() {
            let data = await fetch(`/monster_data/${params.get("nome")}.json`)
            data = await data.json()
            setMonster(data)
        }
        pegarDados()
      },[])


    return (
        <main id="mainView">
            <span id="menuButton"><Link href="/monsterlist"><img src="/layout/sword.png"></img></Link></span>
        {
            monster.nome == undefined ? (<span></span>) : (<StatBlock stats={monster} />)
        }
    
        </main>
    )

}