import React, { Component } from "react";
import Slider from "react-slick";
import "./Slider.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class VerticalSwipeToSlide extends Component {
  render(props) {
    const settings = {
      dots: false,
      arrows: false,
      height:"32px",
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed:1000,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      beforeChange: function(currentSlide, nextSlide) {
      },
      afterChange: function(currentSlide) {
      }
    };

    return (
      <div>
        <Slider {...settings}>
          {
            this.props.cities.map(x=>{
              return               <div key={x.id}>
              <h3 className="slider-item">In {x.name}</h3>
            </div>
            })
          }

        </Slider>
      </div>
    );
  }
}