"use client"

import MiniRoller from "./components/miniroller";

import { useState, useEffect } from "react";

import {changeNumber} from "./components/utils.js"

let interval1

export default function MonsterBuilder() {

  //clearInterval(interval1)

  //interval1 = setInterval(atualizarVida,100)

  const [nivel,setNivel] = useState(1)
  const [tamanho,setTamanho] = useState(1)
  const [vigor,setVigor] = useState(1)
  const [arma,setArma] = useState("d6")
  const [tier,setTier] = useState(1)
  const [defesa,setDefesa] = useState(10)
  const [porcentagem,setPorcentagem] = useState(55)

  const vidaBaseTable = ["MISSIGNO.",5,10,20]
  const vidaMultTable = [0.5,1,1.5,2,3]
  const pontoAcaoAdicional = [0,0,1,2,3]

  let vida = Math.floor((vidaBaseTable[tamanho] + (vigor * nivel)) * vidaMultTable[tier])
  const [vidaAtual,setVidaAtual] = useState(vida)

  let pa = Math.round(nivel/2) + pontoAcaoAdicional[tier]
  const [paAtual,setPaAtual] = useState(pa)

  function atualizarVida(obj) {
    setVidaAtual(Math.floor((vidaBaseTable[parseInt(obj.tm)] + (parseInt(obj.vg) * parseInt(obj.nv))) * vidaMultTable[parseInt(obj.ti)]))
  }

  function atualizarPa(obj) {
    setPaAtual(Math.round(obj.nv/2) + pontoAcaoAdicional[obj.ti])
  }

  return (
    <main id="mainView">

    <div className="hor-container">
    
    <fieldset className="halfWidth" onChange={
      (event) => {
        setNivel(event.target.value)
        atualizarVida({
          tm: tamanho,
          vg: vigor,
          nv: event.target.value,
          ti: tier
        })
        atualizarPa({
          nv: event.target.value,
          ti: tier
        })
      }
    }>
      <h3 className="monsterCreatorFieldTitle">Nível</h3>

      <input className="numberDoubleDigit" type="number" min="1" max="10" defaultValue={nivel} />
      <button className={'plusMinusButton ' + (nivel == 1 ? 'disabledButton' : '')}  onClick = {
       () => {
          setNivel(changeNumber(nivel,-1,1,10))
          atualizarVida({
            tm: tamanho,
            vg: vigor,
            nv: changeNumber(nivel,-1,1,10),
            ti: tier
          })
          atualizarPa({
            nv: changeNumber(nivel,-1,1,10),
            ti: tier
          })
       }
      }>-</button>
      <button className={'plusMinusButton ' + (nivel == 10 ? 'disabledButton' : '')} onClick = {
       () => {
          setNivel(changeNumber(nivel,1,1,10))
          atualizarVida({
            tm: tamanho,
            vg: vigor,
            nv: changeNumber(nivel,1,1,10),
            ti: tier
          })
          atualizarPa({
            nv: changeNumber(nivel,1,1,10),
            ti: tier
          })
       }
      }>+</button>

    </fieldset>


    <fieldset  className="halfWidth" onChange={
      (event) => {
        setVigor(event.target.value)
        atualizarVida({
          tm: tamanho,
          vg: event.target.value,
          nv: nivel,
          ti: tier
        })
      }
    }>

<h3 className="monsterCreatorFieldTitle">Vigor</h3>

    <input type="radio" value="1" name="res" defaultChecked /> Baixo (1) <br />
    <input type="radio" value="2" name="res"  /> Normal (2) <br />
    <input type="radio" value="3" name="res" /> Alto (3) <br />
    <input type="radio" value="4" name="res" /> Muito alto (4) <br />
    <input type="radio" value="5" name="res" /> Incrivelmente alto (5) <br />

    </fieldset>

    </div>

<div className="hor-container">
    <fieldset onChange={
      (event) => {
        setTier(event.target.value)
        atualizarVida(
          {
            tm: tamanho,
            vg: vigor,
            nv: nivel,
            ti: event.target.value
          }
        )
        atualizarPa({
          nv: nivel,
          ti: event.target.value
        })
      }
    }>

<h3 className="monsterCreatorFieldTitle">Variedade</h3>

    <input type="radio" value="0" name="tier" /> Fraca <br />
    <input type="radio" value="1" name="tier"  defaultChecked /> Comum <br />
    <input type="radio" value="2" name="tier" /> Elite <br />
    <input type="radio" value="3" name="tier" /> Chefe <br />
    <input type="radio" value="4" name="tier" /> Lendária <br />

    </fieldset>

    <fieldset onChange={
      (event) => {
        setDefesa(event.target.value)
        setPorcentagem((21-event.target.value)*5)
      }
    }>
      <h3 className="monsterCreatorFieldTitle">Defesa</h3>

      <input className="numberDoubleDigit"  type="number" min="10" max="20" defaultValue={defesa} />
      <button className={'plusMinusButton ' + (defesa == 10 ? 'disabledButton' : '')} onClick = {
       () => {
          let def = changeNumber(defesa,-1,10,20)
          setDefesa(def)
          setPorcentagem((21-def)*5)
       }
      }>-</button>
      <button className={'plusMinusButton ' + (defesa== 20 ? 'disabledButton' : '')} onClick = {
       () => {
          let def = changeNumber(defesa,1,10,20)
          setDefesa(def)
          setPorcentagem((21-def)*5)
       }
      }>+</button>
      <p>{porcentagem}% de chance de acerto</p>

    </fieldset>
  </div>

  <div className="hor-container">


    <fieldset onChange={
      (event) => {
        setTamanho(event.target.value)
        atualizarVida({
          tm: event.target.value,
          vg: vigor,
          nv: nivel,
          ti: tier
        })
      }
    }>

<h3 className="monsterCreatorFieldTitle">Tamanho</h3>

    <input type="radio" value="1" name="tamanho" defaultChecked /> Humano ou menor <br />
    <input type="radio" value="2" name="tamanho" /> Maior que humano <br />
    <input type="radio" value="3" name="tamanho" /> Muito maior que humano <br />

    </fieldset>

    <fieldset onChange={
      (event) => {
        setArma(event.target.value)
      }
    }>

    <h3 className="monsterCreatorFieldTitle">Arma</h3>

    <input type="radio" value="d6" name="arma" defaultChecked /> Leve (d6) <br />
    <input type="radio" value="d8" name="arma" /> Média (d8) <br />
    <input type="radio" value="d10" name="arma" /> Média (d10) <br />
    <input type="radio" value="d12" name="arma" /> Pesada (d12) <br />

    </fieldset>

  </div>
    
    <fieldset>
    <p>
      <span className="boldFont">Nível:</span> {nivel} <br />
      <span className="boldFont">PA:</span> {
            paAtual == pa ? pa : `${paAtual}/${pa}`
          }
          <button className={'plusMinusButton smallButton ' + (paAtual == 0 ? 'disabledButton' : '')} onClick={
            () => {
                setPaAtual(changeNumber(paAtual,-1,0,pa))
            }
          }>-</button>
          <button className={'plusMinusButton smallButton ' + (paAtual == pa ? 'disabledButton' : '')} onClick={
            () => {
                setPaAtual(changeNumber(paAtual,1,0,pa))
            }
          }>+</button> <br />
      <span className="boldFont">Defesa:</span> {defesa} <br />
      <span className="boldFont">Vida:</span> {
            vidaAtual == vida ? vida : `${vidaAtual}/${vida}`
          } 
          <button className={'plusMinusButton smallButton ' + (vidaAtual == 0 ? 'disabledButton' : '')} onClick={
            () => {
                setVidaAtual(changeNumber(vidaAtual,-1,0,vida))
            }
          }>-</button>
          <button className={'plusMinusButton smallButton ' + (vidaAtual == vida ? 'disabledButton' : '')} onClick={
            () => {
                setVidaAtual(changeNumber(vidaAtual,1,0,vida))
            }
          }>+</button> <br />
      <span className="boldFont">Resistência, Imunidade e Vulnerabilidade:</span> a critério da Mestra. <br />
      <span className="boldFont">Ataque:</span> +{nivel} <MiniRoller amount="1" die="d20" modifier={nivel} /> ({tamanho}{arma}+{nivel}) <MiniRoller amount={tamanho} die={arma} modifier={nivel} /> <br />
      <span className="boldFont">Habilidades Especiais:</span> qualquer habilidade desta criatura causa <span className="boldFont">{nivel}d10</span> <MiniRoller amount={nivel} die="d10" modifier="0" /> de dano, ou <span className="boldFont">{(Math.floor(nivel/2) > 0 ? Math.floor(nivel/2)+"d10 " : "1d10 dividido pela metade ")}</span>
      {
        (Math.floor(nivel/2) > 0 ? <MiniRoller amount={Math.floor(nivel/2)} die="d10" modifier="0" /> : <MiniRoller amount="1" die="d10" modifier="0" half />)
      }
      se acarretar um efeito adicional.
      Contudo, se causar dano automático, este dano é apenas <span className="boldFont">1d10</span> <MiniRoller amount="1" die="d10" modifier="0" />.
      Se for uma Magia, ela é de <span className="boldFont">nível {nivel}</span>.
      A Dificuldade para evitar os efeitos é <span className="boldFont">{10+parseInt(nivel)}</span>.
    </p>
    </fieldset>

    
    </main>
  );
}
