import React, { Component } from 'react';
import './App.css';

/*drop-down,button*/
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button } from 'antd';

/*page*/
import Home from './Home'
import Bisection from './Bisection'
import FalsePosition from './FalsePosition'
import Onepoint from './Onepoint'
import Newton from './Newton'



/*switch page*/
import {
  Route,
  NavLink,
  Switch,
  Router,Link
} from "react-router-dom";

const menu1 = (

  <div className = "headpage">

      <Menu>

            <Menu.Item>
                <NavLink to ="/Bisection" activeClassName="active">Bisection </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to ="/FalsePosition" activeClassName="active">FalsePosition </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to ="/Onepoint" activeClassName="active">Onepoint Iteration </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to ="/Newton" activeClassName="active">Newton-Raphson </NavLink>
            </Menu.Item>

      </Menu>

  </div>


);

function App (){

  
  return (


    <div className="App">

    <div className="headpage">
    
        <Link to="/" ClassName ="Home">
          
          <button>Home</button>

        </Link>

      <h>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h>

        <Dropdown overlay={menu1} placement="bottomLeft">

           <button>Root of Equations</button>

        </Dropdown>


        
      </div>

            
            <Switch>

              <Route exact path = "/" component = {Home}/>
              <Route path = "/Bisection" component = {Bisection}/>
              <Route path="/FalsePosition" component={FalsePosition} />
              <Route path="/Onepoint" component={Onepoint} />
              <Route path="/Newton" component={Newton} />
 

            </Switch>
        

     </div>

    )
    
}
export default App;
