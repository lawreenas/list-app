import React, { Component } from 'react';
import { Collapse, Button, Tag, Row, Col } from 'antd';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
    this.takeBook = this.takeBook.bind(this);
    this.renderControls = this.renderControls.bind(this);
  }

  componentWillMount() {
    fetch('/books')
      .then((response) => response.json())
      .then(resp => {
        this.setState({books: resp})
      });
  }

  takeBook(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  renderControls(book) {
      if (book.takenBy) {
        const returnBtn = null;
        if (this.props.user && book.takenBy.userId === this.props.user.id) {
          returnBtn = <Button onClick={this.returnBook}>Return</Button>;
        }
        return (
          <div>
            <Tag color="pink">{book.takenBy.name}</Tag>
            {returnBtn}
          </div>
        );
      } else {
        return (
          <Button onClick={this.takeBook}>Take</Button>
        );
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
