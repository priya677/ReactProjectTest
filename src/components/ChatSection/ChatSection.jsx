import { useContext, useEffect, useRef, useState } from 'react';
import { SelectedNoteGroupContext } from '../../context/selectedNoteGroupContext';
import SingleGroupSection from '../SingleGroupSection/SingleGroupSection';
import styles from './chatSection.module.css';
import { IoMdSend } from 'react-icons/io';
import SingleChat from '../SingleChat/SingleChat';
import { chatCurrentTime } from '../../utils/ChatCurrentTime';
import { IoArrowBackOutline } from 'react-icons/io5';
import { v4 as uuid } from 'uuid';

const ChatSection = ({
	allNotes,
	isSmallScreen,
	setShowRightContainer,
	setShowLeftContainer,
	
}) => {
	const [note, setNote] = useState('');
	const [updateNote, setUpdateNote] = useState('');
	const chatContainerRef = useRef();
	const inputRef = useRef();
	const { selectedNoteGroup, setSelectedNoteGroup } = useContext(SelectedNoteGroupContext);
	const selectedNoteGroupId = selectedNoteGroup.id;
	const [chatData, setChatData] = useState(selectedNoteGroup.chatData || []);
	const newNoteId = uuid();


	//  ADD New note handle 
	const handleSubmit = (error) => {
		error.preventDefault();
		if (!note) {
			return;
		}

		const { formattedDate, formattedTime } = chatCurrentTime();
		const data = { id: newNoteId, date: formattedDate, time: formattedTime, note };

		setChatData((prev) => [...prev, data]);
		updateAllNotes(data);
		updateSelectedNoteGroupDetails(data);
		setNote('');
	};

	const updateSelectedNoteGroupDetails = (newChatData) => {
		const updatedSelectedGroupDetail = { ...selectedNoteGroup };
		updatedSelectedGroupDetail.chatData = [...updatedSelectedGroupDetail.chatData, newChatData];
		setSelectedNoteGroup(updatedSelectedGroupDetail);

		//UPDATED DATA FROM LOCALSTORAGE
		localStorage.setItem('selectedGroupDetails', JSON.stringify(updatedSelectedGroupDetail));
	};

	const updateAllNotes = (newData) => {
		const updatedObject = allNotes.map((object) => {
			if (object.id === selectedNoteGroupId) {
				object.chatData = obj.chatData || [];
				object.chatData.push(newData);
			}
			return object;
		});

		localStorage.setItem('AllNotes', JSON.stringify(updatedObject));
	};

	// UPDATED NOTE
	const handleNoteUpdate = (id, updateNote) => {
		if (!updateNote) {
			return;
		}
		const { formattedDate, formattedTime } = chatCurrentTime();
		const updatedData = { id: id, date: formattedDate, time: formattedTime, note: updateNote };

		const updatedChatData = chatData.map((obj) => {
			if (obj.id === id) {
				return updatedData;
			}
			return obj;
		});

		setChatData(updatedChatData);
		updatelocalStorageAllNotes(updatedChatData);
		updatelocalStorageSelectedGroupDetail(updatedChatData);
	};

	const updatelocalStorageSelectedGroupDetail = (updatedChatData) => {
		const updatedSelectedGroupDetail = { ...selectedNoteGroup };
		updatedSelectedGroupDetail.chatData = updatedChatData;
		setSelectedNoteGroup(updatedSelectedGroupDetail);
		// Save your updated DATA to localStorage
		localStorage.setItem('selectedGroupDetails', JSON.stringify(updatedSelectedGroupDetail));
	};

	const updatelocalStorageAllNotes = (updatedChatData) => {
		const updatedObject = allNotes.map((obj) => {
			if (obj.id === selectedNoteGroupId) {
				obj.chatData = updatedChatData;
			}
			return obj;
		});
		localStorage.setItem('AllNotes', JSON.stringify(updatedObject));
	};

	// DELETE NOTE HANDLER
	const handleNoteDeleted = (id) => {
		if (!id) {
			return;
		}

		const updatedChatData = chatData.filter((object) => object.id !== id);

		setChatData(updatedChatData);
		updatelocalStorageAllNotes(updatedChatData);
		updatelocalStorageSelectedGroupDetail(updatedChatData);
	};

	const handleKeyPress = (event) => {
		if (event.shiftKey && event.key === 'Enter') {
			handleSubmit(event);
		}
	};

	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	};

	const handleBackArrowClicked = () => {
		setShowRightContainer((prev) => !prev);
		setShowLeftContainer((prev) => !prev);
	};

	useEffect(() => {
		setChatData(selectedNoteGroup.chatData || []);
		setNote('');
	}, [selectedNoteGroup]);

	useEffect(() => {
		scrollToBottom();
	}, [note]);

	return (
		<main className={styles.MainContainer}>
			<div className={styles.HeadProfile}>
				{isSmallScreen && (
					<IoArrowBackOutline
						onClick={handleBackArrowClicked}
						className={styles.BackArrow}
					/>
				)}
				<SingleGroupSection groupDetail={selectedNoteGroup} />
			</div>
			<div ref={chatContainerRef} className={styles.ChatSection}>
				{chatData.map((object, index) => {
					return (
						<SingleChat
							handleNoteUpdate={handleNoteUpdate}
							updateNote={updateNote}
							setUpdateNote={setUpdateNote}
							id={index}
							key={index}
							details={object}
							handleNoteDeleted={handleNoteDeleted}
						/>
					);
				})}
			</div>
			<div className={styles.formSection} ref={inputRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.InputContainer}>
						<textarea
							onKeyDown={handleKeyPress}
							rows={6}
							required
							className={styles.TextArea}
							type='textarea'
							value={note}
							placeholder='write your note here ...'
							onChange={(event) => setNote(event.target.value)}
						/>

						<div onClick={handleSubmit} className={styles.SendButton}>
							<IoMdSend style={note ? { color: '#B2BBDC' } : { color: '#8E8E8E' }} />
						</div>
					</div>
				</form>
			</div>
		</main>
	);
};

export default ChatSection;
