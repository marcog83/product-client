import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
export default ({ className, id }) => {
  const [url, setUrl] = useState('/default-placeholder-300x300.png');
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
    <img
      className='card-img top'
      onError={(e) => (e.currentTarget.src = '/default-placeholder-300x300.png')}
      style={{
        height: 160,
        display: 'block',
      }}
      src={url}
    />
  ) : null;
};
