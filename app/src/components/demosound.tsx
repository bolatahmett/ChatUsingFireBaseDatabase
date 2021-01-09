import { Button } from "antd";
import { Howl } from "howler";
import React from "react";
// @ts-ignore
import * as soundUrl from "../sounds/909-drums.mp3";

export default function Demo() {

    var sound = new Howl({
        src: [soundUrl.default],
        sprite: {
            kick: [0, 350],
            hihat: [374, 160],
            snare: [666, 290],
            cowbell: [968, 200],
        }
    });

    sound.play();



    return (
        <>
            <Button
                aria-label="kick"
                onClick={() => { console.log(soundUrl); sound.play('kick'); }}
            >
                1
            </Button>
            <Button
                aria-label="hihat"
                onClick={() => sound.play('hihat')}
            >
                2
      </Button>
            <Button
                aria-label="snare"
                onClick={() => sound.play('snare')}
            >
                3
      </Button>
            <Button
                aria-label="cowbell"
                onClick={() => sound.play('cowbell')}
            >
                4
      </Button>
        </>
    );
}