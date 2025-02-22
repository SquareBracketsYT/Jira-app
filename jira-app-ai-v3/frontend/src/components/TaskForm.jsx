import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [predictedTime, setPredictedTime] = useState(null);

    const handleTitleChange = async (e) => {
        setTitle(e.target.value);
        if (e.target.value.length > 3) {
            const res = await axios.post("http://localhost:5500/api/tasks/suggest", { input: e.target.value });
            setSuggestions(res.data.suggestions);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5500/api/tasks/create", { title, description });
        setPredictedTime(res.data.estimatedTime);
    };

    return (
        <div>
            <input type="text" value={title} onChange={handleTitleChange} placeholder="Task Title" />
            <ul>
                {suggestions.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description"></textarea>
            <button onClick={handleSubmit}>Create Task</button>
            {predictedTime && <p>Estimated Completion Time: {predictedTime} hrs</p>}
        </div>
    );
};

export default TaskForm;
