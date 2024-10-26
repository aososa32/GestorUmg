"use client";
import { Image } from "react-bootstrap";
import { Props } from "../models/Props";

export default function AuthLayout({ children }: Props) {
  return (
    <div className="container">
      <div
        className={
          "row min-vh-100 py-4 align-items-center justify-content-center"
        }
      >
        <div className="col-sm-10 col-md-8 col-lg-5 col-xl-4 col-xxl-3">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <div className="d-flex align-items-center fw-bolder fs-5 d-inline-block">
              <Image
                src="/images/user.png"
                alt="GestorUMG"
                width={100}
                height={100}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
