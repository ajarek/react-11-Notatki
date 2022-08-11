const Note = (props) => {
  return (
    <div key={props.id} className="card" id={props.id}>
      <h4 className="title" onClick={props.showDesc}>
        {props.title}
      </h4>
      <p className="desc">{props.description}</p>
      <div>
        <button onClick={props.editNote} className="btn-edit">
          edytuj
        </button>
        <button onClick={props.deleteNote} className="btn-delete">
          usuń
        </button>
      </div>
    </div>
  );
};

const CreateNote = (props) => {
  return (
    <div className="card">
      <label htmlFor="title-label" className="label">
        Tytuł
      </label>
      <input
        onChange={props.onChange}
        value={props.title}
        type="text"
        className="form-control"
        id="title-label"
      />
      <label htmlFor="desc-label" className="label">
        Opis
      </label>
      <textarea
        onChange={props.onChange}
        value={props.description}
        className="form-control"
        id="desc-label"
      ></textarea>
      <button className="btn-addNote" onClick={props.addNote}>
        Dodaj notatkę
      </button>
    </div>
  );
};

class Notes extends React.Component {
  state = {
    id: 0,
    title: "",
    description: "",
    notes: [
      {
        id: 12,
        title: "Wykąpać psa",
        description: "pamiętaj aby wykąpać psa specjalnym szamponem",
      },
      {
        id: 28,
        title: "Zrobić zakupy",
        description: "kupić mleko, masło, wędlinę",
      },
    ],
  };
  render() {
    const addNote = () => {
      const note = {
        id: Math.floor(Math.random() * 1000),
        title: this.state.title,
        description: this.state.description,
      };
      this.state.notes = [note, ...this.state.notes];
      this.setState({ notes: this.state.notes });
      this.setState({ title: "" });
      this.setState({ description: "" });
    };

    const showDesc = (e) => {
      e.target.nextElementSibling.classList.toggle("show");
    };

    const deleteNote = (e) => {
      const id = e.target.parentNode.parentNode.id;
      const newNotes = this.state.notes.filter(
        (note) => note.id !== Number(id)
      );
      this.setState({ notes: newNotes });
    };

    const editNote = (e) => {
      const id = e.target.parentNode.parentNode.id;
      const note = this.state.notes.find((note) => note.id === Number(id));
      this.setState({ title: note.title });
      this.setState({ description: note.description });
      const indexArray = this.state.notes.findIndex(
        (note) => note.id === Number(id)
      );
      this.state.notes.splice(indexArray, 1);
      this.setState({ notes: this.state.notes });
    };

    return (
      <div className="container">
        <p>Moje notatki:</p>
        <CreateNote
          addNote={addNote}
          onChange={(e) => {
            e.target.id === "title-label"
              ? this.setState({ title: e.target.value })
              : this.setState({ description: e.target.value });
          }}
          title={this.state.title}
          description={this.state.description}
        />
        <ul>
          {this.state.notes.map((note) => (
            <Note
              id={note.id}
              key={note.id}
              title={note.title}
              description={note.description}
              showDesc={showDesc}
              deleteNote={deleteNote}
              editNote={editNote}
            />
          ))}
        </ul>
      </div>
    );
  }
}
ReactDOM.render(<Notes />, document.getElementById("root"));
