import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }
    postSelectedHandler = (id) =>{
        this.setState({selectedPostId: id});
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post=>{
                return {
                    ...post,
                    author: 'Max'
                }
            })
            this.setState({posts:updatedPosts});
        });
    }
    render() {
        const posts = this.state.posts.map(post => {
            return (
                <Link to={{
                    pathname: '/posts/' + post.id,
                }} key={post.id}>
                    <Post 
                    id={post.id} 
                    title={post.title} 
                    body={post.body}
                    clicked={()=>this.postSelectedHandler(post.id)}/>
                </Link>
            )
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>
            </div>
            
        );

    }

}



export default Posts;


