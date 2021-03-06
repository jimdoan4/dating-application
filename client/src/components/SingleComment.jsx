import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";

export default class SingleComment extends Component {
        // We'll set up the  array as an empty array to begin with
  state = {
    comment: {
      rating: "",
      dateAgain: "",
      review: "",
      withWho: "",
      photoUrl: "",
      lessonLearned: ""
    },
    redirectToComment: false,
    displayEditForm: true,
    userId: this.props.match.params.userId,
    commentId: this.props.match.params.commentId
  };

  getSingleCommentData = () => {
    axios
      .get(`/api/users/${this.state.userId}/comments/${this.state.commentId}`) // When the page loads, grab all user comment id from the database
      .then(res => {
        this.setState({ comment: res.data });
      });
  };

  componentDidMount = () => {
    this.getSingleCommentData();
  };

  toggleEditForm = () => {  // This toggle the button when clicked
    this.setState((state, props) => {
      return { displayEditForm: !state.displayEditForm };
    });
  };

  handleChange = e => {
    const updateComment = { ...this.state.comment };
    updateComment[e.target.name] = e.target.value;
    this.setState({ comment: updateComment });
  };

  updateComment = e => {
    e.preventDefault();
    axios
      .put(`/api/users/${this.state.userId}/comments/${this.state.commentId}`, {  // ask the server to update the user comment in the database
        rating: this.state.comment.rating,
        dateAgain: this.state.comment.dateAgain,
        review: this.state.comment.review,
        withWho: this.state.comment.withWho,
        photoUrl: this.state.comment.photoUrl,
        lessonLearned: this.state.comment.lessonLearned
      })
      .then(res => {
        this.setState({ comment: res.data, displayEditForm: false });
      });
    this.getSingleCommentData();
  };

  deleteComment = () => {
    axios
      .delete(
        `/api/users/${this.state.userId}/comments/${this.state.commentId}`  // Ask the server to delete this user comment id
      )
      .then(res => {
        this.setState({ redirectToComment: true });
      });
  };

  render() {
    if (this.state.redirectToComment) {
      return <Redirect to={`/users/`} />;
    }
    return (
      <div className="text-center">
        <h3 style={{ marginTop: "30px" }} className="text-center">
          {this.state.comment.withWho}
        </h3>
        {this.state.displayEditForm ? (
          <Form onSubmit={this.updateComment} className="col-lg-12">
            <Col>
              <div className="col-lg-12 m6 text-center">
                <label
                  style={{ marginRight: "30px", marginTop: "30px" }}
                  htmlFor="rating"
                >
                  How would you rate this date:
                </label>
                <input
                  style={{ height: "50px", width: "320px" }}
                  className="text-center"
                  id="rating"
                  type="text"
                  name="rating"
                  onChange={this.handleChange}
                  value={this.state.comment.rating}
                />
              </div>
              <div className="col s12 m6 text-center">
                <label
                  style={{ marginRight: "30px", marginTop: "40px" }}
                  htmlFor="dateAgain"
                >
                  Would you date this person again:{" "}
                </label>
                <input
                  style={{
                    height: "54px",
                    width: "390px",
                    marginRight: "53px"
                  }}
                  className="text-center"
                  id="dateAgain"
                  type="text"
                  name="dateAgain"
                  onChange={this.handleChange}
                  value={this.state.comment.dateAgain}
                />
              </div>
              <div className="col s12 m6 text-center">
                <label
                  style={{ marginRight: "30px", marginTop: "40px" }}
                  htmlFor="withWho"
                >
                  Who was your date:{" "}
                </label>
                <input
                  style={{
                    height: "54px",
                    width: "390px",
                    marginRight: "53px"
                  }}
                  className="text-center"
                  id="withWho"
                  type="text"
                  name="withWho"
                  onChange={this.handleChange}
                  value={this.state.comment.withWho}
                />
              </div>
              <div className="col s12 m6 text-center">
                <label
                  style={{ marginRight: "30px", marginTop: "40px" }}
                  htmlFor="review"
                >
                  Write a Review about this date:
                </label>
                <input
                  style={{
                    height: "54px",
                    width: "390px",
                    marginRight: "53px"
                  }}
                  className="text-center"
                  id="review"
                  type="text"
                  name="review"
                  onChange={this.handleChange}
                  value={this.state.comment.review}
                />
              </div>
              <div className="col s12 m6 text-center">
                <label
                  style={{ marginRight: "30px", marginTop: "40px" }}
                  htmlFor="lessonLearned"
                >
                  What did you learn about this date:{" "}
                </label>
                <input
                  style={{
                    height: "54px",
                    width: "390px",
                    marginRight: "53px"
                  }}
                  className="text-center"
                  id="lessonLearned"
                  type="text"
                  name="lessonLearned"
                  onChange={this.handleChange}
                  value={this.state.comment.lessonLearned}
                />
              </div>
            </Col>
            <div className="text-center" style={{ marginTop: "20px" }}>
              <Button className="text-center edit-button">Submit</Button>
            </div>
          </Form>
        ) : (
          <div>
            <div className="text-center edit-button">
              <Button
                 className="edit-button"
                onClick={this.toggleEditForm}
              >
                Edit Review
              </Button>
              <Button
              className="edit-button"
                onClick={this.deleteComment}
              >
                Delete Review
              </Button>
            </div>
          </div>
        )}
        <div className="text-center" style={{ marginTop: "18px" }}>
       
          <Link className="text-center" to={`/users/${this.state.userId}/`}>
          <Button className="edit-button">
            Back To User
            </Button>
          </Link>
   
      </div>
      </div>
    );
  }
}
