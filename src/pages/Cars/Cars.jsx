import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import "./Cars.css"
import { FaAngleRight, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { PiArrowsDownUpBold } from "react-icons/pi"
import { BsCheck, BsFillFuelPumpFill, BsFillCarFrontFill } from "react-icons/bs"
import { BiInfoCircle } from "react-icons/bi"
import { GiGearStick } from 'react-icons/gi'
import { BiSolidStar, BiSolidStarHalf } from 'react-icons/bi'
import ReactSlider from 'react-slider'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {AiOutlineStar} from "react-icons/ai"


const Cars = () => {
    const { id } = useParams();
    const [cars, setCars] = useState({
        cars: [],
        displayedCars: [],
        visibleCarsCount: 0,
        firstScrollLoad: false,
        loadCars: false,
        office: {},
        loadOffice: false,
        loadBrand: null,
        brands: [],
        loadModel: false,
        models: [],
        loadType: false,
        types: [],
        loadTrans: false,
        trans: [],
        loadFuel: false,
        fuels: [],
    });

    const { pickUpDate, dropOffDate } = useSelector(store => store.rent)

    var countvisiblecars = 0

    const [mainCars, setMainCars] = useState([])

    const [tabs, setTabs] = useState({
        transmission: true,
        fuel: true,
        brand: true,
        model: true,
        type: true,
        sort: false,
        price: true,
        millage: true,
        deposit: true,
        maxPrice: 1500,
        minPrice: 0,
        maxMillage: 3000,
        minMillage: 0,
        maxDeposit: 1500,
        minDeposit: 0
    })


    const [filters, setFilters] = useState({
        transmission: [],
        fuel: [],
        brand: [],
        model: [],
        type: [],
        price: [],
        millage: [],
        deposit: [],
        sort: 0
    })

    var trasIds = [...filters.transmission]
    var fuelIds = [...filters.fuel]
    var brandIds = [...filters.brand]
    var modelIds = [...filters.model]
    var typeIds = [...filters.type]



    var fuels = [{ id: 1, name: "Diesel", count: 0 }, { id: 2, name: "Gas-Diesel", count: 0 }, { id: 3, name: "Electric", count: 0 }, { id: 4, name: "Gas", count: 0 }]
    const getFuels = () => {
        cars.cars.forEach(x => {
            if (x.fuelType === 1) {
                fuels[0].count++
            }
            else if (x.fuelType === 2) {
                fuels[1].count++
            }
            else if (x.fuelType === 3) {
                fuels[2].count++
            }
            else if (x.fuelType === 4) {
                fuels[3].count++
            }
        });
        setCars(prev => { return { ...prev, fuels: fuels, loadFuel: true } })

    }



    var trans = [{ id: 1, name: "Authomatic", count: 0 }, { id: 2, name: "Manual", count: 0 }]
    const getTrans = () => {
        cars.cars.forEach(x => {
            if (x.transmission === 1) {
                trans[0].count++
            }
            else if (x.transmission === 2) {
                trans[1].count++
            }
        });
        setCars(prev => { return { ...prev, trans: trans, loadTrans: true } })

    }

    var types = []
    const getType = () => {
        types = []
        cars.cars.forEach(x => {
            if (!types.find(b => b.name == x.type.name)) {
                types.push({ id: x.type.id, name: x.type.name, count: 1 })
            }
            else {
                var br = types.find(b => b.name == x.type.name)
                br.count++
            }
        });
        setCars(prev => { return { ...prev, types: types, loadType: true } })

    }

    var models = []
    const getModel = () => {
        models = []
        cars.cars.forEach(x => {
            if (!models.find(b => b.name == x.model.name)) {
                models.push({ id: x.model.id, name: x.model.name, count: 1 })
            }
            else {
                var br = models.find(b => b.name == x.model.name)
                br.count++
            }
        });
        setCars(prev => { return { ...prev, models: models, loadModel: true } })

    }

    var brands = []
    const brand = () => {
        brands = [];
        cars.cars.forEach(x => {
            if (!brands.find(b => b.name == x.model.brand.name)) {
                brands.push({ id: x.model.brand.id, name: x.model.brand.name, count: 1 })
            }
            else {
                var br = brands.find(b => b.name == x.model.brand.name)
                br.count++
            }
        });
        setCars(prev => { return { ...prev, brands: brands, loadBrand: true } })
    }

    useEffect(() => {

        brand();
        getModel();
        getType();
        getTrans();
        getFuels();
        countvisiblecars = 7;
        setCars(prev => { return { ...prev, displayedCars: [...prev.cars.slice(0, countvisiblecars)] } })

    }, [cars.cars])

    const handleScroll = () => {
        // Eşik değerine yaklaşıldığında yeni ürünleri yükleme
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 100 // Eşik değeri
        ) {
            loadMoreProducts();
        }
    };
    const loadMoreProducts = () => {

        // Yeni ürünleri görünen ürün sayısına ekleyerek state'i güncelleme
        countvisiblecars = countvisiblecars + 7
        setCars(prev => { return { ...prev, visibleCarsCount: cars.visibleCarsCount + 7 } });
        setCars(prev => { return { ...prev, displayedCars: [...prev.cars.slice(0, countvisiblecars)] } })

    };



    useEffect(() => {
        const getCars = async () => {

            const sentDto = {
                pickDate: new Date(pickUpDate),
                dropDate: new Date(dropOffDate),
            }
            var datasCars = await axios.post(`http://bexarehimli-001-site1.htempurl.com/api/Cars/CarsList/${id}`, sentDto, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }).then(datas => {
                var maxPrice = datas.data.reduce((max, car) => {
                    if (car.priceDaily > max) {
                        return car.priceDaily;
                    }
                    return max;
                }, 0);
                maxPrice = Math.ceil(maxPrice)
                setTabs(prev => { return { ...prev, maxPrice: maxPrice } })
                var minPrice = datas.data.reduce((min, car) => {
                    if (car.priceDaily < min) {
                        return car.priceDaily;
                    }
                    return min;
                }, Infinity);
                minPrice = Math.floor(minPrice)
                setTabs(prev => { return { ...prev, minPrice: minPrice } })


                var maxMillage = datas.data.reduce((max, car) => {
                    if (car.totalMillage > max) {
                        return car.totalMillage;
                    }
                    return max;
                }, 0);
                setTabs(prev => { return { ...prev, maxMillage: maxMillage } })
                var minMillage = datas.data.reduce((min, car) => {
                    if (car.totalMillage < min) {
                        return car.totalMillage;
                    }
                    return min;
                }, Infinity);
                setTabs(prev => { return { ...prev, minMillage: minMillage } })


                var maxDeposit = datas.data.reduce((max, car) => {
                    if (car.depozitPrice > max) {
                        return car.depozitPrice;
                    }
                    return max;
                }, 0);
                maxDeposit = Math.ceil(maxDeposit)
                setTabs(prev => { return { ...prev, maxDeposit: maxDeposit } })
                var minDeposit = datas.data.reduce((min, car) => {
                    if (car.depozitPrice < min) {
                        return car.depozitPrice;
                    }
                    return min;
                }, Infinity);
                minDeposit = Math.floor(minDeposit)
                setTabs(prev => { return { ...prev, minDeposit: minDeposit } })

                setCars(previous => { return { ...previous, cars: [...datas.data], loadCars: true, visibleCarsCount: 7, displayedCars: [...datas.data.slice(0, 7)] } })
                countvisiblecars = 7
                setMainCars([...datas.data])

            })

        }
        const getOffice = async () => {
            var data = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Offices/${id}`)
            setCars(previous => { return { ...previous, office: data.data, loadOffice: true } })
        }
        getCars();
        getOffice();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const inputTransHandler = (e) => {
        var id = e.target.value
        if (e.target.checked === true) {
            trasIds.push(e.target.value)
        }
        else {
            trasIds.pop(e.target.value)
        }
        setFilters(prev => { return { ...prev, transmission: trasIds } })
    }

    const inputFuelHandler = (e) => {
        var id = e.target.value
        if (e.target.checked === true) {
            fuelIds.push(e.target.value)
        }
        else {
            fuelIds.pop(e.target.value)
        }
        setFilters(prev => { return { ...prev, fuel: fuelIds } })
    }

    const inputBrandHandler = (e) => {
        var id = e.target.value
        if (e.target.checked === true) {
            brandIds.push(e.target.value)
        }
        else {
            brandIds.pop(e.target.value)
        }
        setFilters(prev => { return { ...prev, brand: brandIds } })
    }


    const inputModelHandler = (e) => {
        var id = e.target.value
        if (e.target.checked === true) {
            modelIds.push(e.target.value)
        }
        else {
            modelIds.pop(e.target.value)
        }
        setFilters(prev => { return { ...prev, model: modelIds } })
    }

    const inputTypeHandler = (e) => {
        var id = e.target.value
        if (e.target.checked === true) {
            typeIds.push(e.target.value)
        }
        else {
            typeIds.pop(e.target.value)
        }
        setFilters(prev => { return { ...prev, type: typeIds } })
    }


    useEffect(() => {
        let newdatas = [...mainCars]

        if (filters.sort === 0) {
            newdatas = newdatas
        }
        else if (filters.sort === 1) {
            newdatas = newdatas.sort((a, b) => Number(a.priceDaily) - Number(b.priceDaily))
        }
        else if (filters.sort === 2) {
            newdatas = newdatas.sort((a, b) => Number(b.priceDaily) - Number(a.priceDaily))
        }
        else if (filters.sort === 3) {


        }
        else if (filters.sort === 4) {
            var datas = newdatas.sort((a, b) => Number(b.reviews.length) - Number(a.reviews.length))
        }



        if (filters.transmission.length > 0) {
            newdatas = newdatas.filter(x => filters.transmission.includes(x.transmission.toString()))
        }
        if (filters.fuel.length > 0) {
            newdatas = newdatas.filter(x => filters.fuel.includes(x.fuelType.toString()))
        }

        if (filters.brand.length > 0) {
            newdatas = newdatas.filter(x => filters.brand.includes(x.model.brand.id.toString()))
        }

        if (filters.model.length > 0) {
            newdatas = newdatas.filter(x => filters.model.includes(x.model.id.toString()))
        }

        if (filters.type.length > 0) {
            newdatas = newdatas.filter(x => filters.type.includes(x.type.id.toString()))
        }
        if (filters.price.length > 0) {
            newdatas = newdatas.filter(x => x.priceDaily >= filters.price[0] && x.priceDaily <= filters.price[1])
        }
        if (filters.millage.length > 0) {
            newdatas = newdatas.filter(x => x.totalMillage >= filters.millage[0] && x.totalMillage <= filters.millage[1])
        }
        if (filters.deposit.length > 0) {
            newdatas = newdatas.filter(x => x.depozitPrice >= filters.deposit[0] && x.depozitPrice <= filters.deposit[1])
        }

        setCars(prev => { return { ...prev, cars: newdatas } })

    }, [filters])





    var day = Math.ceil((new Date(dropOffDate) - new Date(pickUpDate)) / 86400000)



    var point = 0

    return (
        <div className='my-container mt-5' style={{ margin: "0 auto" }}>
            <div className='top-cars'>
                <Link to="/">Home Page</Link>
                <span>/</span>
                <span>Rent a Car</span>
                <span>/</span>
                {
                    cars.loadOffice ? <Link to={`/office/:${id}`}>{cars.office.name}</Link> : null
                }
            </div>
            <div className="row cars-heading">
                <div className="col-lg-3 col-xl-4 col-md-4 col-sm-4">
                    <div className="promo-code" style={{ height: "40px" }}>
                        <span>
                            I have a promo code
                            <FaAngleRight style={{ fontSize: "20px" }} />
                        </span>
                    </div>
                    <div style={{ border: "1px solid #dee3e8" }}>
                        <p style={{ marginBottom: "0", fontSize: "13px", textAlign: 'left', padding: "10px 20px" }}>Filter</p>
                    </div>
                    <div onClick={() => setTabs(prev => { return { ...prev, transmission: !tabs.transmission } })} style={{ border: "1px solid #dee3e8", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#ffa900", marginBottom: "0", fontSize: "15px", fontWeight: "700", textAlign: 'left', padding: "10px 20px" }}>Transmission Type</p>
                        {
                            !tabs.transmission ? <FaChevronUp style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} /> : <FaChevronDown style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} />
                        }
                    </div>
                    <div className='transsmission-tab tab' style={tabs.transmission ? null : { display: "none" }}>
                        <div className="row">
                            {
                                cars.loadTrans ?
                                    cars.trans.map(x => (
                                        <div key={x.id} className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12" style={{ display: "flex", alignItems: "center" }}>
                                            <input onChange={inputTransHandler} type="checkbox" value={x.id} id='automatic' name='transmission' />
                                            <label htmlFor="automatic">{x.name} ({x.count})</label>
                                        </div>
                                    ))
                                    : null

                            }
                        </div>
                    </div>
                    <div onClick={() => setTabs(prev => { return { ...prev, fuel: !tabs.fuel } })} style={{ border: "1px solid #dee3e8", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#ffa900", marginBottom: "0", fontSize: "15px", fontWeight: "700", textAlign: 'left', padding: "10px 20px" }}>Fuel Type</p>
                        {
                            !tabs.fuel ? <FaChevronUp style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} /> : <FaChevronDown style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} />
                        }
                    </div>
                    <div className='transsmission-tab tab' style={tabs.fuel ? null : { display: "none" }}>
                        <div className="row g-3">
                            {
                                cars.loadFuel ?
                                    cars.fuels.filter(x => x.count > 0).map(x => (
                                        <div key={x.id} className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12" style={{ display: "flex", alignItems: "center" }}>
                                            <input onChange={inputFuelHandler} type="checkbox" value={x.id} id='automatic' name='transmission' />
                                            <label htmlFor="automatic">{x.name} ({x.count})</label>
                                        </div>
                                    ))
                                    : null

                            }
                        </div>
                    </div>
                    <div onClick={() => setTabs(prev => { return { ...prev, brand: !tabs.brand } })} style={{ border: "1px solid #dee3e8", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#ffa900", marginBottom: "0", fontSize: "15px", fontWeight: "700", textAlign: 'left', padding: "10px 20px" }}>Car Brand</p>
                        {
                            !tabs.brand ? <FaChevronUp style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} /> : <FaChevronDown style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} />
                        }
                    </div>
                    <div className='transsmission-tab tab' style={tabs.brand ? null : { display: "none" }}>
                        <div className="row g-3">
                            {
                                cars.loadBrand ?
                                    cars.brands.map(x => {
                                        return <div key={x.id} className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12" style={{ display: "flex", alignItems: "center" }}>
                                            <input onChange={inputBrandHandler} type="checkbox" value={x.id} id='BMW' />
                                            <label htmlFor="BMW">{x.name} ({x.count})</label>
                                        </div>
                                    }) : null
                            }


                        </div>
                    </div>
                    <div onClick={() => setTabs(prev => { return { ...prev, model: !tabs.model } })} style={{ border: "1px solid #dee3e8", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#ffa900", marginBottom: "0", fontSize: "15px", fontWeight: "700", textAlign: 'left', padding: "10px 20px" }}>Car Model</p>
                        {
                            !tabs.model ? <FaChevronUp style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} /> : <FaChevronDown style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} />
                        }
                    </div>
                    <div className='transsmission-tab tab' style={tabs.model ? null : { display: "none" }}>
                        <div className="row g-3">
                            {
                                cars.loadModel ?
                                    cars.models.map(x => {
                                        return <div key={x.id} className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12" style={{ display: "flex", alignItems: "center" }}>
                                            <input onChange={inputModelHandler} type="checkbox" value={x.id} id='BMW' />
                                            <label htmlFor="BMW">{x.name} ({x.count})</label>
                                        </div>
                                    }) : null
                            }
                        </div>
                    </div>
                    <div onClick={() => setTabs(prev => { return { ...prev, type: !tabs.type } })} style={{ border: "1px solid #dee3e8", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#ffa900", marginBottom: "0", fontSize: "15px", fontWeight: "700", textAlign: 'left', padding: "10px 20px" }}>Car Type</p>
                        {
                            !tabs.type ? <FaChevronUp style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} /> : <FaChevronDown style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} />
                        }
                    </div>
                    <div className='transsmission-tab tab' style={tabs.type ? null : { display: "none" }}>
                        <div className="row g-3">
                            {
                                cars.loadType ?
                                    cars.types.map(x => {
                                        return <div key={x.id} className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12" style={{ display: "flex", alignItems: "center" }}>
                                            <input onChange={inputTypeHandler} type="checkbox" value={x.id} id='BMW' />
                                            <label htmlFor="BMW">{x.name} ({x.count})</label>
                                        </div>
                                    }) : null
                            }


                        </div>
                    </div>
                    <div onClick={() => setTabs(prev => { return { ...prev, price: !tabs.price } })} style={{ border: "1px solid #dee3e8", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#ffa900", marginBottom: "0", fontSize: "15px", fontWeight: "700", textAlign: 'left', padding: "10px 20px" }}>Price Range</p>
                        {
                            !tabs.price ? <FaChevronUp style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} /> : <FaChevronDown style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} />
                        }
                    </div>
                    <div className='transsmission-tab tab' style={tabs.price ? null : { display: "none" }}>
                        {
                            cars.loadCars ? <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[tabs.minPrice, tabs.maxPrice]}
                                max={tabs.maxPrice}
                                min={tabs.minPrice}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                onChange={(value, index) => setFilters(prev => { return { ...prev, price: value } })}
                                pearling
                                minDistance={10}
                            /> : null
                        }
                    </div>
                    <div onClick={() => setTabs(prev => { return { ...prev, millage: !tabs.millage } })} style={{ border: "1px solid #dee3e8", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#ffa900", marginBottom: "0", fontSize: "15px", fontWeight: "700", textAlign: 'left', padding: "10px 20px" }}>Millage Limit</p>
                        {
                            !tabs.millage ? <FaChevronUp style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} /> : <FaChevronDown style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} />
                        }
                    </div>
                    <div className='transsmission-tab tab' style={tabs.millage ? null : { display: "none" }}>
                        {
                            cars.loadCars ? <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[tabs.minMillage, tabs.maxMillage]}
                                max={tabs.maxMillage}
                                min={tabs.minMillage}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                onChange={(value, index) => setFilters(prev => { return { ...prev, millage: value } })}
                                pearling
                                minDistance={10}
                            /> : null
                        }
                    </div>
                    <div onClick={() => setTabs(prev => { return { ...prev, deposit: !tabs.deposit } })} style={{ border: "1px solid #dee3e8", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#ffa900", marginBottom: "0", fontSize: "15px", fontWeight: "700", textAlign: 'left', padding: "10px 20px" }}>Deposit Fee</p>
                        {
                            !tabs.deposit ? <FaChevronUp style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} /> : <FaChevronDown style={{ color: "#ffa900", fontSize: "22px", marginRight: '10px' }} />
                        }
                    </div>
                    <div className='transsmission-tab tab' style={tabs.deposit ? null : { display: "none" }}>
                        {
                            cars.loadCars ? <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[tabs.minDeposit, tabs.maxDeposit]}
                                max={tabs.maxDeposit}
                                min={tabs.minDeposit}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                onChange={(value, index) => setFilters(prev => { return { ...prev, deposit: value } })}
                                pearling
                                minDistance={10}
                            /> : null
                        }
                    </div>




                </div>
                <div className="col-lg-9 col-xl-8 col-md-8 col-sm-8">
                    <div className="top-info">
                        <div className="left-top-info">
                            <div className="left">
                                {
                                    cars.loadOffice ?
                                        <span className='office-name'>{cars.office.name}</span> : null

                                }

                                <span className='desc'>Car Rental Prices</span>
                            </div>
                            <div className="right">
                                <span>listing</span>
                                {
                                    cars.loadCars ?
                                        <span className='second'>{cars.cars.length} vehicles</span> : null

                                }
                            </div>
                        </div>
                        <div onClick={() => { setTabs(prev => { return { ...prev, sort: !tabs.sort } }) }} className="right-top-info">
                            <div style={{ padding: '6px 10px 6px 10px', width: "100%", height: "100%", display: "flex", justifyContent: "space-between", position: "relative" }}>
                                <div className="left">
                                    <span>Sort:</span>
                                    <span className='second'>{
                                        filters.sort === 0 ? "Sort by Recommended" : filters.sort === 1 ? "Lowest Price First" : filters.sort === 2 ? "Highest Price First" :
                                            filters.sort === 3 ? "Highest Rating" : "Most Reviewed"
                                    }</span>

                                </div>

                                <div className="right">
                                    <PiArrowsDownUpBold style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700", color: "#888888" }} />
                                </div>
                                {
                                    tabs.sort ? <div className='sort-elements' >
                                        <li onClick={() => { setFilters(prev => { return { ...prev, sort: 0 } }) }} className={filters.sort === 0 ? "sort-element selected" : "sort-element"}>
                                            Sort by Recommended
                                        </li>
                                        <li onClick={() => { setFilters(prev => { return { ...prev, sort: 1 } }) }} className={filters.sort === 1 ? "sort-element selected" : "sort-element"}>
                                            Lowest Price First
                                        </li>
                                        <li onClick={() => { setFilters(prev => { return { ...prev, sort: 2 } }) }} className={filters.sort === 2 ? "sort-element selected" : "sort-element"}>
                                            Highest Price First
                                        </li>
                                        <li onClick={() => { setFilters(prev => { return { ...prev, sort: 3 } }) }} className={filters.sort === 3 ? "sort-element selected" : "sort-element"}>
                                            Highest Rating
                                        </li>
                                        <li onClick={() => { setFilters(prev => { return { ...prev, sort: 4 } }) }} className={filters.sort === 4 ? "sort-element selected" : "sort-element"}>
                                            Most Reviewed
                                        </li>
                                    </div> : null
                                }

                            </div>
                        </div>
                    </div>
                    <div className="cars mt-2">
                        {cars.loadCars ? cars.displayedCars.map(x => (<div className="car" key={x.id}>
                            <div className="car-title">
                                <p className='car-name'>{x.name}</p>
                                <p style={{ color: '#9b9b9b', fontSize: "12px", textAlign: "left", marginBottom: "0" }}>or similar</p>
                            </div>
                            <div className="car-info">
                                <div className="left ">
                                    {
                                        x.isFreeCancelation ? <div className="free-cancel">
                                            <div className='d-flex'>
                                                <div className="radius">
                                                    <BsCheck style={{ color: "#39b54a", fontSize: "20px" }} />
                                                </div>
                                                <span>FREE CANCELLATION</span>
                                            </div>
                                        </div> : null
                                    }
                                    <Link to={`/detail/${x.id}/car`}>
                                        <div className="car-img">
                                            <img src={x.imageName} alt="car" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="right ">
                                    <ul>
                                        <li style={{ textAlign: "left", fontSize: "20px" }}>
                                            <BiInfoCircle color='#008dd4' />
                                            <span>Deposit : <b>{x.depozitPrice} $</b> </span>
                                        </li>
                                        <li style={{ textAlign: "left", fontSize: "20px" }}>
                                            <BiInfoCircle color='#008dd4' />
                                            <span>Total mileage limit : <b>{x.totalMillage} km</b> </span>
                                        </li>
                                        <li style={{ textAlign: "left", fontSize: "20px" }}>
                                            <BiInfoCircle color='#008dd4' />
                                            <span>How to pick up your car? <b>In-terminal office</b> </span>
                                        </li>                                    </ul>
                                </div>
                            </div>
                            <div className="car-bottom">
                                <div>
                                    <div className="car-icons">
                                        <div style={{ marginTop: "18px", marginBottom: "18px", display: "flex", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "50px" }}>
                                            <div>
                                                <GiGearStick style={{ color: '#00a8f4', fontSize: '19px', marginRight: "6px" }} />
                                                <span style={{ color: '#9b9b9b', fontSize: "13px", fontWeight: "500" }}>{x.transmission === 1 ? "Automatic" : "Manual"}</span>
                                            </div>
                                            <div>
                                                <BsFillFuelPumpFill style={{ color: '#00a8f4', fontSize: '17px', marginRight: "6px" }} />
                                                <span style={{ color: '#9b9b9b', fontSize: "13px", fontWeight: "500" }}>{x.fuel === 1 ? "Diesel" : x.fuel === 2 ? 'Gas-Diesel' : x.fuel === 3 ? "Electric" : "Gas"}</span>
                                            </div>
                                            <div>
                                                <BsFillCarFrontFill style={{ color: '#00a8f4', fontSize: '22px', marginRight: "6px" }} />
                                                <span style={{ color: '#9b9b9b', fontSize: "13px", fontWeight: "500" }}>{x.type.name}</span>
                                            </div>
                                        </div>

                                    </div>
                                    <span className='d-none'>
                                        {
                                            point =x.reviews.length > 0 ? x.reviews.reduce((total, review) => total + review.mainPoint, 0) / x.reviews.length:5.0
                                        }
                                    </span>
                                    <div className='car-rayting d-flex justify-content-beetween align-item-center p-2'>
                                        <div className='d-flex align-items-center ps-3'>
                                            {
                                                [1, 2, 3, 4, 5].map((y) => (
                                                    point > y ?
                                                        <BiSolidStar className='ms-1' color='#ffa900' /> :
                                                        point == y ?
                                                            <BiSolidStar className='ms-1' color='#ffa900' /> :
                                                            point < y && point > y - 1 ?
                                                                <BiSolidStarHalf className='ms-1' color='#ffa900' /> :
                                                                <AiOutlineStar className='ms-1' color='#ffa900' />

                                                ))

                                            }
                                            <span className='car-point'>
                                                {

                                                    x.reviews.length > 0 ?

                                                        (point).toFixed(1)



                                                        :
                                                        "5.0"
                                                }
                                            </span>


                                        </div>
                                        <div>
                                            <p style={{ textDecoration: "underline", marginLeft: "100px", fontSize: "14px", color: "#758493", marginTop: "10px", marginBottom: "0" }}>{x.reviews.length} comments</p>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="car-price">
                                        <div className='text-start'>
                                            <span>Total Amount ({day} Days): </span>
                                            <BiInfoCircle color='#008dd4' style={{ fontSize: "20px" }} />
                                        </div>
                                        <div className='text-start price-info-car d-flex justify-content-between align-items-center'>
                                            <span style={{ color: "#2ecc71" }}>Daily price : {x.priceDaily} $</span>
                                            <span style={{ color: "#4a4a4a", fontSize: "20px", fontWeight: "700", marginRight: '10px' }}>{(x.priceDaily * day).toFixed(2)} $</span>
                                        </div>
                                    </div>
                                    <Link to={`/detail/${x.id}/car`}>
                                        <div className='rent-btn'>
                                            Rent now!
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        )) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cars