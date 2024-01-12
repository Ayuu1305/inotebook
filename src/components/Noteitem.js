import React, { useContext } from "react";
import noteContext from "../context/notes/notecontext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context; // Corrected the function name
  const { note,updatenote } = props;
  
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => { deleteNote(note._id) ;
    props.showalert("Deleted succesfully","success")
  }}
          ></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{
            updatenote(note)
          }}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
