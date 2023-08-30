import React from 'react';
import {useState} from "react";

export default function AddPost(props) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addPost(title, body);
        setBody('')
        setTitle('')
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2> Add New Post </h2>
            <div className="input-container">
                <label htmlFor="title">title</label>
                <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="body">Body</label>
                <textarea
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <button type="submit" className="btn-submit">
                Add post


            </button>
        </form>
    )
}
