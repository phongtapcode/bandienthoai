import Slider from "react-slick";
import './Carousel.scss';
function Carousel(){
    var settings = {
        dots: true,
        infinite: true,
        speed:700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
      };
      return (
        <Slider {...settings}>
          <div>
            <img src="https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/banner-Samsung-Big-Note-8-800-300-GIF-1.gif" style={{width: '100%'}}/>
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