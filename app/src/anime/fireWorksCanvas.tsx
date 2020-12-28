import React, { useEffect } from 'react'
import anime from 'animejs';
import useSound from 'use-sound';
// @ts-ignore
import * as alarm from "../sounds/camkirilma1.mp3";
// @ts-ignore
import * as alarmDone from "../sounds/fanfare.mp3";

export default function FireWorksCanvas() {

    var counterClick = 0;
    var numberOfParticules = 30;
    var pointerX = 0;
    var pointerY = 0;
    var ctx: any = null;
    var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
    var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
    const [play] = useSound(alarm.default);
    const [playDone] = useSound(alarmDone.default);

    useEffect(() => {
        var canvasEl: any = document.querySelector('.fireworks');
        ctx = canvasEl.getContext('2d');

        var render = anime({
            duration: Infinity,
            update: function () {
                ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            }
        });

        // document.addEventListener(tap, function (e) {
        //     render.play();
        //     // play();
        //     updateCoords(e);
        //     animateParticules(pointerX, pointerY);
        // }, false);

        document.getElementById("fireworksButton").addEventListener("click", function (e) {
            counterClick++;
            render.play();
            const randomNumber = Math.floor(Math.random() * 100);
            if (randomNumber > 100 || counterClick > 10) {
                playDone();
                document.getElementById("fireworksButton").hidden = true;
            } else {
                play();
                document.getElementById("fireworksButton").style.paddingLeft = randomNumber + "%";
            }

            updateCoords(e);
            animateParticules(pointerX, pointerY);
        }, false);


        setCanvasSize(canvasEl);
        window.addEventListener('resize', setCanvasSize, false);
    })


    function setCanvasSize(canvasEl: any) {
        canvasEl.width = window.innerWidth * 2;
        canvasEl.height = window.innerHeight * 2;
        canvasEl.style.width = window.innerWidth + 'px';
        canvasEl.style.height = window.innerHeight + 'px';
        canvasEl.getContext('2d').scale(2, 2);
    }

    function updateCoords(e: any) {
        pointerX = e.clientX || e.touches[0].clientX;
        pointerY = e.clientY || e.touches[0].clientY;
    }

    function setParticuleDirection(p: any) {
        var angle = anime.random(0, 360) * Math.PI / 180;
        var value = anime.random(50, 180);
        var radius = [-1, 1][anime.random(0, 1)] * value;
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        }
    }

    function createParticule(x: any, y: any) {
        var p: any = {};
        p.x = x;
        p.y = y;
        p.color = colors[anime.random(0, colors.length - 1)];
        p.radius = anime.random(16, 32);
        p.endPos = setParticuleDirection(p);
        p.draw = function () {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        return p;
    }

    function createCircle(x: any, y: any) {
        var p: any = {};
        p.x = x;
        p.y = y;
        p.color = '#FFF';
        p.radius = 0.1;
        p.alpha = .5;
        p.lineWidth = 6;
        p.draw = function () {
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.lineWidth = p.lineWidth;
            ctx.strokeStyle = p.color;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        return p;
    }

    function renderParticule(anim: any) {
        for (var i = 0; i < anim.animatables.length; i++) {
            anim.animatables[i].target.draw();
        }
    }

    function animateParticules(x: any, y: any) {
        var circle = createCircle(x, y);
        var particules = [];
        for (var i = 0; i < numberOfParticules; i++) {
            particules.push(createParticule(x, y));
        }
        anime.timeline().add({
            targets: particules,
            x: function (p: any) { return p.endPos.x; },
            y: function (p: any) { return p.endPos.y; },
            radius: 0.1,
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            update: renderParticule
        })
            .add({
                targets: circle,
                radius: anime.random(80, 160),
                lineWidth: 0,
                alpha: {
                    value: 0,
                    easing: 'linear',
                    duration: anime.random(600, 800),
                },
                duration: anime.random(1200, 1800),
                easing: 'easeOutExpo',
                update: renderParticule,
                offset: 0
            });
    }

    return (
        <>
            <div style={{ position: "absolute", height: "100%" }}>
                <canvas className="fireworks"></canvas>
            </div>
            <img id={"fireworksButton"} src={"../../../images/balloons.png"} style={{ position: "absolute", paddingTop: "10px", zIndex: 99999 }}></img>
        </>
    )
}
