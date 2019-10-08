import React, { useEffect, useState } from 'react';
import styles from './SearchInput.module.css';

export const SearchInput = ({setIsFocused, setMapCenter}) => {
  const inputRef = React.createRef()
  const [placeData, setPlaceData] = useState({});

  useEffect( () => {
    if (window.google.maps) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current)
      // autocomplete.bindTo('bounds', window.google.maps.Map); // binds autocomplete to Map <-- research
      autocomplete.setFields(['address_components', 'formatted_address', 'geometry', 'icon', 'name', 'opening_hours', 'place_id', 'types', 'rating', 'photos']);
      autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        setPlaceData(place)
        // console.log(place)
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        })
        setIsFocused(false);
      });
    }
  }, [])


  return (
    <div className={styles.inputElement}>
          <div>
            <img src="pink-search.png" alt="search icon"/>
          </div>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Where do you gotta go?"
            name="searchInput"
            onFocus={() => setIsFocused(true)}
          />
        </div>
  )
}