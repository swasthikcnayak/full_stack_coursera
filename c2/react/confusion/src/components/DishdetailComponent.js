import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import {baseUrl} from '../shared/baseUrl';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length > len;
const maxLength = (len) => (val) => !val || val.length <= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false,
    };

    this.toggleCommentForm = this.toggleCommentForm.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  toggleCommentForm() {
    this.setState({
      isFormOpen: !this.state.isFormOpen,
    });
  }

  handleCommentSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comments
    );
    this.toggleCommentForm();
  }

  render() {
    return (
      <>
        <Modal isOpen={this.state.isFormOpen} toggle={this.toggleCommentForm}>
          <ModalHeader toggle={this.toggleCommentForm}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  id="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>

              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Your Name
                </Label>

                <Control.text
                  model=".name"
                  id="name"
                  name="name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Row>

              <Row className="form-group">
                <Label htmlFor="comments" md={4}>
                  Comments
                </Label>
                <Control.textarea
                  model=".comments"
                  id="comments"
                  name="comments"
                  className="form-control"
                />
              </Row>

              <Row className="form-group">
                <Col md={{ size: 10 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline color="secondary" onClick={this.toggleCommentForm}>
          <span className="fa fa-pencil"> Submit Comment</span>
        </Button>
      </>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg top src={baseUrl+dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}

function Rendercomments({ comments, postComment, dishId }) {
  if (comments != null) {
    const list = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <div>
            <p>{comment.comment}</p>
            <p>
              --{comment.author},
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </div>
        </li>
      );
    });

    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {list}
          <CommentForm dishId={dishId} postComment={postComment} />
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const Dishdetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <Rendercomments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
};

export default Dishdetail;
