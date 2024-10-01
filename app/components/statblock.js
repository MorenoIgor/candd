"use client"

import { useState } from "react";

import { renderToString } from 'react-dom/server'

import {changeNumber} from "./utils.js"

import MiniRoller from "./miniroller";

const tierTitle = ["Fraca","Comum","Elite","Chefe","Lendária"]

export default function StatBlock({stats}) {

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
        nivel
        tamanho
        arma
        tier
        habilidades
        imagem
    */

        const [vidaAtual, setVidaAtual] = useState(stats.vida)

    

    return (
        <fieldset>
            
            <h3 className="statBlockName">{stats.nome} 
            {
                stats.tier == 1 ? "" : ` (${tierTitle[stats.tier]})`
            }</h3>
            <img className="monsterImage" src="/art/mikoarc/Awakened Tree.png"></img>
        <p>
          <span className="boldFont">Nível:</span> {stats.nivel} <br />
          <span className="boldFont">PA:</span> {stats.pa} <br />
          <span className="boldFont">Defesa:</span> {stats.defesa} <br />
          <span className="boldFont">Vida:</span> {
            vidaAtual == stats.vida ? stats.vida : `${vidaAtual}/${stats.vida}`
          } 
          <button className="plusMinusButton smallButton" onClick={
            () => {
                setVidaAtual(changeNumber(vidaAtual,-1,0,stats.vida))
            }
          }>-</button>
          <button className="plusMinusButton smallButton" onClick={
            () => {
                setVidaAtual(changeNumber(vidaAtual,1,0,stats.vida))
            }
          }>+</button> <br />
            {
            (stats.resistencia == "") ? "" : <span><span className="boldFont">Resistência:</span> {stats.resistencia} <br /></span>
            }
            {
            (stats.imunidade == "") ? "" : <span><span className="boldFont">Imunidade:</span> {stats.imunidade} <br /></span>
            }
            {
            (stats.vulnerabilidade == "") ? "" : <span><span className="boldFont">Vulnerabilidade:</span> {stats.vulnerabilidade} <br /></span>
            }
          <span className="boldFont">Ataque:</span> +{stats.nivel} 
          <MiniRoller amount="1" die="d20" modifier={stats.nivel} /> ({stats.tamanho}{stats.arma}+{stats.nivel}) 
          <MiniRoller amount={stats.tamanho} die={stats.arma} modifier={stats.nivel} /> <br />
          </p>
            {
                stats.habilidades.map((hb,index) => (
                    <p key={index}>
                    <span key = {hb.titulo} className="boldFont">{hb.titulo + ": "}</span>
                    {
                    breakText(hb.texto).map(
                        (t,index) => (
                        <span key={index} className={extractDiceNotation(t) != null ? "boldFont" : ""}>
                            {t + " "}
                            {
                                insertMiniRoller(extractDiceNotation(t))
                            }
                            </span>
                        )
                        
                    )
                    }
                </p>
                ))
            }
    
        </fieldset>
    )

}


function breakText(text) {
    return text.split(" ")
}

function insertMiniRoller(notation) {

    

    let number = ""
    let die = ""
    let modifier = ""

    let substr = ""
    
    let mod = "-"

    if (!notation) return;

    if (notation.includes("+")) {
        mod = "+"
    }

    number = notation.split("d")[0]

    die = "d"+notation.split(mod)[0].split("d")[1]

    if (notation.includes("+") || notation.includes("-")) {
        modifier = mod + notation.split(mod)[1]
    }

    return <MiniRoller amount={number} die={die} modifier={modifier} />

}

//chatGPT to the rescue
function extractDiceNotation(inputString) {
    // Regular expression to match dice notation
    const diceRegex = /\b(\d+)d(\d+)([+-]\d+)?\b/g;

    // Array to hold all found occurrences
    const results = [];
    let match;

    // Use the regex to find all matches in the input string
    while ((match = diceRegex.exec(inputString)) !== null) {
        results.push(match[0]); // Push the entire match
    }

    return results[0];
}