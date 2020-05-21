import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import Card from 'react-bootstrap/Card';
export default ({ className, id }) => {
  const [url, setUrl] = useState();
  useEffect(() => {
    if (id) {
      loadImg(id);
    }
  }, [id]);
  async function loadImg(id) {
    const url = await Storage.get(id, { level: 'public' });
    setUrl(url);
  }
  return url ? (
    <Card.Img
      variant='top'
      style={{
        height: 160,
        width: '100%',
        display: 'block',
      }}
      src={url}
    />
  ) : null;
};
