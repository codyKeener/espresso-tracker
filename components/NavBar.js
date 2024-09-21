/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="nav-brand">
            <img
              alt="Spro Bro, the Espresso Tracker mascot"
              src="/spro-bro.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Espresso Tracker
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <div style={{
              display: 'flex',
            }}
            >
              <Link passHref href="/">
                <Nav.Link className="nav-link">Home</Nav.Link>
              </Link>
              <Link passHref href="/shots/edit/new">
                <Nav.Link className="nav-link">New Shot</Nav.Link>
              </Link>
              <Link passHref href="/my-shots">
                <Nav.Link className="nav-link">My Shots</Nav.Link>
              </Link>
              <Link passHref href="/profile">
                <Nav.Link className="nav-link">Profile</Nav.Link>
              </Link>
            </div>
            <div>
              <Button className="card-delete-button" onClick={signOut}>Sign Out</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
