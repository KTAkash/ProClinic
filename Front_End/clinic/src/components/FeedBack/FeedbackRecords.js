import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeedbackRecords.css';

const FeedbackRecords = () => {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        // Fetch feedback records
        axios.get('http://localhost:8085/api/feedback/all')
            .then(response => {
                setFeedbackList(response.data);
            })
            .catch(error => {
                console.error('Error fetching feedback records:', error);
            });
    }, []);

    return (
        <div className="feedback-records">
            <h1>Feedback Records</h1>
            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Rating</th>
                        <th>Stars</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackList.map((feedback, index) => (
                        <tr key={index}>
                            <td>{feedback.doctorName}</td> {/* Correct field for doctor name */}
                            <td>{feedback.rating}</td> {/* Correct field for numeric rating */}
                            <td>
                                {/* Generate stars dynamically based on rating */}
                                {[...Array(feedback.rating)].map((_, starIndex) => (
                                    <span key={starIndex} className="star">★</span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackRecords;
