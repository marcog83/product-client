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
    const url = await Storage.vault.get(id);
    setUrl(url);
  }
  return url ? (
    <img
      alt="myimage"
      className={className}
      onError={(e) => (e.currentTarget.src = '/default-placeholder-300x300.png')}
       
      src={url}
    />
  ) : null;
};
