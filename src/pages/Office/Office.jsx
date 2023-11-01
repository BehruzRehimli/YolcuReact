import React, { useState, useCallback, useRef, useEffect, Component } from 'react'
import "./Office.css"
import { Link, useParams } from 'react-router-dom'
import WhyYolcu from '../../components/WhyYolcu/WhyYolcu'
import Portniors from '../../components/Slider/Portniors/Portniors'
import MobilApp from '../../components/MobilApp/MobilApp'
import { Calendar } from '@natscale/react-calendar'
import { MdLocationOn, MdOutlineToday, MdClose } from 'react-icons/md'
import { FaCalendarAlt } from 'react-icons/fa'
import { RiCalendarTodoFill } from 'react-icons/ri'
import { BiSolidChevronRight } from 'react-icons/bi'
import axios from "axios"

const Office = () => {
  const { id } = useParams();

  const [office, setOffice] = useState(new Object());
  const [loadOffice, setLoadOffice] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [openStartDate, setOpenStartDate] = useState(false);
  const [rentalTime, setRentalTime] = useState(true);
  const startRef = useRef();
  const startDateTab = useRef();
  const [dropLoc, setDropLoc] = useState(false)
  const [endDate, setEndDate] = useState(new Date());
  const [openEndDate, setOpenEndDate] = useState(false);
  const endRef = useRef();
  const endDateTab = useRef();


  const StartDateHandler = useCallback(
    (val) => {
      setStartDate(val);
    },
    [setStartDate],
  );
  const EndDateHandler = useCallback(
    (val) => {
      setEndDate(val);
    },
    [setEndDate],
  );

  const compClick = function (e) {
    if (!startRef.current.contains(e.target) && !startDateTab.current.contains(e.target)) {
      setOpenStartDate(false)
    }
    if (!endRef.current.contains(e.target) && !endDateTab.current.contains(e.target)) {
      setOpenEndDate(false)
    }
  }

  useEffect(() => {
    const getoffice = async () => {
      try {
        window.scrollTo(0, 0);
        const response = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Offices/${id}`);
        setOffice(response.data);
        setLoadOffice(true);

      } catch (error) {
        console.error("Hata:", error);
      }
    }

    getoffice()
  }, [id]);
  useEffect(() => {
    document.addEventListener('click', compClick);

    return () => {
      document.removeEventListener('click', compClick);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginBottom: "50px" }}>
      <div className='top-office d-flex justify-content-center'>
        <div className="my-container">
          <span className='office-name'> {office.name + " Rent a Car"}</span>
          <div className='head-page'>
            <Link>Rent a Car</Link>
            <span>{">"}</span>
            <span >{office.name + " Rent a Car"}</span>
          </div>
        </div>
      </div>
      <div className='searcing' style={{backgroundColor:"#dee3e8",padding:"40px 0"}}>
        <div className="my-container" style={{ borderColor: "#dee3e8", margin: "0px auto" }}>
          <div className="my-container" style={{ margin: "0 auto" }}>
            <div className="row">
              <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-xs-12" style={{ position: "relative" }}>
                <div className='rental-time'>
                  <div onClick={() => { setRentalTime(true) }} className={rentalTime ? "daily-rental active" : "daily-rental"}> <MdOutlineToday /><span>Daily Rental</span></div>
                  <div onClick={() => { setRentalTime(false) }} className={rentalTime ? "daily-rental montly" : "daily-rental active montly"}><FaCalendarAlt style={{ fontSize: "16px" }} /><span>Monthly Rental</span></div>
                </div>
                <div className='main-input-div'>
                  <div className="main-input-icon"> <MdLocationOn style={{ color: "#888888", fontSize: "26px" }} /></div>
                  <input className='main-input' type="text" placeholder='Pick-Up Information' />
                </div>

                {
                  dropLoc ?
                    <div className="different-drop main-input-div">
                      <div className="main-input-icon"> <MdLocationOn style={{ color: "#888888", fontSize: "26px" }} /></div>
                      <input className='main-input' type="text" placeholder='Drop-Off Information' />
                      <button onClick={() => { setDropLoc(false) }}><MdClose style={{ color: '#cecece' }} /></button>
                    </div> :
                    <div className='dif-drop-btn' onClick={() => { setDropLoc(true) }}>
                      <span className='checkbox'></span>
                      <span>Different Drop Off Location?</span>
                    </div>
                }
              </div>
              <div className="col-xl-4 col-lg-4 col-sm-12 col-md-12 col-xs-12">
                <div className="picker-div">
                  <div onClick={() => { setOpenStartDate(true) }} className="picker-left" ref={startDateTab}>
                    <RiCalendarTodoFill style={{ color: '#888888', opacity: "0.37", fontSize: "20px" }} />
                    <span className='ms-2'>Pick-Up-Date</span>
                    <div className="calendar-div start" ref={startRef}>
                      {
                        openStartDate ?
                          <Calendar showDualCalendar isRangeSelector value={startDate} onChange={StartDateHandler} /> : null
                      }
                    </div>
                  </div>
                  <div className='picker-line'></div>
                  <div onClick={() => { setOpenEndDate(true) }} className="picker-right" ref={endDateTab}>
                    <RiCalendarTodoFill style={{ color: '#888888', opacity: "0.37", fontSize: "20px" }} />
                    <span className='ms-2'>Drop-Off-Date</span>
                    <div className="calendar-div end" ref={endRef}>
                      {
                        openEndDate ?
                          <Calendar showDualCalendar isRangeSelector value={endDate} onChange={EndDateHandler} /> : null
                      }
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-sm-12 col-md-12 col-xs-12" >
                <div className="find-btn">
                  <span>Find the Best Price</span>
                  <BiSolidChevronRight />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div className="my-container" style={{ margin: "0 auto" }}>
        {
          loadOffice ? office.city.aboutCities.map(x => {
            return <div key={x.id}>
              {x.title !== null ? <h2 style={{ textAlign: "left", fontWeight: "bolder" }}>{x.title}</h2> : null} <p style={{ textAlign: "left" }}>{x.desc}</p>
              <div style={{ textAlign: 'left', marginBottom: "30px" }}>
                {x.imageName !== null ? <img src={x.imageName} alt='picture' /> : null}
              </div>
            </div>
          }) : null
        }
        <WhyYolcu />
      </div>
      <div className="partners" style={{ marginTop: "50px" }}>
        <div className="my-container" style={{ margin: "0 auto", paddingTop: "0" }}>
          <h3 style={{ textAlign: "left", marginBottom: "50px" }} className='heading'>Our Partners</h3>
          <Portniors />
        </div>
      </div>
      <MobilApp />
    </div>
  )
}

export default Office