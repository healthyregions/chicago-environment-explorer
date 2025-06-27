import {NavLink} from "react-router-dom";
import React from "react";

const TagsDisplay = ({ tags }) =>
  <>
    {
      tags?.map((tag) =>
        <NavLink style={{ marginRight: '3rem' }} to={`/posts?tag=${tag}`}>#{tag}</NavLink>
      )
    }
  </>;

export default TagsDisplay;
