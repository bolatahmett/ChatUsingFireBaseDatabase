import React from "react";
interface ErrorBoundaryState {
    hasError: boolean;
}
export default class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    constructor(props: any);
    static getDerivedStateFromError(error: any): {
        hasError: boolean;
    };
    componentDidCatch(error: any, errorInfo: any): void;
    render(): {};
}
export {};
