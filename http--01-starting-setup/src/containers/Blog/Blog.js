import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(()=> import('./NewPost/NewPost'));

class Blog extends Component {
    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/posts" component={Posts}/>
                    <Route path="/new-post" exact component={AsyncNewPost}/>
                    <Redirect from="/" to="posts"/>
                </Switch>
                
                

            </div>
        );
    }
}

export default Blog;