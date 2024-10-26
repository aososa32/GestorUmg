import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export class SweetAlerts {
  static Delete() {
    withReactContent(Swal)
      .fire({
        title: "Estas seguro de esta acción?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#a51e1e",
        cancelButtonColor: "#5b5a5a",
        confirmButtonText: "Si, eliminarlo!",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "El registro a sido eliminado.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
  }
}
