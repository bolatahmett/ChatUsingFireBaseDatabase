import { Col, Row, Tabs } from 'antd';
import React from 'react'
import MessageContent from './MessageContent';

export default function ChatTabs(props: { activeTabKey: string; changeTab: (activeKey: string) => void; tabChatContent: { content: any; }[]; }) {
    const { TabPane } = Tabs;
    return (
        <Tabs activeKey={props.activeTabKey} onChange={props.changeTab} type="line" size={"small"}>
            {
                props.tabChatContent.length > 0 && props.tabChatContent.map((item: any) => {
                    return <TabPane tab={<span style={{ color: "white" }}>{item.key}</span>} key={item.key}>
                        <Row style={{ height: "100%" }}>
                            <Col span={24} style={{ height: "100%" }}>
                                <div className="card-body msg_card_body" style={{ height: "100%" }}>
                                    <div id={item.key} className="col-md-24" style={{ height: "100%" }}>
                                        <MessageContent chatKey={item.key}></MessageContent>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                })
            }
        </Tabs>
    )
}
