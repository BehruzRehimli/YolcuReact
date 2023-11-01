import React from 'react'
import "./MobilApp.css"

const MobilApp = () => {
  return (
    <div>
        <div className="my-container" style={{margin:"0 auto"}}>
            <div className='mobil-app'>
                <div className="mobil-app-content">
                    <div className="logo">
                        <img src="https://staticf.yolcu360.com/static/image/Yolcu360_App_logo.png" alt="" />
                    </div>
                    <div>
                        <p className="title">Download Our Mobile App</p>
                        <p className="desc">Download our mobile application to your smart device to quickly and easily rent a car at the best prices. Join our hundreds of thousands of happy customers!</p>
                    </div>
                </div>
                <div className="mobil-app-links">
                    <a href="https://itunes.apple.com/app/yolcu360-ara%C3%A7-kiralama/id1331933613?l=tr&mt=8" className="apple">
                        <img style={{width:"140px"}} src="https://staticf.yolcu360.com/static/image/app-store-en.png" alt="apple" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.yolcu360" className="android">
                        <img style={{width:"140px"}} src="https://staticf.yolcu360.com/static/image/google-play-en.png" alt="android" />
                        </a>
                        <a href="https://appgallery.huawei.com/#/app/C102881793" className="appgalary">
                        <img style={{width:"140px"}} src="https://staticf.yolcu360.com/static/image/huawei-app-gallery-en.png" alt="appgalary" />
                        </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MobilApp