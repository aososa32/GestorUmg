"use client";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export default function BNavbar({ verticalFunc }: any) {
  const cookies = useCookies();
  const router = useRouter();
  const username = cookies.get("username");

  let signOut = () => {
    cookies.remove("next-token");
    router.push("/auth/sign-in");
  };

  return (
    <>
      <Navbar className={"navbar-top fixed-top navbar-expand"}>
        <Container className="m-0 w-100" style={{ maxWidth: "100%" }}>
          <Navbar.Toggle onClick={verticalFunc} />
          <Navbar.Brand href="/pages/inicio" aria-labelledby="SISTEMA">
            <div className="d-flex align-items-center">
              <p className="logo-text ms-2 d-none d-sm-block">
                {/*<Image
                  src="/images/logo-icon.svg"
                  alt="logo"
                  width={40}
                  height={40}
                />*/}
                Gestor de Proyectos UMG
              </p>
            </div>  
          </Navbar.Brand>
          <Nav className="me-auto justify-content-end w-100">
            <Dropdown>
              <Dropdown.Toggle
                className="nav-link pe-0 remove-toggle bg-transparent border-0"
                variant="light"
              >
                <div className="d-flex justify-content-center">
                  < Image
                    src="/images/user.png"
                    alt="Usuario"
                    className="rounded-circle"
                    width={40}
                    height={40}
                  />
                  <p className="logo-text ms-2 d-none d-sm-block">
                  {username || "Usuario"}</p>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border border-300">
                <div className="bg-white position-relative border-0 rounded">
                  <div className="p-0 border-top">
                    <div className="px-3 m-5">
                      {" "}
                      <Button
                        variant="outline-secondary"
                        className="d-flex justify-content-center align-items-center w-100 btn-text-small"
                        onClick={() => signOut()}
                      >
                        <i className="fa-solid fa-right-from-bracket me-2 mt-1"></i>
                        Cerrar Sessión
                      </Button>
                    </div>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
