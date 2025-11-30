import React, { useState } from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;

  const lastIndex = currentPage * exercisesPerPage;
  const firstIndex = lastIndex - exercisesPerPage;
  const currentExercises = exercises.slice(firstIndex, lastIndex);

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" mb="46px">
        Showing Results
      </Typography>

      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap="50px">
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>

      <Stack mt="70px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
