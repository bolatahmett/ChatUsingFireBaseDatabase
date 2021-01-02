import { Col, Row, Switch, Tooltip } from 'antd'
import React from 'react'
import { connect } from 'react-redux';
import { addNotification, removeNotification } from '../redux/actions/action';
import { MessageTwoTone } from '@ant-design/icons';

interface TabNotificationProps {
    tabTitle: string;
    hasNewMessage: boolean;
    userName: string;
    addNotification: any;
    removeNotification: any;
}

function TabNotification(props: TabNotificationProps) {
    const onChange = (checked: boolean) => {
        checked ? props.addNotification(props.userName) : props.removeNotification(props.userName);
    }

    return (
        <>
            <Row>
                <Col span={18}>
                    {props.hasNewMessage
                        ? <><MessageTwoTone /><span>{props.tabTitle}</span></>
                        : <span >{props.tabTitle}</span>}
                </Col>
                <Col span={2} offset={1}>
                    <Tooltip placement="top" title={"Bildirim"}>
                        <Switch size={"small"} onChange={onChange} />
                    </Tooltip>
                </Col>
            </Row>
        </>
    )
}

export default connect(null, {
    removeNotification,
    addNotification
})(TabNotification);
