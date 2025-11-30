import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
   const fetchBodyParts = async () => {
  const data = await fetchData(
    'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    exerciseOptions
  );

  if (data.error) {
    console.error("Failed to fetch body parts:", data.message);
    setBodyParts([]); // fallback empty array
    return;
  }

  if (!Array.isArray(data)) {
    console.error("Unexpected data format:", data);
    setBodyParts([]); // fallback empty array
    return;
  }

  setBodyParts(data);
};
    fetchBodyParts();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;

    const data = await fetchData(
      'https://exercisedb.p.rapidapi.com/exercises',
      exerciseOptions
    );

    const filtered = data.filter(
      item =>
        item.name.toLowerCase().includes(search) ||
        item.equipment.toLowerCase().includes(search) ||
        item.bodyPart.toLowerCase().includes(search)
    );

    setExercises(filtered);
    setSearch('');
  };

  const handleBodyPartChange = async (bodyPart) => {
    setBodyPart(bodyPart);

    let data = [];
    if (bodyPart === 'all') {
      data = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );
    } else {
      data = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
        exerciseOptions
      );
    }
    setExercises(data);
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }}>
        Awesome Exercises You Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search exercises"
          type="text"
          sx={{
            input: { fontWeight: '700', border: 'none' },
            width: { lg: '800px', xs: '300px' },
            backgroundColor: '#fff',
            borderRadius: '4px'
          }}
        />
        <Button
          className="search-btn"
          sx={{
            backgroundColor: '#FF2625',
            color: '#fff',
            width: { lg: '175px', xs: '80px' },
            height: '56px'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      {/* Body Parts (scroll bar) */}
      <Stack direction="row" gap="20px" flexWrap="wrap" justifyContent="center">
        {bodyParts.map((item) => (
          <Button
            key={item}
            onClick={() => handleBodyPartChange(item)}
            sx={{
              borderRadius: '20px',
              backgroundColor: bodyPart === item ? '#FF2625' : '#fff',
              color: bodyPart === item ? '#fff' : '#000',
              textTransform: 'capitalize',
              padding: '10px 20px',
              border: '1px solid #ccc'
            }}
          >
            {item}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default SearchExercises;
