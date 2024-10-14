import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [showModal, setShowModal] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [contact, setContact] = useState({
		name: "",
		phone: "",
		email: "",
		address: ""
	});
	const [editingContactId, setEditingContactId] = useState(null);

	// Función para manejar la apertura del modal en modo creación
	const handleCreateContact = () => {
		setEditMode(false);
		setContact({ name: "", phone: "", email: "", address: "" });
		setShowModal(true);
	};

	// Función para manejar la apertura del modal en modo edición
	const handleEditContact = (contact) => {
		setEditMode(true);
		setContact({ ...contact });
		setEditingContactId(contact.id);
		setShowModal(true);
	};

	// Función para manejar la creación o edición de contacto
	const handleSaveContact = () => {
		if (editMode) {
			actions.updateContact(store.username, editingContactId, contact);
		} else {
			actions.createContact(store.username, contact);
		}
		setShowModal(false);
	};

	return (
		<div className="container text-center mt-5">
			<h1 className="fw-bold">Lista de Contactos</h1>
			<div className="list-header d-flex justify-content-end">
				<button className="btn btn-success mb-4" onClick={handleCreateContact}>
					Crear Contacto
				</button>
			</div>
			<ul className="list-group">
				{store.contacts.map((contact, index) => (
					<li key={index} className="list-group-item d-flex align-items-start">
						<img
							src={contact.image || "https://i.pravatar.cc/100"}
							alt={contact.name}
							className="rounded-circle mx-5 "
							style={{ width: "100px", height: "100px", objectFit: "cover" }}
						/>
						<div className="d-flex flex-column justify-content-start text-start ms-5">
							<h5 className="fw-bold mb-1 text-start">{contact.name}</h5>
							<p className="mb-1"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
							<p className="mb-1"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
							<p className="mb-1"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
						</div>
						<div className="ms-auto d-flex">
							<button
								className="btn"
								onClick={() => handleEditContact(contact)}
							>
								<i className="fas fa-pencil-alt"></i>
							</button>
							<button
								className="btn"
								onClick={() => actions.deleteContact(store.username, contact.id)}
							>
								<i className="fas fa-trash"></i>
							</button>
						</div>
					</li>
				))}
			</ul>


			{showModal && (
				<div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">{editMode ? "Editar Contacto" : "Crear Contacto"}</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<input
									type="text"
									className="form-control mb-2"
									placeholder="Nombre"
									value={contact.name}
									onChange={e => setContact({ ...contact, name: e.target.value })}
								/>
								<input
									type="text"
									className="form-control mb-2"
									placeholder="Teléfono"
									value={contact.phone}
									onChange={e => setContact({ ...contact, phone: e.target.value })}
								/>
								<input
									type="email"
									className="form-control mb-2"
									placeholder="Email"
									value={contact.email}
									onChange={e => setContact({ ...contact, email: e.target.value })}
								/>
								<input
									type="text"
									className="form-control"
									placeholder="Dirección"
									value={contact.address}
									onChange={e => setContact({ ...contact, address: e.target.value })}
								/>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setShowModal(false)}
								>
									Cerrar
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleSaveContact}
								>
									{editMode ? "Guardar Cambios" : "Crear Contacto"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
