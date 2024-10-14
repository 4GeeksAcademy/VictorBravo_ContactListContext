import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const { showModal, editingContactId, currentContact } = store;


	return (
		<div className="container text-center mt-5">
			<h1 className="fw-bold">Lista de Contactos</h1>
			<div className="list-header d-flex justify-content-end">
				<button className="btn btn-success mb-4" onClick={actions.openCreateModal}>
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
								onClick={() => actions.openEditModal(contact)}
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
				<div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">{editingContactId ? 'Editar contacto' : 'Crear contacto'}</h5>
								<button type="button" className="btn-close" onClick={actions.closeModal}></button>
							</div>
							<div className="modal-body">
								<input
									type="text"
									className="form-control mb-2"
									placeholder="Nombre"
									value={currentContact.name}
									onChange={(e) => actions.setCurrentContact({ ...currentContact, name: e.target.value })}
								/>
								<input
									type="text"
									className="form-control mb-2"
									placeholder="Teléfono"
									value={currentContact.phone}
									onChange={(e) => actions.setCurrentContact({ ...currentContact, phone: e.target.value })}
								/>
								<input
									type="email"
									className="form-control mb-2"
									placeholder="Email"
									value={currentContact.email}
									onChange={(e) => actions.setCurrentContact({ ...currentContact, email: e.target.value })}
								/>
								<input
									type="text"
									className="form-control mb-2"
									placeholder="Dirección"
									value={currentContact.address}
									onChange={(e) => actions.setCurrentContact({ ...currentContact, address: e.target.value })}
								/>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={actions.closeModal}>Cancelar</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => {
										if (editingContactId) {
											actions.updateContact(store.username, editingContactId, store.currentContact); // Llama a updateContact en modo edición
										} else {
											actions.createContact(store.username, store.currentContact); // Llama a createContact en modo creación
										}
										actions.closeModal(); // Cierra el modal después de la acción
									}}>
									{editingContactId ? 'Actualizar' : 'Crear'} {/* Cambia el texto del botón según el modo */}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
