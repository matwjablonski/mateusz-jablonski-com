import React from 'react';
import Gist from 'react-gist';
import RecommendedBook from '../RecommendedBook';
import UpdateNote from '../UpdateNote';

const Entry = ({node: {data: {target: {fields, sys}}}}) => {
  switch (sys.contentType.sys.id) {
    case 'code':
      return (
        <Gist id={fields.gistId} file={fields.fileName}/>
      )
    case 'book': 
      return <RecommendedBook book={fields}/>
    case 'updateNote':
      return <UpdateNote note={fields.note} date={fields.date} />
    default:
      console.log('sys.contentType.sys.id', sys.contentType.sys.id);
      return null
  }
}

export default Entry;
