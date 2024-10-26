"use client";
import { Image } from "react-bootstrap";

export default function Loader({ load = true }: any) {
  return (
    <div
      className={
        load ? "pre-loader" : "d-flex align-items-center justify-content-center"
      }
    >
      <div className="row mb-4">
        <div className="col-12 d-flex align-items-center justify-content-center pb-3">
          <Image
            src="/images/vortex.svg"
            alt="loading..."
            width={80}
            height={80}
          />
        </div>
        <div className="col-12">
          <h4 className="text-center">Cargando...</h4>
        </div>
      </div>
    </div>
  );
}
