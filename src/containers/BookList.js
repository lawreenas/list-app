import React, { Component } from 'react';
import { Collapse, Button, Tag, Row, Col } from 'antd';
import { updateBookHolder } from '../api';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
    this.onBookHolderChange = this.onBookHolderChange.bind(this);
    this.renderControls = this.renderControls.bind(this);
  }

  componentWillMount() {
    fetch('/books')
      .then((response) => response.json())
      .then(resp => {
        this.setState({books: resp})
      });
  }

  onBookHolderChange(book, user, e) {
    e.preventDefault();
    e.stopPropagation();
    updateBookHolder(book, user)
      .then(newBook => {
        this.setState({books: this.state.books.map(book => (book.id === newBook.id ? newBook : book))})
      });
  }

  renderControls(book) {
    const user = this.props.user;
    if (book.takenBy) {
      let returnBtn = null;
      if (user && book.takenBy.id === this.props.user.id) {
        returnBtn = <Button onClick={this.onBookHolderChange.bind(this, book, null)}>Return</Button>;
      }
      return (
        <div>
          <Tag color="pink">{book.takenBy.name}</Tag>
          {returnBtn}
        </div>
      );
    } else {
      if (user) {
        return (
          <Button onClick={this.onBookHolderChange.bind(this, book, user)}>Take</Button>
        );
      }
    }
  }

  render() {
    return (
      <Collapse bordered={false}>
        {
          this.state.books.map(book => {
            const header =(
              <Row>
                <Col span={18}>
                  <span style={{fontWeight: 'bold'}}>{book.title}</span> by {book.author}</Col>
                <Col span={6}>{this.renderControls(book)}</Col>
              </Row>
            );
            return (
              <Collapse.Panel header={header} key={book.id}>
                <p>{book.description}</p>
              </Collapse.Panel>
            );
          })
        }
      </Collapse>
    );
  }
};

export default BookList;
