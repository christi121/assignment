import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSearchHistory, getSuggestions, saveSearchHistory } from './api';

function App() {
  const [suggestions, setSuggestions] = useState([])
  const [searchHistory, setSearchHistory] = useState([])
  const [selectedValue, setSelectedValue] = useState([])

  useEffect(() => {
    fetchSearchHistory()
  }, [])

  const fetchSuggestions = async (param) => {
    try {
      if (param !== "" && param !== undefined) {
        const data = await getSuggestions(param)
        if (data != null || data !== undefined) {
          setSuggestions(data)
        }
      }
    } catch (error) {
    }
  }

  const fetchSearchHistory = async () => {
    try {
      const data = await getSearchHistory()
      if (data != null || data !== undefined) {
        setSearchHistory(data)
      }
    } catch (error) {
    }
  }

  const saveSearch = async (value) => {
    try {
      const data = { name: value }
      const result = await saveSearchHistory(data)
      setSearchHistory(result)
    } catch (error) {
    }
  }

  const handleSelection = (event, value) => {
    saveSearch(value)
    setSelectedValue([])
    setSuggestions([])
  }

  const handleInputChange = (event, value) => {
    fetchSuggestions(value)
  }

  const handleBlur = (event, value) => {
    setSuggestions([])
  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item
          sx={{ width: 340 }}>
          <Autocomplete
            id="location-select"
            freeSolo
            clearOnBlur
            clearOnEscape
            onBlur={handleBlur}
            value={selectedValue}
            options={suggestions.map((option) => option.display_place.toUpperCase())}
            onChange={handleSelection}
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} label="LOCATION" />}
          /><br></br>
          {
            searchHistory.length > 2 ?
              <Stack direction={'row'} spacing={1} alignItems={"center"}>
                <Button variant="filled" sx={{ color: "black", backgroundColor: "ButtonShadow", borderRadius: 1 }}>{searchHistory.at(0).name.toUpperCase()}</Button>
                <Button variant="filled" sx={{ color: "black", backgroundColor: "ButtonShadow", borderRadius: 1 }}>{searchHistory.at(1).name.toUpperCase()}</Button>
                <FormControl variant="filled" sx={{ backgroundColor: "ButtonShadow", minWidth: 110 }} size="small">
                  <InputLabel id="more-loc" sx={{ color: "black" }}>{searchHistory.length - 2} MORE</InputLabel>
                  <Select
                    labelId="more-loc"
                    id="more-loc"
                    label="{searches.length-2} MORE"
                    value=""
                  >
                    {
                      searchHistory.slice(2).map(loc => {
                        return <MenuItem key={searchHistory.indexOf(loc)} value={loc.name}>{loc.name.toUpperCase()}</MenuItem>
                      })}
                  </Select>
                </FormControl>
              </Stack>
              :
              <Stack direction={'row'} spacing={6} alignItems={"center"}>
                {searchHistory.map(loc => {
                  return <InputLabel variant="filled" sx={{ backgroundColor: "ButtonShadow", borderRadius: 1 }}>{loc.name}</InputLabel>
                })}
              </Stack>
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
