"use client";
import { useContext } from "react";
import { AccordionContext } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

export default function BButtonAccordion({
  children,
  eventKey,
  icon,
  parent = false,
  callback,
}: any) {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey, icon, parent)
  );

  const isCurEvKey = activeEventKey === eventKey ? "down" : "right";
  const classParent =
    "nav-link dropdown-indicator" + (parent ? " label-1" : "");
  const iconParent = parent ? <span className={"nav-link-icon " + icon}></span> : "";

  return (
    <div onClick={decoratedOnClick} className={classParent}>
      <div className="d-flex align-items-center">
        <div className="dropdown-indicator-icon">
          <i className={"fas fa-caret-" + isCurEvKey}></i>
        </div>
        {iconParent}
        <span className="nav-link-text">{children}</span>
      </div>
    </div>
  );
}
