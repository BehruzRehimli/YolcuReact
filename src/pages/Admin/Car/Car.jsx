import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from "react-icons/fi"
import { MdDeleteForever } from "react-icons/md"
import { BiSolidChevronLeft } from "react-icons/bi";
import { BiSolidChevronRight, BiDownload } from "react-icons/bi";

const Car = () => {
    const navigate = useNavigate();

    const { adminToken } = useSelector(store => store.login)

    const [countries, setCountries] = useState({
        isLoad: false,
        countries: []
    })


    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState();
    const pagesArray = []
    for (let i = 1; i <= maxPage; i++) {
        pagesArray.push(i);
    }
    const PageClickHandler = (e) => {
        setPage(e.target.innerHTML)
        var btns = document.querySelectorAll('.pagination')
        btns.forEach(btn => {
            btn.classList.remove("active")
        });
        e.target.classList.add("active")
    }

    const NextPageHandler = (e) => {
        if (page < maxPage) {
            const newPage = page + 1;
            setPage(newPage);
            var btns = document.querySelectorAll('.pagination')
            btns.forEach(btn => {
                btn.classList.remove("active")
            });
        }

    }
    const PrevPageHandler = function () {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            var btns = document.querySelectorAll('.pagination')
            btns.forEach(btn => {
                btn.classList.remove("active")
            });
        }


    }



    useEffect(() => {
        const getCountries = async () => {
            var token = "Bearer " + adminToken
            try {
                var datas = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/cars/GetAdmin/${page}`, { headers: { "Authorization": token } })
                setCountries(prev => { return { ...prev, countries: datas.data.data, isLoad: true } })
                setMaxPage(datas.data.pageCount)
            } catch (error) {
                if (error.response.status === 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")

                }

            }
        }
        getCountries();
    }, [page])
    let order = 1;

    const exportHandle = async () => {
        try {
            const response = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Cars/ExportExcel`, {
                responseType: 'blob', // Tell Axios to treat the response as a binary blob
            });

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a temporary URL to the blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element and trigger a click event to download the file
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Cars.xlsx';
            document.body.appendChild(link);
            link.click();

            // Clean up the URL object
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="admin-container">
            <h2 className='text-start  crud-header-entity pb-3' >Car</h2>
            <div className='text-end me-3'>
                <Link className='btn btn-primary' to={"/admin/car/create"}>Create Car</Link>
                <button onClick={exportHandle} className='btn btn-success ms-2 '><BiDownload style={{ fontSize: "20px", marginRight: "8px" }} /> Download Excel</button>
            </div>
            <div className="table-responsive mt-4">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="text-center ">#</th>
                            <th>Name</th>
                            <th>Model Name</th>
                            <th>Office Count</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            countries.isLoad ?
                                countries.countries.map((x, index) => (
                                    <tr key={x.id}>
                                        <td className="text-center">{index + ((page - 1) * 10) + 1}</td>
                                        <td className="txt-oflo">{x.name}</td>
                                        <td className="txt-oflo">{x.model.name}</td>
                                        <td className="txt-oflo">{x.office.name}</td>
                                        <td className="txt-oflo">
                                            <img width={"150px"} src={x.imageName} alt="Car" />
                                        </td>

                                        <td><span className="text-success">
                                            <Link to={`/admin/car/edit/${x.id}`} className='btn btn-warning'> <FiEdit className='me-2' />Edit</Link>
                                            <button onClick={async () => {
                                                var token = "Bearer " + adminToken
                                                try {
                                                    var datas = await axios.delete(`http://bexarehimli-001-site1.htempurl.com/api/Cars/${x.id}`, { headers: { "Authorization": token } })
                                                    var datas = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Cars", { headers: { "Authorization": token } })
                                                    setCountries(prev => { return { ...prev, countries: datas.data, isLoad: true } })

                                                } catch (error) {
                                                    console.log(error);
                                                    if (error.response.status === 401) {
                                                        navigate("/admin/login")
                                                    }
                                                    else {
                                                        navigate("/error")

                                                    }

                                                }

                                            }} className='btn btn-danger ms-3'> <MdDeleteForever className='me-2 fs-5' />Delete</button>
                                        </span></td>
                                    </tr>

                                )) : null
                        }
                    </tbody>
                </table>
                <div className='text-start'>
                    <p onClick={PrevPageHandler} className='pagination' ><BiSolidChevronLeft /></p>

                    {
                        pagesArray.length > 0 ?
                            <>

                                {pagesArray.map(x => (
                                    <p id={`page-btn-${x}`} onClick={PageClickHandler} className={page === x ? 'pagination active' : 'pagination'} key={x}>{x}</p>
                                ))}

                            </> : null

                    }

                    <p onClick={NextPageHandler} className='pagination' ><BiSolidChevronRight /></p>

                </div>


            </div>


        </div>
    )
}

export default Car