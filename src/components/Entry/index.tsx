import React from 'react';
import Gist from 'react-gist';

const Entry = ({node: {data: {target: {fields, sys}}}}) => {
  switch (sys.contentType.sys.id) {
    case 'code':
      return (
        <Gist id={fields.gistId} file={fields.fileName}/>
      )
    default:
      return null
  }
}

export default Entry;
