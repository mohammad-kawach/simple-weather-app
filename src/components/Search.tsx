import React, { ChangeEvent, useState } from "react";
import fetchSuggestions from "../utils/fetchSuggestions";

type CitySuggestion = {
  name: string;
  country: string;
};

interface SearchProps {
  searchedCity: string;
  setSearchedCity: React.Dispatch<React.SetStateAction<string>>;
  setSuggestions: React.Dispatch<React.SetStateAction<CitySuggestion[]>>;
  suggestions: CitySuggestion[];
}

const Search: React.FC<SearchProps> = ({
  searchedCity,
  setSearchedCity,
  setSuggestions,
  suggestions,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setSearchedCity(city);
    console.log("Searched city:", city);
    console.log(showOptions);

    try {
      const data = await fetchSuggestions(city);
      setSuggestions(data);
      console.log("Suggestions:", data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }

    setShowOptions(true); // Show options when input value changes
  };

  const handleBlur = () => {
    setShowOptions(false); // Hide options when input loses focus
  };

  function handleSuggestClick(option: CitySuggestion) {
    console.log("Suggest clicked:", option.name);
    setShowOptions(false); // Hide options when an item is clicked
    setSearchedCity(option.name);
  }

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        list="suggestions"
        value={searchedCity}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {showOptions && suggestions.length > 0 && (
        <div className="list">
          {suggestions.map((option, index) => (
            <div
              className="item"
              key={index}
              onClick={() => handleSuggestClick(option)}
            >
              {option.name}, {option.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
