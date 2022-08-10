const Note = (props) => {
    return (
      <div key={props.id} className="card">
        <h4 className="title" onClick={props.showDesc}>{props.title}</h4>
        <p className="desc"
        >{props.description}</p>
        <div>
          <button className="btn-edit">edytuj</button>
          <button className="btn-delete">usuń</button>
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
      title: "",
      description: "",
      notes: [
        {
          id: 1,
          title: "Wykąpać psa",
          description: "pamiętaj aby wykąpać psa specjalnym szamponem",
        },
      ],
    };
    render() {
      const addNote = () => {
        const note = {
          id: this.state.notes.length + 1,
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
      }
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
                key={note.id}
                title={note.title}
                description={note.description}
                showDesc={showDesc}
  
              />
            ))}
          </ul>
        </div>
      );
    }
  }
  ReactDOM.render(<Notes />, document.getElementById("root"));
  