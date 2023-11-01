import React, { useState, useCallback, useRef, useEffect, Component } from 'react'
import "./Home.css"
import { FaChevronRight, FaCalendarAlt } from "react-icons/fa"
import { MdLocationOn, MdOutlineToday, MdClose } from "react-icons/md"
import { PiCopyBold } from "react-icons/pi";
import { RiCalendarTodoFill } from "react-icons/ri"
import { BiSolidChevronRight } from "react-icons/bi"
import Slider from '../../components/Slider/Slider'
import { Calendar } from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';
import axios from "axios"
import WhyYolcu from '../../components/WhyYolcu/WhyYolcu'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { setPickUpDate, setDropOffDate, setPickUpLoc, setDropOffLoc, setWrongChose } from "../../control/rentSlice"
import { RotateLoader } from 'react-spinners';




const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [openStartDate, setOpenStartDate] = useState(false);
  const [hiddenDiv, setHiddenDiv] = useState(true)
  const [rentalTime, setRentalTime] = useState(true);
  const startRef = useRef();
  const startDateTab = useRef();
  const [dropLoc, setDropLoc] = useState(false)
  const [popularCities, setPopularCities] = useState([])
  const [loadPopular, setLoadPopular] = useState(false)
  const [loadSliderCity, setLoadSliderCity] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [searchOffice, setSearchOffice] = useState([])
  const [loadSearchData, setLoadSearchData] = useState(false)
  const [choosenOfficeId, setChoosenOfficeId] = useState(0)

  const [endDate, setEndDate] = useState(new Date());
  const [openEndDate, setOpenEndDate] = useState(false);
  const endRef = useRef();
  const endDateTab = useRef();
  const OfficeOption = useRef();

  const dispatch = useDispatch();



  const StartDateHandler = useCallback(
    (val) => {
      setStartDate(val);
      dispatch(setPickUpDate((new Date(val[0])).toISOString()))
    },
    [setStartDate],
  );
  const EndDateHandler = useCallback(
    (val) => {
      setEndDate(val);
      dispatch(setDropOffDate((new Date(val[0])).toISOString()))
    },
    [setEndDate],
  );
  const HiddenDivHandler = function () {
    setHiddenDiv(!hiddenDiv)
  }
  const SearchHandler = async (e) => {
    setSearchInput(e.target.value);
  }

  useEffect((e) => {
    const searching = async () => {
      if (searchInput.length > 0) {
        const data = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Offices/Search/${searchInput}`)
        setSearchOffice(data.data)
      }
    }
    if (searchInput.length > 0) {
      setLoadSearchData(true)
    }
    else {
      setLoadSearchData(false)
    }
    if (choosenOfficeId > 0) {
      setLoadSearchData(false)
    }
    searching()
  }, [searchInput]);


  const { wrongChose } = useSelector(store => store.rent)

  useEffect(() => {
    if (wrongChose > 0) {
      toast.error("Wrong Choice!")
      dispatch(setWrongChose())
    }
  }, [wrongChose])

  const [sliderCities, setSliderCities] = useState([])

  const compClick = function (e) {
    if (!startRef.current.contains(e.target) && !startDateTab.current.contains(e.target)) {
      setOpenStartDate(false)
    }
    if (!endRef.current.contains(e.target) && !endDateTab.current.contains(e.target)) {
      setOpenEndDate(false)
    }
  }
  const ChooseOfficeHandler = (e) => {
    setChoosenOfficeId(e.currentTarget.id);
    dispatch(setPickUpLoc(e.currentTarget.id))
  }


  useEffect(() => {
    const getOffice = async () => {
      if (choosenOfficeId > 0) {
        try {
          const data = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Offices/${choosenOfficeId}`)
          setSearchInput(data.data.name);
        } catch (error) {

        }
      }
    }
    getOffice()
  }, [choosenOfficeId])


  useEffect(() => {
    const getSliderCities = async () => {
      const cities = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Cities/homeSlider");
      setSliderCities(cities.data)
      setLoadSliderCity(true)
    }
    const getPopularCities = async () => {
      const cities = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Offices/HomePopular");
      setPopularCities(cities.data)
      setLoadPopular(true)
    }
    getSliderCities();
    getPopularCities();
  }, []);

  useEffect(() => {
    document.addEventListener('click', compClick);

    return () => {
      document.removeEventListener('click', compClick);
    };
  }, []);

  useEffect(() => {
    setOpenStartDate(false)
  }, [startDate]);

  useEffect(() => {
    setOpenEndDate(false)
  }, [endDate]);
  return (
    <div >
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#ffa900',
            color: '#fff',
            marginTop: "70px"
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <section className='top-content-home d-flex justify-content-center align-item-center pt-5'>
        <div className="my-container mt-2">
          {
            loadSliderCity ?
              <Slider cities={sliderCities} /> : null

          }
          <h1 >Easy car rental!</h1>
          <p className='slider-desc'><b>Compare</b> and rent your ideal car at <b>the best prices</b>, worldwide!</p>
          <div className="row">
            <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-xs-12" style={{ position: "relative" }}>
              <div className='rental-time'>
                <div onClick={() => { setRentalTime(true) }} className={rentalTime ? "daily-rental active" : "daily-rental"}> <MdOutlineToday /><span>Daily Rental</span></div>
                <div onClick={() => { setRentalTime(false) }} className={rentalTime ? "daily-rental montly" : "daily-rental active montly"}><FaCalendarAlt style={{ fontSize: "16px" }} /><span>Monthly Rental</span></div>
              </div>
              <div className='main-input-div'>
                <div className="main-input-icon"> <MdLocationOn style={{ color: "#888888", fontSize: "26px" }} /></div>
                <input onChange={SearchHandler} value={searchInput} className='main-input' type="text" placeholder='Pick-Up Information' />
                {
                  loadSearchData ? <div className='search-result'>
                    {searchOffice.map(x => {
                      return <li onClick={ChooseOfficeHandler} id={x.id} className='search-li' key={x.id} ref={OfficeOption}>
                        <MdLocationOn style={{ color: "#888888", opacity: "0.5", fontSize: "24px", marginLeft: "15px", marginRight: "15px" }} />
                        <p style={{ color: "#888888", fontSize: "14px" }} >{x.name}</p>
                      </li>
                    })}
                  </div> : null
                }

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
              <Link to={choosenOfficeId > 0 ? `/cars/${choosenOfficeId}` : '/'} className="find-btn">
                <span>Find the Best Price</span>
                <BiSolidChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="my-container mx-auto">
        <section className='mt-3'>
          <h3 style={{ textAlign: "left" }} className='heading'>Popular Locations</h3>
          <div className="row mt-1 g-4">

            {
              loadPopular ? popularCities.slice(0, 4).map(x => {
                return <div key={x.id} style={{ padding: "0 15px" }} className="col-lg-4 col-md-6 col-xs-12"><Link to={`/office/${x.id}`}>
                  <div className="location">
                    <img src={x.city.imageName} alt="location" />
                    <span className='location-tag'>AIRPORT</span>
                    <div className='content'>
                      <p className="city">{x.city.country.name.toUpperCase()}</p>
                      <p className="location-name ps-4">{x.name.toUpperCase()}</p>
                      <div className="rent-btn">RENT NOW <FaChevronRight /></div>
                    </div>
                  </div></Link>

                </div>
              })

                : <div className='d-flex justify-content-center align-items-center' style={{padding:"20px 0"}}>

                  <RotateLoader
                    color="#ffa900"
                    margin={15}
                    size={25}
                    speedMultiplier={1}

                  />
                </div>

            }
            {
              loadPopular ?
                <div style={{ padding: "0 15px" }} className="col-lg-8 col-md-12 col-xs-12">
                  <div className="location">
                    <img src={popularCities[4].city.imageName} alt="location" />
                    <span className='location-tag'>City Center</span>
                    <div className='content'>
                      <p className="city">{popularCities[4].city.country.name.toUpperCase()}</p>
                      <p className="location-name ps-4">{popularCities[4].name.toUpperCase()}</p>
                      <div className="rent-btn">RENT NOW <FaChevronRight /></div>
                    </div>
                  </div>

                </div> : null
            }

          </div>
        </section>
        <WhyYolcu />
        <section className='mt-5'>
          <h1 className='rental-header' >Car Rental (Rent a Car)</h1>
          <p className="rental-text">
            Car rental or rent a car service, has become an increasingly important need for both individuals and institutions. Rent a car companies are expanding their fleets day by day to meet the requirements. So, where to look for the best car rental prices? Whether it's a daily car rental or a monthly car rental or car hire with a driver, as Yolcu360, we bring the best car rental prices to your screen.
          </p>
          <p className="rental-text">
            Many people are looking for travel opportunities today by using mobile applications. At this point, there are some websites that collect travel opportunities by using software robots.These sites create search results using search engines like Google and robots.          </p>
          <p className="rental-text">
            Robots are generally useful software, but some websites only create lists through humans. These websites cannot offer you the best results.          </p>          <p className="rental-text">
          </p>
          <p className="rental-text">
            It's very to make a choice among the services offered by many local and global brands. In addition, it can be very troublesome to research which brand or office offers the most affordable car rental alternative. With the idea of serving this purpose, Yolcu360.com focuses on finding what the user is looking for quickly and effortlessly with the rental car comparison system it offers with a systematic and safe structure.          </p>
          <p className="rental-text">
            It's too easy to find a rental car with Yolcu360! Yolcu360 offers a solution for your rental car needs with a structure where you can compare rent a car prices. We use smart software for the best car rental prices and put your happiness above everything.          </p>
          <p className="rental-text">
            We are ready to support you in the concept of rent a car near me, from your airport rent a car requests to your monthly car hire needs. All you need to do is to use Yolcu360 to rent the car of your choice via any smart device.          </p>
          <p className="rental-text">
            Thanks to the Yolcu360 filtering system, you can shape your searches according to your needs. Enter your location, choose where you want to pick up your vehicle and you're done! You can complete your reservation process in less than 1 minute.          </p>

          <div style={hiddenDiv ? { display: "none" } : { display: "block" }} className="hidden">
            <h2>What Does Car Rental Service Cover?</h2>
            <p className="rental-text">
              With its more common name, rent a car service is classified by time as standard all over the world. The most common of these is the daily car hire process. There are also service types such as long-term car hire, fleet car hire, premium car hire, car rental with driver, rental from the airport.
            </p>
            <p className="rental-text">
              It is also possible to rent annually. By choosing one of these service types, you will get your car that you will use for as long as you want.
            </p>
            <p className="rental-text">
              The most common type of rent a car is the daily car hire concept. By choosing among the available cars offered by the rent a car brand during the daily car rental process; you will pick up your clean and well-maintained car on the reservation date. At the end of the rental process, you will deliver the car to the specified rental office on the date you specified in advance. In some service packages, the car can be brought to you by the company representative and picked up by the company representative from the place you determine.
            </p>
            <h2>Why Rent a Car is Advantageous?</h2>
            <p className="rental-text">
              Renting a car may often be more profitable than buying a car. The reason for this is that when determining rental car prices, this figure includes items such as maintenance of the vehicle, cleaning, providing expenses for a possible breakdown or damage, quick replacement with an equivalent car, tax, periodic maintenance, insurance. In addition, you will save time that not having to deal with these processes on an individual or company basis.
            </p>
            <p className="rental-text">
              In addition, for the concept of fleet car hire, company fleets usually have car that are 2-3 years old and often have low mileage. This gives the user the comfort and prestige of using a new model and equipped car. It can be extremely advantageous to use a vehicle that does not have tax, maintenance, insurance and damage costs, especially for the individual user who does not need a vehicle every day and who needs a car on holidays and special days. The idea of hire a car will be the best solution for your requirements.
            </p>
            <p className="rental-text">
              The similar situation is true for companies and institutions in the long-term car hire process. Thanks to Yolcu360, which provides you with cheap car rental opportunities, you can benefit from the most suitable rental car advantages. For information on car rental prices, you can call Yolcu360's Customer Satisfaction Center, which provides 24/7 support. Finding car hire prices on Yolcu360 will be so easy for you!
            </p>
            <p className="rental-text">
              You can now review Yolcu360 listings for the most affordable car renting options.
            </p>
            <h2>
              How to Compare the Most Affordable Car Rental?
            </h2>
            <p className="rental-text">
              The rental car comparison is very simple with Yolcu360. You can log in to the system from all your smart devices with the user-friendly website or mobile application of Yolcu360. So, you can easily compare and contrast rental car alternatives.
            </p>
            <p className="rental-text">
              First of all, Yolcu360 will ask you at what dates and times and from which location you have a rental car request. After entering required information, you will see the offers of the most reliable agencies in Turkey and the world together.
            </p>
            <p className="rental-text">
              The best car rental companies and the best car hiring prices are always with you on Yolcu360. You can filter your preference according to the technical characteristics of the car while comparing available cars. You can choose a car with manual or automatic transmission, diesel or gasoline. You can also view it under the economic, middle and upper segments.
            </p>
            <p className="rental-text">
              Considering car hire prices and performance-oriented results when making comparisons between agencies will be advantageous for you. You can easily find offers on the panel of Yolcu360 for cheap car rental. You can also choose from premium car hire alternatives for special occasions and prestigious meetings. Automobile rental companies that offer luxury car rental services come to you in less than 1 minute.
            </p>
            <p className="rental-text">
              You choose from car rental prices listed according to your needs. Your ideal car will be delivered to you safely at the point you want through a rental car company. Yolcu360 also displays information about the rental conditions and insurance coverage of the car you will rent. Today, Yolcu360 is the best way to find the affordable rent a car near me company.
            </p>
            <h2>The History of Rental Cars</h2>
            <p className='rental-text'>
              After the Second World War, the idea of renting a car was born in America to provide services for businessmen from different countries of the world. Then, car hiring companies started to be established one by one in Europe. The brands, which provide a pleasant and stress-free driving experience to the user by purchasing a series of cars and undertaking all the maintenance and repair costs of them, have also created a competitive environment that focuses on service quality and car fleet over time.
            </p>
            <p className="rental-text">
              Car rental service moved to airports, which became very common in a short time, and the concept of airport renting a car was born. Today, the car rental service offered by some international brands with its worldwide office network aims to make business trips, family and relatives visits, vacations or touristic trips more comfortable and enjoyable.
            </p>
            <p className="rental-text">
              With the increase in airport usage, airport hiring a car has become a trend. Nowadays, you can find a rental car office at every airport.
            </p>
            <h2>Conditions of Rent a Car</h2>
            <p className="rental-text">
              When you have rent a car service, you will be subject to certain conditions. These conditions vary from supplier to supplier. Some companies specialize in daily car rental services, while others specialize in long-term car rental services. At this point, it is important to examine the conditions of the company you will rent previously.
            </p>
            <p className="rental-text">
              What should be considered while searching for the cheapest car rental? Of course you will find them here. Because the better you know the conditions, the more confident you will be about your rights.
            </p>
            <p className="rental-text">
              At this point, we are always ready to support you. Your happiness is important to us, you may call to our customer satisfaction center for any problem you have about the conditions.
            </p>
            <h2>Why is Car Rental Preferred?</h2>
            <p className="rental-text">
              The number of rental cars in traffic is increasing day by day. The most important factor in this is that it is getting harder to buy a car. During the car purchasing, when insurance, motor insurance and taxes are also taken into account, creates more serious expenses than the purchase cost. Therefore, rental cars are the most practical solution for short and long-term car needs.
            </p>
            <p className="rental-text">
              Some people don't need a car in their daily life. These people create solutions with rental cars when they need a car. Using a rental car saves you from costs such as taxes, insurance, and motor insurance. It also allows you to use cars in the segment where your financial means are not enough at the purchasing stage.
            </p>
            <p className="rental-text">
              The most suitable car rental brand is Yolcu360, which provides rent a car services near me in Turkey and around the world. Moreover, after renting your car, we are with you whenever you need it. Thank you, Yolcu360's Customer Satisfaction Center that provides support for 24/7!
            </p>
            <p className="rental-text">
              We answer your demand for the best car rental website. With more than 4000 rental car agencies, we bring you the best car rental prices. If you're happy, we're happy too!
            </p>
            <p className="rental-text">
              You can visit Yolcu360 Labs to meet our team now.
            </p>
            <h2>Car Rental Prices</h2>
            <p className="rental-text">
              Car rental prices vary according to the car type and car model. In daily rentals, the prices are mostly determined by the models. While luxury rental car prices determine the peak, the price gets cheaper as the brand and model year decreases. If you want to buy cheap car rental, you need to follow the campaigns while choosing low models.
            </p>
            <p className="rental-text">
              The most important detail is to research the prices for the concept of monthly car hire. At this point, you can come across companies that offer very good prices for hire a car alternatives. But before choosing your company, make sure to research about the company. Remember, sometimes cheap options can cost a lot more.
            </p>
            <p className="rental-text">
              It is necessary to make a price comparison for the cheapest rent a car. This is where Yolcu360 will play an important role. We bring the best prices of our suppliers to your screen, thanks to the robotic software that we use, which performs advanced data analytics.
            </p>
            <h2>How Advantageous is Renting a Car?</h2>
            <p className="rental-text">
              Rental cars have many advantages. First of all, avoiding from maintenance and tax costs are great advantages. Moreover, the advantages are not only individual, but also communal. According to a study by Deloitte, realizing our traffic ecosystem with shared car will reduce costs by 70%.
            </p>
            <p className="rental-text">
              We have examined this issue in detail in one of our articles. If you are wondering, you can continue our blog post on rental benefits.
            </p>
          </div>
          <div onClick={HiddenDivHandler} style={hiddenDiv ? { display: "block" } : { display: "none" }} className='text-start hidden-btn' >
            <PiCopyBold color='#bbbbbb' style={{ marginRight: "8px" }} /> More...
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home