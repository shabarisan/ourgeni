import React from "react";
import useStyles from './mobileMenuStyles'
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useCart } from "react-use-cart";
import CartDrawer from '../../cartDrawer/cartDrawer';


//const drawerWidth = 280;

const MobileMenu = ({ serviceList,userDetails,LogoutClick }) => {
  const { totalItems } = useCart();
  const CartCount = totalItems;
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const classes = useStyles();
  const [openServieMenu, setOpenServieMenu] = React.useState(false);

  const handleClickServieMenu = () => {
    setOpenServieMenu(!openServieMenu);
  };
  
  const [openProfileMenu, setOpenProfileMenu] = React.useState(false);

  const handleClickProfileMenu = () => {
    setOpenProfileMenu(!openProfileMenu);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };
 
  return (
    <div className={classes.menu_cart_bx}>
      <CssBaseline />
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className={classes.mobilMenuButton}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <div />
        <Divider />

        <List>
          <ListItem button>
            
            <ListItemText >
          
              <Link component={RouterLink} to="/" className={classes.MenuLinks} onClick={()=>{setOpen(!open)}}>Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
             <Link  component={RouterLink} to="/about-us" className={classes.MenuLinks} onClick={()=>{setOpen(!open)}}> About</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
            <Link component={RouterLink} to="/blog" className={classes.MenuLinks} onClick={()=>{setOpen(!open)}}> Blog </Link>
            </ListItemText>
          </ListItem>
          {/* onClick={()=>{setOpen(!open)}} */}
          <ListItem button onClick={handleClickServieMenu}>
           <ListItemText >
              <Link className={classes.MenuLinks}> Services</Link>
           </ListItemText >
            {openServieMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openServieMenu} timeout="auto" unmountOnExit className={classes.menuListItems}>
            <List component="div" disablePadding>
              {serviceList && serviceList.length > 0 ? serviceList.map((service) => (
                <Link 
                  className={classes.MenuLinks} key={service.id}  
                    href={'/services/sub/service/' +  service.id}
                  > 
                  <ListItem button className={classes.nested} key={service.id}>
                    <ListItemText className={classes.MenuLinks}>{service.service_name} </ListItemText>
                  </ListItem>
                </Link>
              ))
              :
                <ListItem button className={classes.nested}>
                 <ListItemText className={classes.MenuLinks}>No service found</ListItemText>
                </ListItem>
              }
            </List>
          </Collapse>
          {
        userDetails.name ? 
          <div>
            <ListItem button onClick={handleClickProfileMenu}>
              <ListItemText >
                  <Link className={classes.MenuLinks}> { userDetails.name}</Link>
              </ListItemText >
                {openProfileMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openProfileMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} >
                      <Link component={RouterLink} to={'/user-profile'} className={classes.MenuLinks}> <ListItemText className={classes.MenuLinks}>Profile</ListItemText></Link>
                    </ListItem>
                    <ListItem button className={classes.nested} >
                      <Link component={RouterLink} to={'/services/service-booking-history'} className={classes.MenuLinks}> <ListItemText className={classes.MenuLinks}>My Account</ListItemText></Link>
                    </ListItem>
                    <ListItem button className={classes.nested} >
                      <Link className={classes.MenuLinks} onClick={LogoutClick}> <ListItemText className={classes.MenuLinks}>Logout</ListItemText></Link>
                    </ListItem>
                </List>
              </Collapse>
            </div>
            :
            <div>
          <ListItem button>
              <ListItemText>
              <Link className={classes.MenuLinks} component={RouterLink} to={'/login'} onClick={()=>{setOpen(!open)}}> Sign In </Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
              <Link className={classes.MenuLinks} component={RouterLink} to={'/register'} onClick={()=>{setOpen(!open)}}>Sign Up</Link>
              </ListItemText>
            </ListItem>
            </div>
        }
        </List>
      </Drawer>
      <CartDrawer />
      {/* <Badge badgeContent={CartCount} color="primary">
          <ShoppingCartIcon />
       </Badge> */}
    </div>
  );
}

export default MobileMenu;