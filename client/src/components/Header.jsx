import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./header.css";

function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token on logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="Navbar-band">
            Task Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {token ? ( 
                // If logged in, show Profile & Logout
                <>
                  <Nav.Link as={Link} to="/tasks" className="nav-item">
                    Tasks
                  </Nav.Link>
                  <Nav.Link as={Link} to="/users" className="nav-item">
                    Users
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="nav-item">
                    Logout
                  </Nav.Link>
                </>
              ) : ( 
                // If not logged in, show Login & Register
                <>
                  <Nav.Link as={Link} to="/login" className="nav-item">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" className="nav-item">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
