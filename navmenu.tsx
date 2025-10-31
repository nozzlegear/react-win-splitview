import * as React from "react";
import classes from "classnames";

export interface NavMenuItem {
    label: string;
    href?: string;
    title?: string;
    active?: boolean;
    icon?: React.ReactNode | (() => React.ReactNode);
    target?: React.HTMLAttributeAnchorTarget;
    onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface NavMenuItemRenderProps {
    href?: string;
    title?: string;
    target?: React.HTMLAttributeAnchorTarget;
    onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void;
    children: React.ReactNode;
}

interface SplitViewNavMenuProps {
    items: Array<NavMenuItem>;
    linkComponent?: (props: NavMenuItemRenderProps) => React.ReactNode;
}

interface LinkComponentProps {
    item: NavMenuItem;
}

export function SplitViewNavMenu(props: SplitViewNavMenuProps): React.JSX.Element {
    function LinkComponent(linkProps: LinkComponentProps): React.JSX.Element {
        const item = linkProps.item;
        const className = classes("react-win-splitview-nav-menu-item", {
            active: item.active === true,
        });
        const children = (
            <div className="react-win-splitview-nav-menu-item-link">
                <div className="react-win-splitview-nav-menu-item-link-icon" title={item.title ?? item.label}>
                    {typeof item.icon === "function" ? item.icon() : (item.icon ?? <React.Fragment />)}
                </div>
                <span className="react-win-splitview-nav-menu-item-link-label">{item.label}</span>
            </div>
        );
        let result: React.ReactNode;

        if (props.linkComponent) {
            result = props.linkComponent({
                href: item.href,
                target: item.target,
                onClick: item.onClick,
                title: item.title,
                children: children,
            });
        } else {
            result = (
                <a href={item.href} onClick={item.onClick} target={item.target} title={item.title}>
                    {children}
                </a>
            );
        }

        return <li className={className}>{result}</li>;
    }

    return (
        <ul className="react-win-splitview-nav-menu">
            {props.items.map((item) => (
                <LinkComponent key={item.href ?? item.label} item={item} />
            ))}
        </ul>
    );
}
