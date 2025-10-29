import * as React from 'react';
import { SplitView } from "../index";
import { SplitViewNavMenu, NavMenuItemRenderProps } from "../navmenu";
import { render } from 'react-dom';

function TestPage(): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const [closeOnContentFocused, setCloseOnContentFocused] = React.useState(false);
    const [closeType, setCloseType] = React.useState<"full" | "partial">("partial");

    // Event handlers
    const toggleOpen = () => setOpen(!open);
    const toggleCloseOnContentfocused = () => setCloseOnContentFocused(!closeOnContentFocused);
    const toggleCloseType = () => setCloseType(closeType === "full" ? "partial" : "full");

    // Placeholder images to test sticky scrolling
    const placeholderContent = Array.from(Array(30).keys()).map(x => (
        <div key={x} className="placeholder-item">
            <img src="https://placekitten.com/g/300/300" alt="placeholder" />
        </div>
    ));

    // Navigation menu content
    const NavContent = () => {
        const items = [
            {
                label: "First Nav Link",
                onClick: () => alert("You clicked the first link"),
                icon: "1",
                active: true
            },
            {
                label: "Second Nav Link",
                href: "https://example.com",
                target: "_blank",
                icon: () => "2"
            },
            {
                label: "Third Nav Link",
                href: "https://example.com",
                icon: <div>{"3"}</div>
            }
        ]
        const linkComponent = (props: NavMenuItemRenderProps) => {
            return (
                <a href={props.href} onClick={props.onClick} title="Custom link component">
                    {props.children}
                </a>
            )
        }

        return <SplitViewNavMenu items={items} linkComponent={linkComponent} />
    }

    return (
        <div>
            <nav className="nav">
                <div className="controls">
                    <button className="toggle-button" type="button" onClick={toggleOpen}>
                        &#8801;
                    </button>
                </div>
                <h1>{"React Win SplitView"}</h1>
                <div className="controls">
                    <button type="button" onClick={toggleCloseType}>
                        {"Pane close type: " + closeType}
                    </button>
                    <button type="button" onClick={toggleCloseOnContentfocused}>
                        {"Close on content focused: " + closeOnContentFocused}
                    </button>
                </div>
            </nav>
            <SplitView
                open={open}
                closeType={closeType}
                closeOnContentFocused={closeOnContentFocused}
                ariaLabel={closeType}
                onClose={() => setOpen(false)}
                navContent={NavContent}
            >
                <div className="placeholders">
                    {placeholderContent}
                </div>
            </SplitView>
        </div>
    );
}

(function () {
    render(<TestPage />, document.getElementById("contenthost"));
}());
