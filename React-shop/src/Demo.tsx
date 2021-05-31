import React from "react";
import Column from "./components/Column";

type State = { no: number; count: number };
class Demo extends React.Component<{}, State> {
  state: State = { no: 0, count: 0 };
  shouldComponentUpdate(nextProps: {}, nextState: State) {
    console.log("SHOULD COMPONENT UPDATE");
    console.log("PROPS", this.props, nextProps);
    console.log("STATE", this.state, nextState);
    return this.state.no !== nextState.no || nextState.count === 7;
  }
  render() {
    console.log("RENDER CALLED", this.state);
    const name = "Mike";
    return (
      <div className="row">
      
<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} aria-label="Slide 4" />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://www.macworld.com/wp-content/uploads/2021/03/iphone-lineup-2020-100862094-orig-5.jpg?quality=50&strip=all" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.apple.com/v/ipad/home/bm/images/overview/hero/ipad_pro_hero__bh3eq6sqfjw2_large.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.apple.com/in/iphone/home/images/overview/hero/iphone_12__d51ddqcc7oqe_large.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.apple.com/v/macbook-pro-13/g/images/overview/hero_endframe__bsza6x4fldiq_medium.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
    );
  }
}
export default Demo;
