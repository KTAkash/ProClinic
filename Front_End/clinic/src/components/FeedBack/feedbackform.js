import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './feedbackform.css';

const FeedbackForm = () => {
    const [email, setEmail] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [rating, setRating] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ratingMessage, setRatingMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && doctorName && rating) {
            axios.post('http://localhost:8085/api/feedback/Create', {
                email,
                doctorName,
                rating,
            }).then(response => {
                console.log(response.data);
                setSuccessMessage('Feedback submitted successfully!');
                setEmail('');
                setDoctorName('');
                setRating(0);
                setRatingMessage('');
                alert('Feedback submitted successfully!');
            }).catch(error => {
                console.error("There was an error submitting the feedback!", error);
            });
        } else {
            alert('Please fill all fields including rating.');
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleModalRatingClick = (index) => {
        setRating(index);
    };

    const handleRatingSubmit = () => {
        setRatingMessage(`You rated ${rating} stars`);
        closeModal();
    };

    return (
        <div className="App">
        <h1 className="feed">FEEDBACK FORM</h1>
        <div className="bg">
            <form onSubmit={handleSubmit} className="feedback-form">
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Doctor Name:</label>
                    <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <button type="button" onClick={openModal}>
                        Rate
                    </button>
                </div>
                {ratingMessage && <p>{ratingMessage}</p>}
                <button type="submit">Submit</button>
                {successMessage && <p>{successMessage}</p>}
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Rate Doctor"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Rate Doctor</h2>
                <div>
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= rating ? 'on' : 'off'}
                                onClick={() => handleModalRatingClick(index)}
                            >
                                <span className="star">★</span>
                            </button>
                        );
                    })}
                </div>
                <p>You rated {rating} stars</p>
                <button onClick={closeModal}>Close</button>
                <button type="button" onClick={handleRatingSubmit}>Submit Rating</button>
            </Modal>
        </div>
    </div>
    );
};

export default FeedbackForm;
