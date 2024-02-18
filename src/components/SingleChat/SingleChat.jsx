import React, { useState } from 'react';
import styles from './singleChat.module.css';
import { GoDotFill } from 'react-icons/go';
import { GrEdit } from 'react-icons/gr';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { IoMdCopy } from 'react-icons/io';
import { VscSaveAs } from 'react-icons/vsc';

const SingleChat = ({
	details,
	handleNoteUpdate,
	setUpdateNote,
	updateNote,
	handleNoteDeleted,
}) => {
	const [copyMessage, setCopyMessage] = useState('');

	const [isEditing, setIsEditing] = useState(false);

	const handleCopyButton = async () => {
		try {
			await navigator.clipboard.writeText(details.note);
			setCopyMessage('Copied!');
		} catch (error) {
			setCopyMessage('Error copying');
		}

//Message clear after sometimes
		setTimeout(() => {
			setCopyMessage('');
		}, 2000);
	};

	const handleEditButton = () => {
		setUpdateNote(details.note);
		setIsEditing(true);
	};

	const handleSaveButton = () => {
		
		setIsEditing(false);
		handleNoteUpdate(details.id, updateNote);
	};

	const handleDeleteButton = () => {
		handleNoteDeleted(details.id);
	};

	const handleChangeNote = (event) => {
		setUpdateNote(event.target.value);
	};

	return (
		<>
			<div className={styles.chatContainer}>
				{isEditing ? (
					<textarea
						rows={5}
						required
						className={styles.TextSection}
						type='textarea'
						value={updateNote}
						onChange={handleChangeNote}
					/>
				) : (
					<p className={styles.Note}>{details.note}</p>
				)}

				<div className={styles.actionContainer}>
					<div className={styles.buttons}>
						<div>
							<span className={styles.copyMessage}>{copyMessage}</span>
							<IoMdCopy
								className={styles.copyButton}
								title='Copy'
								onClick={handleCopyButton}
							/>
						</div>
						{isEditing ? (
							<VscSaveAs
								title='Update'
								className={styles.saveButton}
								onClick={handleSaveButton}
							></VscSaveAs>
						) : (
							<GrEdit
								className={styles.editButton}
								title='Edit'
								onClick={handleEditButton}
							/>
						)}
						<MdOutlineDeleteOutline
							className={styles.deleteButton}
							title='Delete'
							onClick={handleDeleteButton}
						/>
					</div>

					<div className={styles.noteDetails}>
						<p>{details.date}</p>
						<GoDotFill />
						<p>{details.time}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleChat;
