const Search = () => {
  return (
    <div className="position-relative">
      <input type="text" className="form-control" list="suggestions" />
      <datalist id="suggestions" className="list-unstyled bg-light border rounded p-2">
        <option className="suggestion-option" value="Suggestion 1" />
        <option className="suggestion-option" value="Suggestion 2" />
        <option className="suggestion-option" value="Suggestion 3" />
      </datalist>
    </div>
  );
};

export default Search;