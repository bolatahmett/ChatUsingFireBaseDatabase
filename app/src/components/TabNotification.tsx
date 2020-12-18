import { Alert } from 'antd'
import React from 'react'

interface TabNotificationProps {
    tabTitle: string;
    hasNewMessage: boolean;
}

export default function TabNotification(props: TabNotificationProps) {
    return (
        <>
            {props.hasNewMessage
                ? <span style={{ color: "white", backgroundColor: "red" }}>{props.tabTitle}</span>
                : <span style={{ color: "white" }}>{props.tabTitle}</span>}
        </>
    )
}
