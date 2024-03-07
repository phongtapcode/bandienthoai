import Carousel from '../../components/Carousel/Carousel'
import './HomePage.scss'

function HomePage(){
    return(
        <main className='main'>
        <div className='main__content'>
            <div className='main__content__left'>
                <div className='main__content__left--carousel'>
                <Carousel/>
                </div>
                <div className='main__content__left--image'>
                    <img src='/src/assets/image/tragopimg1.jpg'/>
                    <img src='/src/assets/image/tragopimg2.jpg'/>
                </div>
            </div>
            <div className='main__content__right'>
                <img src='/src/assets/image/phukiengiamgia.jpg'/>
            </div>
        </div>
        </main>
    )
}

export default HomePage