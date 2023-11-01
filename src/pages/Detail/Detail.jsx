import React, { useEffect, useState } from 'react'
import "./Detail.css"
import { IoArrowBackOutline } from "react-icons/io5"
import { Link, useParams, useNavigate, Outlet } from "react-router-dom"
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti"
import { BiSolidCar } from "react-icons/bi"
import { AiOutlineRight } from "react-icons/ai"
import { MdHeadsetMic } from "react-icons/md"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setDay, setEmptyExt, setExPrice, setSumPrice } from '../../control/rentSlice'

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sumPrice, exPrice } = useSelector(store => store.rent)

    const finalPrice = (Number)(sumPrice) + (Number)(exPrice);



    const [car, setCar] = useState({
        car: {},
        loadCar: false
    })

    const { pickUpDate, dropOffDate } = useSelector(store => {
        return {
            pickUpDate: new Date(store.rent.pickUpDate),
            dropOffDate: new Date(store.rent.dropOffDate)
        }
    })


    var day = Math.ceil((dropOffDate - pickUpDate) / 86400000)

    var data = null;
    useEffect(() => {
        const getCar = async () => {
            data = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Cars/${id}`)
            setCar(prev => { return { ...prev, car: data.data, loadCar: true } })
            dispatch(setSumPrice(data.data.priceDaily * day))
            dispatch(setDay(day))
        }
        getCar();
        dispatch(setExPrice())
        dispatch(setEmptyExt())
    }, [])

    // useEffect(()=>{
    //     var review = car.reviews.find(x => x.user.username = username)
    //     if (review) {
    //         setUserCommnet(true)
    //     }
    // },[username,car.car])
    var options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };


    return (
        <div>
            <div className="top-detail">
                <div onClick={() => { navigate(-1) }} className="go-back-btn">
                    <span style={{ marginRight: "10px", paddingRight: "10px", borderRight: "1px solid #9b9b9b" }}>Back</span>
                    <IoArrowBackOutline style={{ fontSize: "20px" }} />
                </div>
            </div>
            <Link to={`/detail/${id}/rentinfo`}  class=" fixed-res-btn"><div class="fixed-res-btn--left"><span class="display-switch ">Click for details</span><span class="display-price">{finalPrice.toFixed(2)} $</span></div><div class="fixed-res-btn--right"><span style={{fontSize:"16px"}}>Keep going!</span><i class="icon-btn-arrow-right-2"></i></div></Link>
            <div className="my-container" style={{ margin: "100px auto" }}>
                <div className="road">
                    <div>
                        <span className='road-number'>1</span>
                        <span className='road-name' style={{ color: "#434444", fontSize: "18px", fontWeight: "700", marginLeft: "10px" }}>Vehicle Selection</span>
                    </div>
                    <div className='wizard-dot'>
                        <span className='line' />
                    </div>
                    <div>
                        <span className='road-number passive'>2</span>
                        <span className='road-name' style={{ color: "#979797", fontSize: "18px", fontWeight: "700", marginLeft: "10px" }}>Driver Information</span>
                    </div>
                    <div className='wizard-dot'>
                        <span className='line' />
                    </div>
                    <div>
                        <span className='road-number passive'>3</span>
                        <span className='road-name' style={{ color: "#979797", fontSize: "18px", fontWeight: "700", marginLeft: "10px" }}>Payment Information</span>
                    </div>
                </div>
                <div className="route-path text-start mt-3 ps-3">
                    <Link to="/">Home Page</Link>
                    <span className='ms-3 me-1'>/</span>
                    <span>Rent a Car</span>
                    <span className='ms-3 me-1'>/</span>
                    <Link to="/office/5">Barcelona Airport</Link>
                    <span className='ms-3 me-1'>/</span>
                    {
                        car.loadCar ? <Link to={`/detail/${id}`}>{car.car.name}</Link> : null
                    }
                </div>
                <div className="row mt-3">
                    <Outlet car={car} />
                    <div className='col-lg-4'>
                        <div className="detail-sidebar">
                            {
                                car.loadCar ?
                                    <div className="price-date">
                                        <div className="header">
                                            <div className="price">
                                                <p style={{ color: "#9b9b9b", fontSize: "14px", textAlign: "start", marginBottom: "0" }}>{day} Daily price:</p>
                                                <p style={{ textAlign: "start", color: "#4a4a4a", fontWeight: "700", fontSize: "32px", marginBottom: "0" }}>{(car.car.priceDaily * day).toFixed(2)} $</p>
                                                <p style={{ textAlign: "start", color: "#2ecc71", fontWeight: "400", fontSize: "14px", marginBottom: "10px" }}>Daily price:{car.car.priceDaily} $</p>
                                            </div>
                                        </div>
                                        <div className="pick-up-info">
                                            <div className="left" style={{ width: '50px', height: "50px" }}>
                                                <TiArrowDownThick style={{ fontSize: '25px', color: "#008dd4", position: "absolute", top: "0", left: "-6px" }} />
                                                <BiSolidCar style={{ fontSize: '30px', marginTop: "5px", color: "#888", opacity: "0.35", top: "0", position: "absolute", left: "3px" }} />
                                            </div>
                                            <div className="right d-flex justify-content-start">
                                                <div style={{ width: "50px" }}>
                                                    <p style={{ maxWidth: "50px", textAlign: "start", fontSize: "12px", fontWeight: "700", color: "#008dd4" }}>Pick-Up Date</p>
                                                </div>
                                                <div className='ms-3'>
                                                    <p style={{ marginBottom: "0", textAlign: "start", color: "#9b9b9b", fontSize: "13px", fontWeight: "600" }}>{car.car.office.name}</p>
                                                    <p style={{ marginBottom: "0", textAlign: "start", color: "#008dd4", fontWeight: "700", fontSize: "14px" }}>{pickUpDate.toLocaleDateString('tr-TR', options)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="drop-off-info">
                                            <div className="left" style={{ width: '50px', height: "50px" }}>
                                                <TiArrowUpThick style={{ fontSize: '25px', color: "#ffa900", position: "absolute", top: "0", left: "-6px" }} />
                                                <BiSolidCar style={{ fontSize: '30px', marginTop: "5px", color: "#888", opacity: "0.35", top: "0", position: "absolute", left: "3px" }} />
                                            </div>
                                            <div className="right d-flex justify-content-start">
                                                <div style={{ width: "50px" }}>
                                                    <p style={{ maxWidth: "50px", textAlign: "start", fontSize: "12px", fontWeight: "700", color: "#ffa900" }}>Drop-Off Date</p>
                                                </div>
                                                <div className='ms-3'>
                                                    <p style={{ marginBottom: "0", textAlign: "start", color: "#9b9b9b", fontSize: "13px", fontWeight: "600" }}>{car.car.office.name}</p>
                                                    <p style={{ marginBottom: "0", textAlign: "start", color: "#ffa900", fontWeight: "700", fontSize: "14px" }}>{dropOffDate.toLocaleDateString('tr-TR', options)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ backgroundColor: "#e8f5fa", padding: "13px 20px 13px 20px", border: "1px solid #b5ddef" }}>
                                            <p style={{ marginBottom: "0", textAlign: "start", color: "#008dd4", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "space-between" }}>Your card will be charged:
                                                <span style={{ color: "#4a4a4a", fontSize: "18px", marginLeft: "5px" }}>{finalPrice.toFixed(2)} $</span></p>
                                        </div>
                                        <div style={{ padding: "13px 20px 13px 20px", border: "1px solid #b5ddef", borderTop: "none" }}>
                                            <p style={{ marginBottom: "0", textAlign: "start", color: "#008dd4", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "space-between" }}>Amount due at pickup:
                                                <span style={{ color: "#4a4a4a", fontSize: "18px", marginLeft: "20px" }}>{exPrice.toFixed(2)} $</span></p>
                                        </div>
                                        <div style={{ padding: "13px 20px 13px 20px", border: "1px solid #b5ddef", borderTop: "none" }}>
                                            <p style={{ marginBottom: "0", textAlign: "start", color: "#008dd4", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "space-between" }}>Total Amount:
                                                <span style={{ color: "#4a4a4a", fontSize: "18px", marginLeft: "20px" }}>{sumPrice.toFixed(2)} $</span></p>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span style={{ color: "#2ecc71", fontSize: "12px", marginLeft: "30px", fontWeight: "500" }}>
                                                    Daily price :{car.car.priceDaily} $
                                                </span>
                                                <span style={{ fontSize: "12px", fontWeight: "500", color: "#9b9b9b" }}>
                                                    Price for {day} days
                                                </span>
                                            </div>
                                        </div>
                                        <div className="keep-go-btn">
                                            <Link to={`/detail/${id}/rentinfo`}>
                                                Keep going!
                                            </Link>
                                            <AiOutlineRight />
                                        </div>

                                    </div> : null

                            }
                            <div className="row mt-4">
                                <div className="col-3 ">
                                    <img style={{ width: "88px" }} src="	https://staticf.yolcu360.com/static/image/money-back@2x.png" alt="" />
                                </div>
                                <div className="col-9 ps-4">
                                    <p className='text-start' style={{ marginBottom: "0", marginTop: "5px", paddingBottom: "8px", fontSize: "14px", color: "#758493", borderBottom: "1px solid #e9e9e9" }}>Installment Options</p>
                                    <p className='text-start' style={{ marginBottom: "0", fontSize: "14px", color: "#758493", paddingTop: "5px" }}>We offer a 100% money-back guarantee</p>
                                </div>
                                <div className="detail-call-center">
                                    <MdHeadsetMic style={{ color: "#ffa900", fontSize: "60px" }} />
                                    <div className='ps-4'>
                                        <p style={{ fontWeight: "700", color: "#2169aa", fontSize: "20px", marginBottom: "0", marginTop: "5px" }}>DO YOU NEED HELP?</p>
                                        <p style={{ fontWeight: "700", color: "#ffa900", fontSize: "24px", textAlign: "start", marginBottom: "0" }}>+1 888 774 7471</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail