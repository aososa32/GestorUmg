import { Accordion } from "react-bootstrap";
import BButtonAccordion from "./BButtonAccordion";

export default function BNavAccordion({
  children,
  title,
  icon,
  parent = false,
}: any) {
  const classParent = () => {
    return parent ? "nav-item-wrapper" : "nav-item";
  };
  const classChildParent = () => {
    return "ps-3 parent-wrapper " + (parent ? "label-1" : "");
  };
  const subTitle = parent ? (
    <div className="collapsed-nav-item-title d-none">{title}</div>
  ) : (
    ""
  );
  return (
    <Accordion defaultActiveKey="0" className={classParent()}>
      <BButtonAccordion eventKey="1" icon={icon} parent={parent}>
        {title}
      </BButtonAccordion>
      <Accordion.Collapse eventKey="1" className={classChildParent()}>
        <div className="nav parent">
          {subTitle}
          {children}
        </div>
      </Accordion.Collapse>
    </Accordion>
  );
}
