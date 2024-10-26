import Link from "next/link";
import { Button, Image } from "react-bootstrap";

export default function NotFound() {
  return (
    <main className="main" id="top" style={{ backgroundColor: "#141824" }}>
      <div className="px-3">
        <div className="row vh-100 p-5">
          <div className="col-12">
            <div className="row justify-content-center align-items-center g-5 h-100">
              <div className="col-12 col-md-6 text-center">
                <Image className="w-100" src="/images/dark_404.png" alt="404" />
                <h2 className="text-800 fw-bolder mb-3">¡ERROR 404!</h2>
                <p className="text-700 mb-5">
                  No existe la página <br className="d-none d-sm-block" />
                  favor de regresar a la página principal.{" "}
                </p>
                <Link href="/pages/dashboard">
                  <Button type="button" variant="outline-primary">
                    Regresar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
