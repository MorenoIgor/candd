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
        const [vidaMax, setVidaMax] = useState(stats.vida)
        const [paAtual,setPaAtual] = useState(stats.pa)
        const [paMax,setPaMax] = useState(stats.pa)
        const [tierAtual,setTierAtual] = useState(1)

    function calculateTier(tier) {

        switch (tier) {

            case 0:
                setVidaMax(stats.vida/2);
                setVidaAtual(stats.vida/2);

                setPaMax(stats.pa);
                setPaAtual(stats.pa);
            break;
            case 1:
                setVidaMax(stats.vida);
                setVidaAtual(stats.vida);

                setPaMax(stats.pa);
                setPaAtual(stats.pa);
            break;
            case 2:
                setVidaMax(stats.vida + Math.floor(stats.vida/2));
                setVidaAtual(stats.vida + Math.floor(stats.vida/2));

                setPaMax(stats.pa + 1);
                setPaAtual(stats.pa + 1);
            break;
            case 3:
                setVidaMax(stats.vida*2);
                setVidaAtual(stats.vida*2);

                setPaMax(stats.pa + 2);
                setPaAtual(stats.pa + 2);
            break;
            case 4:
                setVidaMax(stats.vida*3);
                setVidaAtual(stats.vida*3);

                setPaMax(stats.pa + 3);
                setPaAtual(stats.pa + 3);
            break;
        }

    }


    return (
        <main id="mainView">
            <h2 className="statBlockName">{stats.nome}</h2>
                <h3 className="tierTitle" style={{marginTop: "-10px"}}>({tierTitle[tierAtual]})</h3>
                <h3 style={{textAlign: "center"}}><button className={'plusMinusButton ' + (tierAtual == 0 ? 'disabledButton' : '')}  onClick={
                        () => {
                            let number = changeNumber(tierAtual,-1,0,4)
                            setTierAtual(number)
                            calculateTier(number)
                        }
                    }>-</button>
                    <button className={'plusMinusButton ' + (tierAtual == 4 ? 'disabledButton' : '')}  onClick={
                        () => {
                            let number = changeNumber(tierAtual,1,0,4)
                            setTierAtual(number)
                            calculateTier(number)
                        }
                    }>+</button></h3>
            <div style={{height: "600px"}}>     
            <img className="monsterImage" src={`/art/mikoarc/${stats.imagem}.png`}></img>
            </div>
            <div className="statBlockContainer">
                <div className="statBlockLeft">
                    <span className="boldFont">Nível:</span> {stats.nivel} <br />
                    <span className="boldFont">PA:</span> {
                        paAtual == paMax ? paMax : `${paAtual}/${paMax}`
                    }
                    <button className={'plusMinusButton ' + (paAtual == 0 ? 'disabledButton' : '')}  onClick={
                        () => {
                            setPaAtual(changeNumber(paAtual,-1,0,paMax))
                        }
                    }>-</button>
                    <button className={'plusMinusButton ' + (paAtual == paMax ? 'disabledButton' : '')}  onClick={
                        () => {
                            setPaAtual(changeNumber(paAtual,1,0,paMax))
                        }
                    }>+</button>
                    <button className={'plusMinusButton ' + (paAtual == paMax ? 'disabledButton' : '')}  onClick={
                        () => {
                            setPaAtual(changeNumber(paAtual,10,0,paMax))
                        }
                    }>N</button>
                </div>
                <div className="statBlockRight">
                    <span className="boldFont">Defesa:</span> {stats.defesa} <br />
                    <span className="boldFont">Vida:</span> {
                        vidaAtual == vidaMax ? vidaMax : `${vidaAtual}/${vidaMax}`
                    } 
                    <button className={'plusMinusButton ' + (vidaAtual == 0 ? 'disabledButton' : '')}  onClick={
                        () => {
                            setVidaAtual(changeNumber(vidaAtual,-1,0,vidaMax))
                        }
                    }>-</button>
                    <button className={'plusMinusButton ' + (vidaAtual == vidaMax ? 'disabledButton' : '')}  onClick={
                        () => {
                            setVidaAtual(changeNumber(vidaAtual,1,0,vidaMax))
                        }
                    }>+</button>
                    <button className={'plusMinusButton ' + (vidaAtual == 0 ? 'disabledButton' : '')}  onClick={
                        () => {
                            setVidaAtual(changeNumber(vidaAtual,-5,0,vidaMax))
                        }
                    }>-5</button>
                    <button className={'plusMinusButton ' + (vidaAtual == vidaMax ? 'disabledButton' : '')}  onClick={
                        () => {
                            setVidaAtual(changeNumber(vidaAtual,5,0,vidaMax))
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
                    <h2 className="specialAbility" style={{marginLeft: "0px"}}>{hb.titulo}</h2>
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
        <hr />
        <h2 className="specialAbility" style={{marginLeft: "0px", marginTop: "32px"}}>DESCRIÇÃO</h2>
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