import React from 'react'
import {MdLocalOffer,MdHeadsetMic} from "react-icons/md"
import {BiSolidCar} from "react-icons/bi"


const WhyYolcu = () => {
  return (
    <section className='mt-5'>
    <h3 style={{textAlign:"left"}} className='heading'>Why rent with Yolcu360?</h3>
    <div className="row mt-5 g-4">
      <div className="col-lg-4 col-md-12">
        <div className="home-box">
          <div className="icon-outside">
            <div className="icon-middle">
              <MdLocalOffer className='icon-center'/>
            </div>
          </div>
          <div className="box-title">
          +250K Cars and +30.000 Locations Worldwide  
          </div>
          <div className="box-desc">
          Yolcu360 makes car rental super easy by letting you rent a car in under a minute. More than 300.000 cars in 6.000+ locations are readily available.
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-12">
        <div className="home-box">
          <div className="icon-outside">
            <div className="icon-middle">
              <BiSolidCar style={{fontSize:"40px"}} className='icon-center'/>
            </div>
          </div>
          <div className="box-title">
          Best Price Guarantee
          </div>
          <div className="box-desc">
          Best rental prices can be found easily in the economy, luxury, and family segments in more than 6.000 locations.                </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-12">
        <div className="home-box">
          <div className="icon-outside">
            <div className="icon-middle">
              <MdHeadsetMic className='icon-center'/>
            </div>
          </div>
          <div className="box-title">
          Award-Winning Customer Service
          </div>
          <div className="box-desc">
          Yolcu360 is the only customer-obsessed company in the car rental industry. Our 24/7 and instantly accessible call center is always with our customers, providing them with a hassle-free experience.                </div>
        </div>
      </div>
    </div>

  </section>

  )
}

export default WhyYolcu