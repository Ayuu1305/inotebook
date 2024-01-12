import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate=useNavigate()
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);

  const [Note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleclick = (e) => {
    editNote(Note.id,Note.etitle,Note.edescription,Note.etag);
    refClose.current.click();
    props.showalert("Updated succesfully","success")

  };
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showalert={props.showalert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    value={Note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={Note.edescription}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={Note.etag}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleclick}
                >
                  Add Note
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
              disabled={Note.etitle.length<5||Note.edescription.length<5}
                onClick={handleclick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1> Your Note</h1>
        <div className="contanier">
        {notes.length===0&&'No Notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updatenote={updatenote} showalert={props.showalert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
