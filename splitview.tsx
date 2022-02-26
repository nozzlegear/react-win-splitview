import * as React from 'react';
import classes from "classnames";

export type CloseType = "full" | "partial";

interface NavRenderProps {
    open: boolean 
    closeType: CloseType
}

export type Props = React.PropsWithChildren<{
    open: boolean
    closeType: CloseType
    onClose: () => void
    navContent: React.ReactNode | ((props: NavRenderProps) => React.ReactNode)
    ariaLabel?: string
    closeOnContentFocused?: boolean
}>

export function SplitView(props: Props) {
    const containerClasses = classes("react-win-splitview", {
        open: props.open,
        "close-type-full": props.closeType === "full",
        "close-type-partial": props.closeType === "partial"
    });
    const handleContentFocused = React.useCallback(() => {
        if (props.open && props.closeOnContentFocused === true) {
            props.onClose();
        }
    }, [props.open, props.closeOnContentFocused, props.onClose]);

    return (
        <div className={containerClasses}>
            <nav className="react-win-splitview-nav" role="navigation" aria-label={props.ariaLabel ?? "Main"}>
                {typeof props.navContent === "function" 
                    ? props.navContent({ open: props.open, closeType: props.closeType }) 
                    : props.navContent}
            </nav>
            <div className="react-win-splitview-content" onClick={handleContentFocused}>
                {props.children}
            </div>
        </div>
    )
}

export default SplitView;
