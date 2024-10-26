import { toast, Id, TypeOptions } from 'react-toastify'

export class Message {
    static Loader(msj: string = "Cargando...") {
        return toast.loading(msj)
    }

    static Update(id: Id,msj: string, type: TypeOptions) {
        toast.update(id, {
            render: msj,
            type: type,
            isLoading: false,
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })
    }

    static Error(msj: string) {
        toast.error(msj)
    }

    static Warning(msj: string) {
        toast.warn(msj)
    }

    static Info(msj: string) {
        toast.info(msj)
    }
}