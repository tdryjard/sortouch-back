import React from "react";
import ListStock from '../ListStock/ListStock';
import Builder from '../builder/Builder';
import Navbar from '../../navbar/Navbar'
import './area.css'

const Area = () => {
  return (
    <div className="containerArea">
      <Navbar type="editeur" />
      <Builder />
      <ListStock />
    </div>
  );
};

export default Area;
