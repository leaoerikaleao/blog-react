import React, { Children, Component } from 'react';
import firebase from '../../firebase'
import './home.css';

class Home extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    firebase.app.ref('posts').once('value', (snapshot) => {
      let state = this.state;
      state.posts = [];

      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          title: childItem.val().title,
          img: childItem.val().img,
          description: childItem.val().description,
          author: childItem.val().author
        })
      });
      this.setState(state);
    })
  }

  render() {
    return (
      <section id="post">
        {this.state.posts.map((post) => {
          return (
            <article key={post.key}>
              <header>
                <div className="title">
                  <strong>{post.title}</strong>
                  <span>{post.author}</span>
                </div>
              </header>
              <img src={post.img} alt={post.title} />
              <footer>
                <p>
                  {post.description}
                </p>
              </footer>
            </article>
          )
        })}
      </section>
    );
  }

}

export default Home;
