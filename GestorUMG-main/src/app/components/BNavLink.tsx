import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BNavLink({ Name, Icon, Href, parent = false }: any) {
  const router = usePathname();
  const classLinkParent = () => {
    const vParent = parent ? "label-1" : "";
    return router === Href
      ? `nav-link ${vParent} active`
      : `nav-link ${vParent}`;
  };
  const classParent = "nav-item" + (parent ? "-wrapper" : "");
  const classTextParent = parent ? (
    <span className="nav-link-text-wrapper">
      <span className="nav-link-text">{Name}</span>
    </span>
  ) : (
    <span className="nav-link-text">{Name}</span>
  );

  const iconParent = parent ? <i className={"nav-link-icon " + Icon}></i> : "";
  return (
    <div className={classParent}>
      <Link
        className={classLinkParent()}
        href={Href}
      >
        <div className="d-flex align-items-center">
          {iconParent}
          {classTextParent}
        </div>
      </Link>
    </div>
  );
}
