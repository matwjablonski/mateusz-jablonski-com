import React from 'react';
import Gist from 'react-gist';
import RecommendedBook from '../RecommendedBook';

const Entry = ({node: {data: {target: {fields, sys}}}}) => {
  switch (sys.contentType.sys.id) {
    case 'code':
      return (
        <Gist id={fields.gistId} file={fields.fileName}/>
      )
    case 'book': 
      return <RecommendedBook book={fields}/>
    default:
      return null
  }
}

export default Entry;
