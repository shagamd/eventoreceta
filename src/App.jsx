import "./App.css";

import Logo from "./images/logo-1.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { configData } from "./config/config";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [documento, setDocumento] = useState("");
  const [idEmpelado, setIdEmpleado] = useState("");
  const [nombreEmpelado, setNombreEmpleado] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [mostarPpal, setMostrarPpal] = useState(true);

  useEffect(() => {
    // $("#agregar").on("click", habilitarFormulario);
    // $("#guardar").on("click", guardarInfoParticipante);
  }, []);

  const consultarInformacionEmpleado = async () => {
    let patt = new RegExp(/^[A-Za-z0-9\s]+$/g);

    if (documento.trim() === "") {
      Swal.fire({
        icon: "warning",
        html: "El n&uacute;mero de Identificaci&oacute;n es Requerido para iniciar el proceso.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    let resultado = patt.test(documento);
    if (!resultado) {
      Swal.fire({
        icon: "warning",
        html: "El n&uacute;mero de Identificaci&oacute;n contiene caracteres no validos.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setSpinner(true);

    const response = await axios.post(`${configData.hostApi}/evento/consultarEmpleados`, { documento });
    setSpinner(false);
    if (!response.data.success) {
      Swal.fire({
        icon: "warning",
        html: response.data.EMensaje,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const infoEmpleado = response.data.infoEmpleado;
      setIdEmpleado(infoEmpleado.Cedula);
      setNombreEmpleado(infoEmpleado.Nombre);
      setMostrarPpal(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <nav className="navbar row">
          <div className="container">
            <div className="row col-12">
              <div className="col-4 col-sm-3 col-md-3 col-lg-3">
                <a href="./">
                  <img className="logoPrincipal" src={Logo} alt="" />
                </a>
              </div>
              <div className="col-8 col-sm-6 col-md-6 col-lg-6  my-auto text-end">
                <section>
                  <a
                    className="btn btn-outline-dark btn-floating iconoSocialMedia"
                    href="https://www.facebook.com/MacPolloNumero1"
                    target="_blank"
                    role="button"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    className="btn btn-outline-dark btn-floating iconoSocialMedia"
                    href="https://www.instagram.com/macpollonumero1/?hl=es"
                    target="_blank"
                    role="button"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    className="btn btn-outline-dark btn-floating iconoSocialMedia"
                    href="https://www.youtube.com/channel/UCMe3O-wRbCUILvgiLUXohjQ"
                    target="_blank"
                    role="button"
                  >
                    <FaYoutube />
                  </a>
                </section>
              </div>
              <div className="col-12 col-sm-3 col-md-3 my-auto alinearTexto">Eventos de la Receta</div>
            </div>
          </div>
        </nav>
        <div className={"card text-center mt-4 mb-4 " + (!mostarPpal && "oculto")}>
          <div className="card-body">
            <h2 className="titulos cabeceraCard text-center">BIENVENIDO AL REGISTRO DE PARTICIPANTES</h2>
            <h3 className="titulos cabeceraCard text-center">??Evento de la Receta!</h3>
            <br />
            <p className="cuerpoCard">Ingrese su identificaci&oacute;n:</p>
            <div className="row mb-2">
              <div className="anchoVariable mx-auto">
                <input
                  type="text"
                  className="form-control"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  onKeyUp={(e) => e.key == "Enter" && consultarInformacionEmpleado()}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primario" onClick={() => consultarInformacionEmpleado()}>
                Consultar
              </button>
            </div>
          </div>
        </div>
        <div className="container text-center mt-4">
          <p className={"cuerpoCardPeque " + (mostarPpal && "oculto")}>
            Hola!,{" "}
            <b>
              <span>{nombreEmpelado}</span>
            </b>{" "}
            ??desea agregar un participante?{" "}
            <button type="button" className="btn btn-primario" id="agregar">
              Agregar
            </button>
          </p>
          <div className="row justify-content-center oculto" id="infoPersona">
            <div className="col-12 col-md-8 col-lg-6 pb-5">
              <div className="card border-primary rounded-0">
                <div className="card-header p-0">
                  <div className="bg-personal text-white text-center py-2">
                    <h5>
                      <i className="fa fa-user"></i> Ingrese la siguiente informaci&oacute;n
                    </h5>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-id-card text-personal"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control cajasFormulario"
                        id="cedula"
                        name="cedula"
                        placeholder="Cedula"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user text-personal"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control cajasFormulario"
                        id="nombrecompleto"
                        name="nombrecompleto"
                        placeholder="Nombres y Apellidos"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-envelope text-personal"></i>
                        </div>
                      </div>
                      <input
                        type="email"
                        className="form-control cajasFormulario"
                        id="correo"
                        name="correo"
                        placeholder="ejemplo@gmail.com"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-mobile text-personal"></i>
                        </div>
                      </div>
                      <input
                        type="email"
                        className="form-control cajasFormulario"
                        id="celular"
                        name="celular"
                        placeholder="+57312345678"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-primario" id="guardar">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"loading " + (spinner ? "" : "oculto")}>Loading</div>
    </>
  );
}

export default App;
