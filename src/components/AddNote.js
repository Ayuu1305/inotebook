import React, { useState, useContext } from "react";
import noteContext from "../context/notes/notecontext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [Note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addNote(Note.title, Note.description, Note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showalert("Added succesfully","success")

  };
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            required
            value={Note.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            required
            value={Note.description}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            minLength={5}
            required
            value={Note.tag}
          />
        </div>
        <button
          disabled={Note.title.length < 5 || Note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleclick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
