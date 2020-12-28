import { Button } from "antd";
import React from "react";
import useSound from "use-sound";
// @ts-ignore
import * as soundUrl from "../sounds/909-drums.mp3";

export default function Demo() {
    const [play] = useSound(soundUrl.default, {
        sprite: {
            kick: [0, 350],
            hihat: [374, 160],
            snare: [666, 290],
            cowbell: [968, 200],
        }
    });



    return (
        <>
            <Button
                aria-label="kick"
                onClick={() => { console.log(soundUrl); play({ id: 'kick' }); }}
            >
                1
            </Button>
            <Button
                aria-label="hihat"
                onClick={() => play({ id: 'hihat' })}
            >
                2
      </Button>
            <Button
                aria-label="snare"
                onClick={() => play({ id: 'snare' })}
            >
                3
      </Button>
            <Button
                aria-label="cowbell"
                onClick={() => play({ id: 'cowbell' })}
            >
                4
      </Button>
        </>
    );
}