

import DataTable from 'react-data-table-component'
import { useState, useEffect, useCallback } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, Input, Button, Label, Badge } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Select from 'react-select'
import Spinner from "../../components/spinner/Loading-spinner"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { RefreshCw, ChevronDown, Edit, Trash2 } from "react-feather"
import { toast } from 'react-toastify'

import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
const MySwal = withReactContent(Swal)

const Listing = () => {
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editData, setEditData] = useState({})
  const [data, setData] = useState(null)
  const [total, setTotal] = useState(null)
  const [userData, setUserData] = useState(null)
  const [productData, setProductData] = useState(null)
  const [query, setQuery] = useState({
    offset: 0,
    limit: 25,
    search: "",
    order: 'desc',
    sort: 'id',
    status: ""
  })
  const [userQuery, setUserQuery] = useState({
    offset: 0,
    limit: "",
    search: "",
    order: "desc",
    sort: "id",
    status: ""
  })
  const [productQuery, setProductQuery] = useState({
    offset: 0,
    limit: "",
    search: "",
    order: 'desc',
    sort: 'id',
    status: ""
  })
  const handleFirstCharUpper = (e) => {
    const str = e.target.value
    return str.charAt(0) + str.substring(1)
  }

  const status = {
    1: { title: 'Active', color: 'light-success' },
    2: { title: 'Inactive', color: 'light-danger' }
  }

  const request = (reset_offset = true) => {
    if (reset_offset) {
      query.offset = 0
      setQuery(query)
    }
    axios.post("http://localhost:3000/api/order/orders", query).then((res) => {
      if (res.data.error) {
        const resMessage = res.data.message
        if (Array.isArray(resMessage)) {
          return toast.error(resMessage[0])
        }
        return toast.error(resMessage)
      }

      for (let i = 0; i < res.data.data.data.products.length; i++) {
        const product = res.data.data.data.products[i];
        const order = res.data.data.data.rows[i];
        if (product.id == order.productid) {

          res.data.data.data.rows[i]["product"] = product
        }
      }
      // console.log("product", res.data.data.total.total);
      setTotal(res.data.data.total.total)
      setData(res.data.data.data.rows)
    })
  }

  useEffect(() => {
    axios.post("http://localhost:3000/api/user/user", userQuery).then((res) => {
      // console.log("res.data.data###############",res.data.data);
      if (res.data.data.rows.length == 0) {
        setUserData([{ value: "", label: "" }])

      } else {
        let userData = []
        res.data.data.rows.map((i) => {
          userData.push({ value: i.id, label: i.email })
        })
        setUserData(userData)
      }
    })
    axios.post("http://localhost:3000/api/product/products", productQuery).then((res) => {
      // console.log("res.data.data.rows",res.data.data.rows);
      if (res.data.data.rows.length == 0) {
        setProductData([{ value: "", label: "" }])

      } else {
        let userData = []
        res.data.data.rows.map((i) => {
          userData.push({ value: i.id, label: i.title })
        })
        setProductData(userData)
      }
    })
    request()
  }, [])

  const debounce = (func) => {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func();
      }, 800);
    }
  }

  const debouncedSearch = useCallback(debounce(request), [])

  const basicColumns = [
    {
      name: 'Sr.',
      maxWidth: '100px',
      column: "id",
      sortable: true,
      selector: row => row.sr
    },
    {
      name: 'Order ID',
      maxWidth: '150px',
      selector: row => row.orderId
    },
    {
      name: 'Color',
      maxWidth: '150px',
      selector: row => row.product.color
    },
    {
      name: 'Category',
      maxWidth: '150px',
      selector: row => row.product.category
    },
    {
      name: 'Product Name',
      maxWidth: '700px',
      selector: row => row.product.title
    },
    {
      name: 'Image',
      maxWidth: '100px',
      selector: row => {
        return (<img src={row.product.image} width={34} height={34} />)
      }
    },
    {
      name: 'Price',
      maxWidth: '100px',
      selector: row => row.product.price
    },
    {
      name: 'Status',
      maxWidth: '150px',
      selector: row => {
        return (<center>

          {row.status == 'Pending' && < Badge color="#879193" pill style={{ background: "#879193" }}>{row.status ? row.status : "N/A"} </Badge >}
          {row.status == 'Completed' && < Badge color="#08aeea" pill style={{ background: "#08aeea" }}>{row.status ? row.status : "N/A"} </Badge >}
          {row.status == 'Cancelled' && < Badge color="red" pill style={{ background: "red" }}> {row.status ? row.status : "N/A"}
          </Badge >}
          {row.status == 'Refunded' && < Badge color="#FCCB05" pill style={{ background: "#FCCB05" }}> {row.status ? row.status : "N/A"}
          </Badge >}
          {row.status == 'Delivered' && < Badge color="#BDDF57" pill style={{ background: "#BDDF57" }}> {row.status ? row.status : "N/A"}
          </Badge >}
          {row.status == 'Shipped' && < Badge color="#BDDF57" pill style={{ background: "#BDDF57" }}> {row.status ? row.status : "N/A"}
          </Badge >}
        </center>)
      }

      // cell: row => {
      //   return (
      //     <Badge color={status[row.status].color} pill>
      //       {status[row.status].title}
      //     </Badge>
      //   )
      // }
    },
    {
      name: 'Action',
      column: "status",
      selector: row => row.status,
      cell: row => {
        return (
          <>
            {/* <Button color='primary' className='me-1' onClick={() => {
                              setEditData(row)
                              setEditModal(true)
                          }} size='sm'>Edit</Button> */}
            <span title='Edit'>
              <Edit className='me-1' style={{ cursor: "pointer", color: "#7367f0" }} onClick={() => {
                setEditData(row)
                setEditModal(true)

              }} />
            </span>
            <span title='Delete'>
              <Trash2 className="text-danger" style={{ cursor: "pointer" }} onClick={() => deleteCourse(row)} />
            </span>
          </>
        )
      }
    }
  ]

  const handlePagination = page => {
    query.offset = page.selected * query.limit
    setQuery(query)
    request(false)
  }
  const CustomPagination = () => {
    const limit = [1, 10, 25, 50, 100]
    const updateLimit = (e) => {
      query.limit = parseInt(e.target.value)
      setQuery({ ...query })
      request()
    }
    return (
      <div className="mt-2">
        <div className="container position-absolute">
          <div className="row">
            <div className="col-sm-1">
              <select className="form-select form-select-sm" onChange={updateLimit} value={query.limit}>
                {
                  limit.map(value => (<option value={value} key={value} >{value}</option>))
                }
              </select>
            </div>
            <div className="col-sm-1">
              Total: {total}
            </div>
          </div>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          forcePage={Math.floor(query.offset / query.limit)}
          onPageChange={page => handlePagination(page)}
          pageCount={Math.ceil(total / query.limit)}
          breakLabel={'...'}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName='active'
          pageClassName='page-item'
          breakClassName='page-item'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          breakLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextClassName='page-item next-item'
          previousClassName='page-item prev-item'
          containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'
        />
      </div>
    )
  }
  const handleSort = (column, sortDirection) => {

    if (column.column) {
      query.order = sortDirection
      query.sort = column.column
      setQuery(query)
      request()
    }
  }

  const AddModal = () => {
    const [formData, setForm] = useState({
      userid: "",
      productid: "",
      address: "",
      state: "",
      city: "",
      pin: "",
      price: ""
    })

    const [image, setimage] = useState(null)
    const onSubmit =async(e)=> {
      if (formData) {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/order/order`, formData)
         if (data) {
            // request()
            setEditModal(false)
            return toast.success(res.data.message)
          }
      }
    }
    return (
      <div className='vertically-centered-modal'>
        <Modal isOpen={addModal} toggle={() => setAddModal(!addModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setAddModal(!addModal)}>Create product</ModalHeader>
          <Form onSubmit={onSubmit} id="form">
            <ModalBody>
              <div className="row">
                <div className="col-md-12 me-1 mt-1">

                  <div className="form-group ">
                    <div style={{ paddingBottom: "8px" }}>
                      <label htmlFor="userid">User</label>
                    </div>
                    <Select
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={{ value: "userid", label: "Select User" }}
                      name='userid'
                      key={userData}
                      options={userData}
                      menuPlacement="auto"
                      maxMenuHeight={250}
                      onChange={(e) => {
                        setForm({ ...formData, userid: e.value })
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <div style={{ paddingBottom: "8px" }}>
                      <label htmlFor="productid">Product</label>
                    </div>
                    <Select
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={{ value: "productid", label: "Select product" }}
                      name='productid'
                      key={productData}
                      options={productData}
                      menuPlacement="auto"
                      maxMenuHeight={250}
                      onChange={(e) => {
                        setForm({ ...formData, productid: e.value })
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Address <span className='text-danger'>*</span></label>
                    <input type="text" name="address" value={formData.address} onChange={e => {
                      setForm({ ...formData, address: e.target.value })
                    }} className='form-control' placeholder='Address' required />
                  </div>
                </div>

                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>State <span className='text-danger'>*</span></label>
                    <input type="text" name="state" value={formData.state} onChange={e => {

                      setForm({ ...formData, state: e.target.value })
                    }} className='form-control' placeholder='State' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>City <span className='text-danger'>*</span></label>
                    <input type="text" name="city" value={formData.city} onChange={e => {

                      setForm({ ...formData, city: e.target.value })
                    }} className='form-control' placeholder='City' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Pin <span className='text-danger'>*</span></label>
                    <input type="text" name="pin" value={formData.pin} onChange={e => {

                      setForm({ ...formData, pin: e.target.value })
                    }} className='form-control' placeholder='Pin' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Price <span className='text-danger'>*</span></label>
                    <input type="text" name="price" value={formData.price} onChange={e => {

                      setForm({ ...formData, price: e.target.value })
                    }} className='form-control' placeholder='Price' required />
                  </div>
                </div>

              </div>
            </ModalBody>
            <ModalFooter>
              <div className='bg-pink-600'>
                <Button color='primary' type='submit'>
                  Create
                </Button>
              </div>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }

  const EditModal = () => {
    console.log("editData",editData)
    const [form, setForm] = useState({
      userid: editData.userid,
      productid: editData.productid,
      address: editData.address,
      state: editData.state,
      city: editData.city,
      pin: editData.pin,
      price: editData.price,
      status:editData.status
    })
    // console.log(editData.image);

    const onSubmitEdit = e => {
      e.preventDefault()
      axios.post("http://localhost:3000/api/order/update-order", form).then(res => {
        if (res.data.error) {
          const resMessage = res.data.message
          if (Array.isArray(resMessage)) {
            return toast.error(resMessage[0])
          }
          return toast.error(resMessage)
        }
        request()
        setEditModal(false)
        return toast.success(res.data.message)
      })
    }
    return (
      <div className='vertically-centered-modal'>
        <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setEditModal(!editModal)}>Edit Course</ModalHeader>
          <Form onSubmit={onSubmitEdit} id="form">
          <ModalBody>
          <div className="row">
            <div className="col-md-12 me-1 mt-1">

              <div className="form-group ">
                <div style={{ paddingBottom: "8px" }}>
                  <label htmlFor="userid">User</label>
                </div>
                <Select
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={{ value: "userid", label: "Select User" }}
                  name='userid'
                  key={userData}
                  options={userData}
                  menuPlacement="auto"
                  maxMenuHeight={250}
                  onChange={(e) => {
                    setForm({ ...form, userid: e.value })
                  }}
                  required
                />
              </div>
            </div>
            <div className="col-md-12 me-1 mt-1">
              <div className="form-group">
                <div style={{ paddingBottom: "8px" }}>
                  <label htmlFor="productid">Product</label>
                </div>
                <Select
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={{ value: "productid", label: "Select product" }}
                  name='productid'
                  key={productData}
                  options={productData}
                  menuPlacement="auto"
                  maxMenuHeight={250}
                  onChange={(e) => {
                    setForm({ ...form, productid: e.value })
                  }}
                  required
                />
              </div>
            </div>

            <div className="col-md-12 me-1 mt-1">
              <div className="form-group">
                <label>Address <span className='text-danger'>*</span></label>
                <input type="text" name="address" value={form.address} onChange={e => {
                  setForm({ ...form, address: e.target.value })
                }} className='form-control' placeholder='Address' required />
              </div>
            </div>

            <div className="col-md-12 me-1 mt-1">
              <div className="form-group">
                <label>State <span className='text-danger'>*</span></label>
                <input type="text" name="state" value={form.state} onChange={e => {

                  setForm({ ...form, state: e.target.value })
                }} className='form-control' placeholder='State' required />
              </div>
            </div>
            <div className="col-md-12 me-1 mt-1">
              <div className="form-group">
                <label>City <span className='text-danger'>*</span></label>
                <input type="text" name="city" value={form.city} onChange={e => {

                  setForm({ ...form, city: e.target.value })
                }} className='form-control' placeholder='City' required />
              </div>
            </div>
            <div className="col-md-12 me-1 mt-1">
              <div className="form-group">
                <label>Pin <span className='text-danger'>*</span></label>
                <input type="text" name="pin" value={form.pin} onChange={e => {

                  setForm({ ...form, pin: e.target.value })
                }} className='form-control' placeholder='Pin' required />
              </div>
            </div>
            <div className="col-md-12 me-1 mt-1">
              <div className="form-group">
                <label>Price <span className='text-danger'>*</span></label>
                <input type="text" name="price" value={form.price} onChange={e => {

                  setForm({ ...form, price: e.target.value })
                }} className='form-control' placeholder='Price' required />
              </div>
            </div>

          </div>
        </ModalBody>
            <ModalFooter>
              <div className='bg-pink-600'>
                <Button color='primary' type='submit'>
                  Update
                </Button>

              </div>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }

  const deleteCourse = (row) => {
    MySwal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary bg-pink-600',
        cancelButton: 'btn btn-danger ms-1 bg-pink-600'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        axios.post("http://localhost:3000/api/order/delete-order", { id: row.id }).then(res => {
          if (res.data.error) {
            const resMessage = res.data.message
            if (Array.isArray(resMessage)) {
              return toast.error(resMessage[0])
            }
            return toast.error(resMessage)
          }
          MySwal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: "Deleted Successfully!",
            customClass: {
              confirmButton: 'btn btn-success bg-pink-600'
            }
          })
          request()
        })
      }
      else {
        // console.log(result.value);
      }
    })
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
     footer {
      display:none
     }
      `}</style>
        <FullLayout>
          <div className="card">
            <AddModal />
            <div className="card-body">
              <div className="d-flex justify-content-between align-center">
                <h4>Products</h4>
                <div className='bg-pink-600'>

                  <Button color='primary' size='sm' onClick={() => setAddModal(!addModal)}>Create</Button>

                </div>
              </div>
              <hr />

              {(data !== null) ? (
                <>
                  <EditModal />
                  <div className="d-flex justify-content-between mb-1">
                    <div></div>
                    <div className="row">
                      <div className="col-md">
                        <div className="form-group">
                          <label>&nbsp;</label>
                          <input type="text" name="" className='form-control mr-2' id="" placeholder='Search' onChange={e => {
                            query.search = e.target.value
                            setQuery(query)
                            debouncedSearch()
                            // request()
                          }} />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>&nbsp;</label>
                          <button className='btn btn-primary btn-sm form-control bg-pink-600' onClick={() => {
                            query.search = ""
                            query.status = ""
                            // query.limit=25
                            setQuery(query)
                            request()
                          }}><RefreshCw size={15} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='react-dataTable'>
                    <DataTable
                      noHeader
                      pagination
                      data={data}
                      columns={basicColumns}
                      className='react-dataTable'
                      sortIcon={<ChevronDown size={10} />}
                      onSort={handleSort}
                      paginationComponent={CustomPagination}
                      paginationDefaultPage={query.offset + 1}
                      paginationServer
                    />
                  </div>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </FullLayout>
      </ThemeProvider>
    </>
  )

}

export default Listing

