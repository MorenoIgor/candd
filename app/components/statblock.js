"use client"

import { useState } from "react";

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
        const [paAtual,setPaAtual] = useState(stats.pa)

    

    return (
        <main id="mainView">
            <h2 className="statBlockName">{stats.nome} 
            {
                stats.tier == 1 ? "" : ` (${tierTitle[stats.tier]})`
            }</h2>
            <img className="monsterImage" src={`/art/mikoarc/${stats.imagem}.png`}></img>
            <div className="statBlockContainer">
                <div className="statBlockLeft">
                    <span className="boldFont">Nível:</span> {stats.nivel} <br />
                    <span className="boldFont">PA:</span> {
                        paAtual == stats.pa ? stats.pa : `${paAtual}/${stats.pa}`
                    }
                    <button className={'plusMinusButton ' + (paAtual == 0 ? 'disabledButton' : '')}  onClick={
                        () => {
                            setPaAtual(changeNumber(paAtual,-1,0,stats.pa))
                        }
                    }>-</button>
                    <button className={'plusMinusButton ' + (paAtual == stats.pa ? 'disabledButton' : '')}  onClick={
                        () => {
                            setPaAtual(changeNumber(paAtual,1,0,stats.pa))
                        }
                    }>+</button>
                    <button className={'plusMinusButton ' + (paAtual == stats.pa ? 'disabledButton' : '')}  onClick={
                        () => {
                            setPaAtual(changeNumber(paAtual,10,0,stats.pa))
                        }
                    }>N</button>
                </div>
                <div className="statBlockRight">
                    <span className="boldFont">Defesa:</span> {stats.defesa} <br />
                    <span className="boldFont">Vida:</span> {
                        vidaAtual == stats.vida ? stats.vida : `${vidaAtual}/${stats.vida}`
                    } 
                    <button className={'plusMinusButton ' + (vidaAtual == 0 ? 'disabledButton' : '')}  onClick={
                        () => {
                            setVidaAtual(changeNumber(vidaAtual,-1,0,stats.vida))
                        }
                    }>-</button>
                    <button className={'plusMinusButton ' + (vidaAtual == stats.vida ? 'disabledButton' : '')}  onClick={
                        () => {
                            setVidaAtual(changeNumber(vidaAtual,1,0,stats.vida))
                        }
                    }>+</button>
                    <button className={'plusMinusButton ' + (vidaAtual == 0 ? 'disabledButton' : '')}  onClick={
                        () => {
                            setVidaAtual(changeNumber(vidaAtual,-5,0,stats.vida))
                        }
                    }>-5</button>
                    <button className={'plusMinusButton ' + (vidaAtual == stats.vida ? 'disabledButton' : '')}  onClick={
                        () => {
                            setVidaAtual(changeNumber(vidaAtual,5,0,stats.vida))
                        }
                    }>+5</button>
                </div>
                <br />
                <div className="statBlockBottom">
                        {
                        (stats.resistencia == "") ? "" : <span><span className="boldFont">Resistência:</span> {stats.resistencia} <br /></span>
                        }
                        {
                        (stats.imunidade == "") ? "" : <span><span className="boldFont">Imunidade:</span> {stats.imunidade} <br /></span>
                        }
                        {
                        (stats.vulnerabilidade == "") ? "" : <span><span className="boldFont">Vulnerabilidade:</span> {stats.vulnerabilidade} <br /></span>
                        }
                    <span className="boldFont">Ataque: </span> {stats.arma} +{stats.nivel} 
                    <MiniRoller amount="1" die="d20" modifier={stats.nivel} /> ({stats.tamanho}{stats.dano}+{stats.nivel}) 
                    <MiniRoller amount={stats.tamanho} die={stats.dano} modifier={stats.nivel} /> <br />
                </div>
            </div>

          
          {/* <h2 className="boldFont habilidades">Poderes</h2> */}
            {
                stats.habilidades.map((hb,index) => (
                    <span className="monsterP" key={index}>
                    <h3 className="specialAbility">{hb.titulo}</h3>
                    <span className="monsterP">
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
                    </span>
                </span>
                ))
            }
        <span className="monsterP">
            {stats.texto}
        </span>
        </main>
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