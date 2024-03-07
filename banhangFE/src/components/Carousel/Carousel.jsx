import Slider from "react-slick";
import './Carousel.scss';
function Carousel(){
    var settings = {
        dots: true,
        infinite: true,
        speed:500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <Slider {...settings}>
          <div>
            <img src="/src/assets/image/slider1.jpg" style={{width: '100%'}}/>
          </div>
          <div>
          <img src="/src/assets/image/slider2.jpg" style={{width: '100%'}}/>
          </div>
          <div>
          <img src="/src/assets/image/slider3.jpg" style={{width: '100%'}}/>
          </div>
          <div>
          <img src="/src/assets/image/slider4.jpg" style={{width: '100%'}}/>
          </div>
        </Slider>
      );
}

export default Carousel;