import React from 'react'
import Slider from 'react-slick'
const Card = () => {
    const image = [
        { "img": "/banner.png" },
        { "img": "/banner-3.png" },
        { "img": "/banner-1.png" },
        { "img": "/banner.png" },
    ]
    var settings = {
        arrows:true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div>
            <div className='relative'>
            <Slider {...settings}>
           
                {image.map((vl, index) => {
                    return <div key={index}>  <img className='w-full  h-full w-100' src={vl.img} alt='' /></div>
                })}
                </Slider>
            </div>
        </div>
    )
}

export default Card