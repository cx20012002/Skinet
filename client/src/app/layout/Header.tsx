import React from 'react'
import {AppBar, Badge, Box, IconButton, Link, List, ListItem, Toolbar, Typography} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";
import {NavLink} from "react-router-dom";


const midLinks = [
    {title: 'home', path: '/'},
    {title: 'shop', path: '/shop'},
    {title: 'contact', path: '/contact'}
];

const rightLinks = [
    {title: 'login'},
    {title: 'register'}
]

const navStyles = {
    color: 'inherit',
    backgroundColor: 'unset',
    fontSize: '.8em',
    border:"1px solid white",
    borderRadius: 1
}

function Header() {
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 80}}>
                <Link href={"#"} display={"flex"} alignItems={"center"}>
                   <img src={"/images/logo.png"} alt={"logo"} style={{height: 70}}/>
                </Link>
                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem component={NavLink} to={path} sx={{color: "inherit"}} key={title}>{title.toUpperCase()}</ListItem>
                    ))}
                </List>

                <Box display={"flex"} alignItems={"center"} gap={3}>
                    <IconButton size={"large"} sx={{color: "inherit"}}>
                        <Badge badgeContent={5} color={"secondary"}>
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                    <List sx={{display: 'flex', gap: 1}}>
                        {rightLinks.map(({title}) => (
                            <ListItem component={"button"} key={title} sx={navStyles}>{title.toUpperCase()}</ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header