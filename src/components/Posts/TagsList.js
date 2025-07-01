import {Chip} from "@mui/material";
import React from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

const TagsListContainer = styled.div`
  margin-top: 1em;
`;

const TagsList = ({tags, selection}) => {
  const history = useHistory();

  // Given a tag, "select" this tag in the UI
  // This will show as a URL query param and filter the list of posts
  const selectTag = (tag) => {
    if (!selection?.includes(tag)) {
      // Build up a query containing this tag and navigate to it
      const query = selection?.concat(tag)?.map((tag) => `tag=${tag}`)?.join('&');
      history.push(`/posts?${query}`);
    }
  }

  // Given a tag, "deselect" this tag in the UI
  // This will remove the URL query param and refilter the list of posts
  const deselectTag = (tag) => {
    if (selection?.includes(tag)) {
      // Build up a query without this tag and navigate to it
      const query = selection?.filter(t => tag !== t)?.map((tag) => `tag=${tag}`)?.join('&');
      history.push(`/posts?${query}`);
    }
  }

  return (
    <TagsListContainer>
      {
        tags?.map((tag) =>
          selection?.includes(tag)
            ? <Chip style={{marginRight: '3rem', cursor: 'pointer', background: 'rgb(61, 96, 23)', color:'white'  }} label={`#${tag}`}
                    variant="outlined" onClick={() => deselectTag(tag)} />
            : <Chip style={{marginRight: '3rem', cursor: 'pointer' }} label={`#${tag}`}
                    onClick={() => selectTag(tag)} />
        )
      }
    </TagsListContainer>
  );
}

export default TagsList;
