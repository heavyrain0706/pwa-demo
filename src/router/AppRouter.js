import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PhotoList from '../components/PhotoList/PhotoList';
import Photo from '../components/Photo/Photo';


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PhotoList />} />
      <Route path="/photos/:id" element={<Photo />} />
    </Routes>
  );
}

export default AppRouter;