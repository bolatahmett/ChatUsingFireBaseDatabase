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
                ? <span style={{ backgroundColor: "red" }}>{props.tabTitle}</span>
                : <span >{props.tabTitle}</span>}
        </>
    )
}
