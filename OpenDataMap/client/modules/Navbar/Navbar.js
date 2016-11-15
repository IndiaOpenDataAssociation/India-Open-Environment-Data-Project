import React, {Component} from 'react'
import Navbar,{Header, Brand, Toggle, Collapse} from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'
import {Link} from 'react-router'
// import {Navbar, Nav, NavItem} from 'react-bootstrap'

export default class Demo extends Component{
  render(){
    return(
      <div>
        <Navbar inverse fluid fixedTop>
          <Header>
            <Brand>
              <Link to="/">OPEN ENVIRONMENT DATA PROJECT</Link>
            </Brand>
            <Toggle />
          </Header>
          <Collapse>
            <Nav pullRight>
              <LinkContainer to="/about">
                <NavItem eventKey={1}>About</NavItem>
              </LinkContainer>

              <LinkContainer to="/community">
                <NavItem eventKey={2}>Community</NavItem>
              </LinkContainer>

              <LinkContainer to="/openapi">
                <NavItem eventKey={3}>Open APIs</NavItem>
              </LinkContainer>

              <LinkContainer to="/partners">
                <NavItem eventKey={4}>Partners</NavItem>
              </LinkContainer>

              <NavItem eventKey={5} href="http://knowledge.indiaopendata.com/index.php/India_Open_Environment_Data_Project" target="_blank">WIKI</NavItem>

              <LinkContainer to="/airowl">
                <NavItem eventKey={6} className="custom-navitem">Get our OWL</NavItem>
              </LinkContainer>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
