import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-4">
            <Link to="/">
                <span className="navbar-brand mb-0 h1 fw-bold">Agenda Virtual</span>
            </Link>
            <div className="ml-auto">
                {store.isLogged ? (
                    <button className="btn btn-danger fw-bold" onClick={() => actions.logout(navigate)}>Cerrar sesión</button>
                ) : (
                    <>
                        <button className="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#loginModal">
                            Iniciar sesión
                        </button>

                        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="loginModalLabel">Iniciar sesión</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={store.username}
                                            onChange={(e) => actions.setUsername(e.target.value)}
                                            placeholder="Nombre de usuario"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    actions.login(store.username, navigate);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                            onClick={() => {
                                                actions.login(store.username, navigate);
                                            }}
                                        >
                                            Iniciar sesión
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

