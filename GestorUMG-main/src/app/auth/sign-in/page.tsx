"use client";
import { Button, Form, FormCheck, FormLabel } from "react-bootstrap";
import React from "react";
import { useRouter } from "next/navigation";
import { Message } from "@/app/lib/message";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import API from "@/app/lib/auth";
import Toast from "@/app/components/Toast";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const cookies = useCookies();
  const router = useRouter();

  const formik: any = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("El usuario es requerido"),
      password: Yup.string().required("La contraseña es requerida"),
    }),
    onSubmit: async (values) => {
      const id = Message.Loader();
      try {
        const res = await API<{ token: string, message: string, username?: string}>(values, "login", "POST", false);
        
        if (res?.ok && res.result) {
          if (res.result !== null) {
            if(res.result.token !== "ERROR"){
              console.log(res.result);
              cookies.set("next-token", res.result.token, {
                expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
              });
              if (res.result.username) {
                cookies.set("username", res.result.username, {
                  expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
                });
              }
              Message.Update(id, "Usuario correcto.", "success");
              router.push("/");
            } else{
              Message.Update(id, "Usuario o contraseña incorrectos.", "error");
            }
          } else {
            Message.Update(id, "El resultado de la autenticación es nulo.", "error");
          }
        } else {
          const message = `Error: ${res?.result?.message}, ${res?.code} - ${res?.status}`;
          Message.Update(id, message, "error");
        }
      } catch (error) {
        console.error('Error:', error);
        Message.Update(id, 'Error inesperado. Por favor, inténtalo de nuevo más tarde.', "error");
      }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <div className="mb-4 text-start">
        <FormLabel className="formLabel" htmlFor="username">
          Usuario
        </FormLabel>
        <div className="formIconContainer">
          <Form.Control
            id="username"
            name="username"
            type="text"
            placeholder="Ingrese usuario"
            aria-label="Disabled input example"
            className="form-control formIconInput"
            isInvalid={!!formik.touched.username && !!formik.errors.username}
            {...formik.getFieldProps("username")}
          />
          <span className="fas fa-user formIcon"></span>
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.username}
          </Form.Control.Feedback>
        </div>
      </div>
      <div className="mb-3 text-start">
        <FormLabel className="formLabel" htmlFor="password">
          Contraseña
        </FormLabel>
        <div className="formIconContainer">
          <Form.Control
            id="password"
            name="password"
            type="password"
            className="form-control formIconInput"
            placeholder="Ingrese contraseña"
            isInvalid={!!formik.touched.password && !!formik.errors.password}
            {...formik.getFieldProps("password")}
          />
          <span className="fas fa-key formIcon"></span>
          <Form.Control.Feedback type="invalid" tooltip>
            {formik?.errors?.password}
          </Form.Control.Feedback>
        </div>
      </div>
      <div className="row flex-between-right mb-4">
        <div className="d-none">
          <div className="mb-0">
            <FormCheck id="remember" type="checkbox" label="Recordarme" />
          </div>
        </div>
      </div>
      <br />
      <Button type="submit" variant="primary" className="w-100 mb-3 btn-text-small">
        <i className="fas fa-user me-2"></i>Clic para Iniciar
      </Button>
      <Toast />
    </Form>
  );
}