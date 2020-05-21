import React, { useState, useEffect } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useAppContext } from '../libs/contextLib';
import { onError } from '../libs/errorLib';
import './Home.css';
import { API } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import LazyImg from '../components/LazyImg';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get('products', '/products');
  }

  function renderNotesList(notes) {
    return notes.map((note, i) => (
      <LinkContainer key={note.productId} to={`/notes/${note.productId}`}>
        <Card>
          <LazyImg className='card-img-top' id={note.attachment} />
          <Card.Body>
            <Card.Title>{note.content.trim().split('\n')[0]}</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'>{'Created: ' + new Date(note.createdAt).toLocaleString()}</small>
          </Card.Footer>
        </Card>
      </LinkContainer>
    ));
  }

  function renderLander() {
    return (
      <div className='lander'>
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to='/login' className='btn btn-info btn-lg'>
            Login
          </Link>
          <Link to='/signup' className='btn btn-success btn-lg'>
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className='notes'>
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          <LinkContainer key='new' to='/notes/new'>
            <ListGroupItem>
              <h4>
                <b>{'\uFF0B'}</b> Create a new note
              </h4>
            </ListGroupItem>
          </LinkContainer>
        </ListGroup>
        <CardGroup>{!isLoading && renderNotesList(notes)}</CardGroup>
      </div>
    );
  }

  return <div className='Home'>{isAuthenticated ? renderNotes() : renderLander()}</div>;
}
