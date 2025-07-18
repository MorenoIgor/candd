"use client"

import { useState, useEffect } from 'react';

import Link from 'next/link';

import MainMenu from '../components/mainmenu';

import { useRouter } from 'next/navigation';

const alphabeticalMonsters = [
    ["Anão_das_Cavernas", "Anão_do_Vulcão", "Aranha-em-Pé", "Aranha-Fantasma", "Arânio", "Arbusto-Ambulante", "Armadura_Animada", "Árvore-Viva", "Assombração"], // A
    ["Basilisco", "Bicho-Abutre", "Bicho-Assustador", "Bicho-Barbudo", "Bicho-Devorador", "Bicho-Espinhoso", "Bicho-Fedorento", "Bicho-Lama", "Bicho-Papão", "Bruxa", "Bruxa_das_Brumas", "Bruxa_do_Mar"], // B
    ["Cão_de_Fogo", "Centauro", "Cobra-Anjo", "Cobra-Constritora", "Cocatriz", "Cogumelo-Lutador", "Coisa-Hedionda", "Cubo_Gelatinoso"], // C
    ["Devorador-Demente", "Diabrete", "Dinossauro", "Dragão_Adulto", "Dragão_Filhote", "Dragão_Jovem", "Dríade"], // D
    ["Égua-da-Noite", "Elemental_da_Água", "Elemental_da_Terra", "Elemental_do_Ar", "Elemental_do_Fogo", "Elfo_das_Cavernas", "Enxame_de_Morcegos", "Espada_Voadora", "Espectro", "Espírito-Fátua", "Esqueleto", "Esqueleto_Gigante", "Estrijurso"], // E
    ["Fada", "Fantasma", "Formiga-Voraz"], // F
    ["Gárgula", "Gênio", "Gigante_das_Colinas", "Gigante_de_Pedra", "Gigante-de-duas-Cabeças", "Gnomo_das_Cavernas", "Goblin", "Goblin-Feroz", "Goblin-Peludo", "Golem_de_Cadáveres", "Gosma-Catarrenta", "Gosma-Suja", "Guardião_Animado"], // G
    ["Harpia", "Hipogrifo", "Homem_das_Cavernas", "Homúnculo", "Horror_Invisível", "Horror_Tentacular"], // H
    ["Imitador"], // I
    [], // J
    ["Kobold", "Kotengu"], // K
    ["Lacraia_Gigante", "Lagosta-Venenosa", "Lamia", "Lobisomem"], // L
    ["Mantanegra", "Mantícora", "Medusa", "Mephit-da-Areia", "Mephit-da-Lava", "Mephit-do-Gelo", "Mephit-do-Vapor", "Mímico", "Minotauro", "Monstro_da_Ferrugem", "Monstro_do_Pântano", "Morto-Vivo", "Mosquito-Vampiro", "Múmia"], // M
    [], // N
    ["Ogro", "Oni", "Orc"], // O
    ["Papa-Pedra", "Peixe-Pescador", "Porcomem", "Povo-Dragão", "Povo-Enguia", "Povo-Felino", "Povo-Hiena", "Povo-Lagarto", "Povo-Pássaro", "Povo-Sapo", "Povo-Sereia", "Pseudodragão"], // P
    ["Quimera"], // Q
    ["Ratomem"], // R
    ["Salamandrino", "Sátiro", "Súcubo"], // S
    ["Tapete-Vivo", "Tigromem", "Touro-Blindado", "Troll", "Tubarão-da-Terra"], // T
    ["Unicórnio", "Ursomem"], // U
    ["Vampiro", "Verme-Bicudo", "Vulto"], // V
    [], // W
    [], // X
    [], // Y
    ["Zumbi"] // Z
];

const levelSortedMonsters = [
    ["Anão_das_Cavernas", "Arbusto-Ambulante", "Armadura_Animada", "Bicho-Assustador", "Bicho-Fedorento", "Bicho-Lama", "Bicho-Papão", "Cobra-Constritora", "Cocatriz", "Cogumelo-Lutador", "Coisa-Hedionda", "Diabrete", "Dríade", "Elfo_das_Cavernas", "Enxame_de_Morcegos", "Espada_Voadora", "Espectro", "Espírito-Fátua", "Esqueleto", "Fada", "Goblin", "Homem_das_Cavernas", "Homúnculo", "Kobold", "Mantanegra", "Mephit-da-Areia", "Mephit-da-Lava", "Mephit-do-Gelo", "Mephit-do-Vapor", "Monstro_da_Ferrugem", "Mosquito-Vampiro", "Povo-Lagarto", "Povo-Sapo", "Povo-Sereia", "Pseudodragão", "Sátiro", "Verme-Bicudo", "Vulto", "Zumbi"], //1
    ["Anão_do_Vulcão", "Aranha-em-Pé", "Bicho-Devorador", "Bruxa_do_Mar", "Centauro", "Cubo_Gelatinoso", "Formiga-Voraz", "Gárgula", "Gosma-Catarrenta", "Harpia", "Hipogrifo", "Mímico", "Ogro", "Peixe-Pescador", "Povo-Enguia", "Ratomem"], //2
    ["Aranha-Fantasma", "Basilisco", "Bicho-Barbudo", "Bruxa", "Cão_de_Fogo", "Dragão_Filhote", "Égua-da-Noite", "Esqueleto_Gigante", "Estrijurso", "Fantasma", "Goblin-Feroz", "Kotengu", "Lobisomem", "Mantícora", "Minotauro", "Morto-Vivo", "Múmia", "Orc", "Súcubo"], //3
    ["Assombração", "Cobra-Anjo", "Gigante-de-duas-Cabeças", "Goblin-Peludo", "Lacraia_Gigante", "Lagosta-Venenosa", "Lamia", "Medusa", "Monstro_do_Pântano", "Porcomem", "Povo-Dragão", "Povo-Hiena", "Povo-Pássaro", "Salamandrino", "Tapete-Vivo", "Tigromem", "Touro-Blindado"], //4
    ["Bicho-Espinhoso", "Devorador-Demente", "Elemental_da_Água", "Elemental_da_Terra", "Elemental_do_Ar", "Elemental_do_Fogo", "Gigante_das_Colinas", "Golem_de_Cadáveres", "Gosma-Suja", "Guardião_Animado", "Horror_Invisível", "Horror_Tentacular", "Papa-Pedra", "Troll", "Tubarão-da-Terra", "Unicórnio", "Ursomem"], //5
    ["Arânio", "Bicho-Abutre", "Dragão_Jovem", "Gênio", "Povo-Felino", "Quimera"], //6
    ["Oni"], //7
    ["Dinossauro"], //8
    ["Gigante_de_Pedra", "Vampiro"], //9
    ["Dragão_Adulto"] //10
];


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
                        <div key={el+Math.random()*1024}>
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
                                    }}>{eel.replaceAll("_"," ")}</Link>
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
                                    }}>{eel.replaceAll("_"," ")}</Link>
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