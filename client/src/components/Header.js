import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg';
import { AppBar, IconButton, Toolbar, Badge } from '@material-ui/core/';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logout } from '../actions/User';
import './Header.css'; // not created yet. 

const Header = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
      };
    };
  
    return (
        <header>
          <AppBar elevation={0} position="static" color="inherit">
            <Toolbar>
              <Link to="/">
                <logo className="header__logo" fontSize="large" />
              </Link>
    
              {userInfo ? (
                <div className="header__nav">
                  <Link to="/">
                    <div className="header__option">
                      <span
                        onClick={logoutHandler}
                        className="header__optionLineOne">
                        LOG OUT
                      </span>
                    </div>
                  </Link>
    
                  <Link to="/cart">
                    <IconButton aria-label="Show cart items" color="inherit">
                      <Badge
                        badgeContent={cartItems?.length}
                        fontSize="small"
                        color="secondary" >
                        <ShoppingCartIcon fontSize="small" />
                      </Badge>
                    </IconButton>
                  </Link>
                </div>
              ) : (
                <div className="header__nav">
                  <Link to="/login">
                    <div className="header__option">
                      <span className="header__optionLineOne">SIGN IN</span>
                    </div>
                  </Link>
    
                  <Link to="/cart">
                    <IconButton aria-label="Show cart items" color="inherit">
                      <Badge
                        badgeContent={cartItems?.length}
                        fontSize="small"
                        color="secondary"
                      >
                        <ShoppingCartIcon fontSize="small" />
                      </Badge>
                    </IconButton>
                  </Link>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </header>
      );
    
    export default Header;
