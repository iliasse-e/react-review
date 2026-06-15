import { useState } from 'react'

// BookForm: petit formulaire contrôlé pour ajouter un livre.
// Commentaires en français pour y aller doucement.
// - Commencez par taper le titre et l'auteur
// - Le formulaire appelle `onAdd` (si fourni) avec l'objet { title, author }
// - Réinitialise les champs après envoi
export function BookForm({ onAdd }) {
	// état local pour chaque champ (contrôlé)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')

	// gestionnaire d'envoi: empêche le rechargement de la page
	function handleSubmit(e) {
		e.preventDefault()
		// validation simple: ne rien faire si titre vide
		if (!title.trim()) return

		const newBook = { title: title.trim(), author: author.trim() }

		// Si le parent a passé une fonction `onAdd`, on l'appelle
		if (typeof onAdd === 'function') onAdd(newBook)

		// reset des champs pour une saisie douce
		setTitle('')
		setAuthor('')
	}

	return (
		<form className="book-form" onSubmit={handleSubmit}>
			{/* Label + input: commencez par le titre */}
			<label className="book-form__row">
				<span>Titre</span>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Ex: Les Damnés de la Terre"
				/>
			</label>

			{/* Label + input: auteur */}
			<label className="book-form__row">
				<span>Auteur</span>
				<input
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					placeholder="Ex: Frantz Fanon"
				/>
			</label>

			{/* Bouton d'envoi: petit et discret */}
			<div className="book-form__actions">
				<button type="submit" className="book-card__button book-card__button--primary">Ajouter</button>
			</div>
		</form>
	)
}

export default BookForm
