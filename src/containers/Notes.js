import React, { useRef, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import { onError } from '../libs/errorLib';
import { FormGroup, FormControl, FormLabel, Figure } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './Notes.css';
import { s3Upload } from '../libs/awsLib';
import LazyImg from '../components/LazyImg';

export default function Notes() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get('products', `/product/${id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content } = note;

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return content.length > 0;
  }

  

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  function saveNote(note) {
    return API.put('products', `/product/${id}`, {
      body: note,
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveNote({
        content,
        attachment: attachment || note.attachment,
      });
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteNote() {
    return API.del('products', `/product/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm('Are you sure you want to delete this note?');

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      history.push('/');
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className='Notes'>
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId='content'>
            <FormControl 
            value={content} 
            as='textarea' 
            onChange={(e) => setContent(e.target.value)} />
          </FormGroup>
          <Figure>
            <LazyImg  id={note.attachment} />   
          </Figure>
          
           
          <FormGroup controlId='file'>
            {!note.attachment && <FormLabel>Attachment</FormLabel>}
            <FormControl onChange={handleFileChange} type='file' />
          </FormGroup>
          <LoaderButton
            block
            type='submit'
            size='large'
            variant='primary'
            isLoading={isLoading}
            disabled={!validateForm()}>
            Save
          </LoaderButton>
          <LoaderButton block size='large' variant='danger' onClick={handleDelete} isLoading={isDeleting}>
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}
