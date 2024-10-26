import { Button, Dropdown, Image } from "react-bootstrap";
import { useState } from "react";

export default function Chats() {
  var [supportChat, setSupportChat] = useState(false);

  const clickChat = () => {
    setSupportChat(!supportChat);
  };

  return (
    <div className="support-chat-container show">
      <div
        className={
          supportChat
            ? "container-fluid support-chat show-chat"
            : "container-fluid support-chat"
        }
      >
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
            <h5 className="mb-0 d-flex align-items-center gap-2">
              Soporte
              <span className="fa-solid fa-circle text-success fs--3"></span>
            </h5>
            <div className="btn-reveal-trigger">
              <Dropdown>
                <Dropdown.Toggle
                  className="btn btn-link p-0 dropdown-caret-none"
                  variant="light"
                >
                  <span className="fas fa-ellipsis-h text-900"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-end py-2">
                  <a className="dropdown-item" href="#!">
                    Buscar en el chat
                  </a>
                  <a className="dropdown-item" href="#!">
                    Cerrar
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="card-body chat p-0">
            <div className="d-flex flex-column-reverse scrollbar h-100 p-3">
              <div className="text-end mt-6">
                <a
                  className="mb-2 d-inline-flex align-items-center text-decoration-none text-1100 hover-bg-soft rounded-pill border border-primary py-2 ps-4 pe-3"
                  href="#!"
                >
                  <p className="mb-0 fw-semi-bold fs--1">
                    Yo necesito ayuda con algo.
                  </p>
                  <span className="fa-solid fa-paper-plane text-primary fs--1 ms-3"></span>
                </a>
              </div>
              <div className="text-center mt-auto">
                <div className="avatar avatar-3xl">
                  <Image
                    className="rounded-circle border border-3 border-white"
                    src="/images/user.png"
                    alt="Team"
                  />
                </div>
                <h5 className="mt-2 mb-3">Eric</h5>
                <p className="text-center text-black mb-0">Nombre</p>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex align-items-center gap-2 border-top ps-3 pe-4 py-3">
            <div className="d-flex align-items-center flex-1 gap-3 border rounded-pill px-4">
              <input
                className="form-control outline-none border-0 flex-1 fs--1 px-0"
                type="text"
                placeholder="Write message"
              />
              <label
                className="btn btn-link d-flex p-0 text-500 fs--1 border-0"
                htmlFor="supportChatPhotos"
              >
                <span className="fa-solid fa-image"></span>
              </label>
              <input
                className="d-none"
                type="file"
                accept="image/*"
                id="supportChatPhotos"
              />
              <label
                className="btn btn-link d-flex p-0 text-500 fs--1 border-0"
                htmlFor="supportChatAttachment"
              >
                {" "}
                <span className="fa-solid fa-paperclip"></span>
              </label>
              <input
                className="d-none"
                type="file"
                id="supportChatAttachment"
              />
            </div>
            <Button
              type="button"
              className="btn p-0 border-0 send-btn bg-transparent"
              onClick={() => {}}
            >
              <i className="fa-solid fa-paper-plane fs--1"></i>
            </Button>
          </div>
        </div>
      </div>
      <Button
        id="btn-supportchat"
        type="button"
        className={
          supportChat
            ? "btn p-0 border border-200 btn-support-chat btn-chat-close"
            : "btn p-0 border border-200 btn-support-chat"
        }
        onClick={(e) => clickChat()}
      >
        <span className="fs-0 btn-text text-primary text-nowrap">Chat</span>
        <span className="fa-solid fa-circle text-success fs--1 ms-2"></span>
        <span className="fa-solid fa-chevron-down text-primary fs-1"></span>
      </Button>
    </div>
  );
}
