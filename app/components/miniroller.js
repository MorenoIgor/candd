"use client"

import { useState } from "react";

export default function MiniRoller({amount,die,modifier,half}) {

    const [resultado,setResultado] = useState("")

    function rolarDado() {

        let res = 0
        let dado = parseInt(die.substr(1,2))
        
        for (let i=0;i<parseInt(amount);i++) {
            res += Math.floor(Math.random()*dado) + 1
        }

        let critfumble = ""

        if (die=="d20" && amount=="1") {
            if (res == 1) {
                critfumble = "Falha catastrófica! "
            }
            if (res == 20) {
                critfumble = "Sucesso crítico! "
            }
        }

        if (modifier!="") {
        res += parseInt(modifier)
        }

        if (half) {
            res /= 2
            res = Math.floor(res)
            if (res==0) {
                res += 1;
            }
        }

        setResultado(critfumble + res.toString())
    }

    return (
        <span>
        <a className="miniRollerDie" onClick={rolarDado}> 🎲</a> {
            resultado == "" ? "" : "["+resultado+"] "
        }
        </span>
    )

}