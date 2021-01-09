import { Button, Col, Collapse, Row } from 'antd';
import React, { useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';
// @ts-ignore
const ReactAudioPlayerDefault = ReactAudioPlayer.default;
const { Panel } = Collapse;

const sounds: string[] = ['1vcb17Bi-7WPBIEqIWJc6bV5iiVdF-zip',
    '1yhZCFRQ-FTGgOkWRHXpfb6Op1FGHQgsB',
    '1CcPpwOnN4DDetvkZnwtGUzPt87WqE2CY',
    '1Vu_GJp8o7aDedXA_1kCk94y5Qi9W5KX6',
    '1Qm5CdeGqcAatTcrHRE-N1ZJ2C2Qf0pFr',
];

export default function AudioPlayer() {
    const [soundUrl, setSoundUrl] = useState("");
    const [soundIndex, setSoundIndex] = useState(0);

    return (
        <div style={{ textAlign: "center" }}>

            <Collapse>
                <Panel header={"Rahatlatıcı Ses"} key="1">
                    <Row>
                        <Col span={2}>
                            <p>{`${soundIndex}: `}</p>
                        </Col>
                        <Col span={22}>
                            <ReactAudioPlayerDefault
                                src={soundUrl}
                                autoPlay
                                controls
                                style={{ width: "-webkit-fill-available", height: "25px" }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            {
                                sounds.map((item: string, index: number) => {
                                    return <>
                                        <Button shape={"circle"} size={"small"}
                                            onClick={() => {
                                                setSoundUrl(`https://docs.google.com/uc?export=open&id=${item}`);
                                                setSoundIndex(index + 1);
                                            }}>{index + 1}</Button>
                                    </>; 0
                                })
                            }
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </div>
    )
}
