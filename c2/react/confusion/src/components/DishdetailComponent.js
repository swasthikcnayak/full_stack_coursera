import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";


class Dishdetail extends Component {

  renderDish(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
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

   renderComments(dish){

    if (dish != null) {

        const list = dish.comments.map((comments)=>{

            return(
                <li key={comments.id} >
                    <div>
                        <p>{comments.comment}</p>
                        <p>--{comments.author},
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                    </div>
                </li>

            );
        });

        return(
              <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {list}
                    </ul>
                    </div>
        );
    }
    else{
        return(
            <div></div>
        )
    }
}

  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.dish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(this.props.dish)}
        </div>
      </div>
      </div>
    );
  }
}

export default Dishdetail;

// class Dishdetail extends Component {
//   constructor(props) {
//     super(props);
//   }

//   monthConvertor(d) {
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];
//     return monthNames[d]
// }

//   renderDish(dish) {
//     if (dish != null) {
//       return (
//         <Card>
//           <CardImg top src={dish.image} alt={dish.name} />
//           <CardBody>
//             <CardTitle>{dish.name}</CardTitle>
//             <CardText>{dish.description}</CardText>
//           </CardBody>
//         </Card>
//       );
//     } else {
//       return <div></div>;
//     }
//   }

//   renderComments(dish) {
//         if (dish != null) {
//             return (
//                 <div className="mt-2 col-12 col-md-5">
//                     <h4>Comments</h4>
//                     {dish.comments.map(x => {
//                         const date = new Date(x.date);
//                         const day = date.getDate();
//                         const month = this.monthConvertor(date.getMonth());
//                         const year = date.getFullYear();
//                         console.log(month, year)
//                         return (
//                             <ul className="list-unstyled">
//                                 <li key={x.comment.id}>{x.comment}</li>
//                                 <li>-- {x.author} , {month} {day}, {year}</li>
//                             </ul>
//                         )
//                     })}
//                 </div>
//             )
//         }
//         else {
//             return (
//                 <div></div>
//             )
//         }
//     }

//   render() {
//     return (
//       <div className="row">
//         <div className="col-12 col-md-5 m-1">
//           {this.renderDish(this.props.selecteddish)}
//         </div>
//         <div className="col-12 col-md-5 m-1">
//           {this.renderComments(this.props.selecteddish)}
//         </div>
//       </div>
//     );
//   }
// }

// export default Dishdetail;