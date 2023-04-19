import DataTable from 'react-data-table-component'
import { useState, useEffect } from "react"
import { Table, Modal, ModalBody, ModalHeader, ModalFooter, Form, Input, Button, Label, CardHeader, Badge, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
// import themeConfig from '../../configs/themeConfig'

import Spinner from "../../components/spinner/Loading-spinner"
// import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import { RefreshCw, ChevronDown, Edit, Trash2 } from "react-feather"
import { toast } from 'react-toastify'
// import ImageUpload from '../../custom/ImageUpload'
// import helpers from '../../custom/helpers'

import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import upload from '../api/middlewear/upload'
import { formControlClasses } from '@mui/material'

const MySwal = withReactContent(Swal)

const Listing = () => {
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editData, setEditData] = useState({})
  const [data, setData] = useState(null)
  const [total, setTotal] = useState(null)
  const [query, setQuery] = useState({
    offset: 0,
    limit: 25,
    search: "",
    order: 'desc',
    sort: 'id',
    status: "",
    token: ""
  })

  const handleFirstCharUpper = (e) => {
    const str = e.target.value
    return str.charAt(0) + str.substring(1)
  }

  const status = {
    1: { title: 'Active', color: 'light-success' },
    2: { title: 'Inactive', color: 'light-danger' }
  }

  const request = (token, reset_offset = true) => {

    query.token = token
    setQuery(query)
    if (reset_offset) {
      query.offset = 0
      setQuery(query)
    }

    axios.post("http://localhost:3000/api/order/get-order", query).then((res) => {
      if (res.data.error) {
        const resMessage = res.data.message
        if (Array.isArray(resMessage)) {
          return toast.error(resMessage[0])
        }
        return toast.error(resMessage)
      }
      for (let i = 0; i < res.data.data.products.length; i++) {
        const product = res.data.data.products[i];
        const order = res.data.data.rows[i];
        if (product.id == order.productid) {
          console.log("product", product.id);
          res.data.data.rows[i]["product"] = product
        }
      }
      setTotal(res.data.data.total)
      setData(res.data.data.rows)
    })
  }

  useEffect(() => {
    console.log("token", localStorage.getItem("token"));
    request(localStorage.getItem("token"))
  }, [])

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
      title: "",
      slug: "",
      image: "",
      category: "",
      description: "",
      size: "",
      color: "",
      price: "",
      availableqyt: "",
      status: "1"
    })

    const [image, setimage] = useState(null)
    // let formdata = {
    //   title: form.title,
    //   slug:form.slug,
    //   image: form.image,
    //   category: form.category,
    //   description:form.description,
    //   size: form.size,
    //   color: form.color,
    //   price: form.price,
    //   availableqyt: form.availableqyt,
    //   status: "1"
    // }
    // console.log('formData', formData);
    const onSubmit = e => {
      if (formData) {
        const options = {
          url: "http://localhost:3000/api/create-product",
          method: "POST",
          headers: {
            'content-type': 'multipart/form-data'
          },
          data: formData
        };

        axios(options)
          .then((response) => {
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
    }
    return (
      <div className='vertically-centered-modal'>
        <Modal isOpen={addModal} toggle={() => setAddModal(!addModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setAddModal(!addModal)}>Create product</ModalHeader>
          <Form onSubmit={onSubmit} id="form">
            <ModalBody>
              <div className="row">
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Title <span className='text-danger'>*</span></label>
                    <input type="text" name="title" value={formData.title} onChange={e => {

                      setForm({ ...formData, title: e.target.value })
                    }} className='form-control' placeholder='title' required />
                  </div>
                </div>

                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Category <span className='text-danger'>*</span></label>
                    <input type="text" name="category" value={formData.category} onChange={e => {

                      setForm({ ...formData, category: e.target.value })
                    }} className='form-control' placeholder='category' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Color <span className='text-danger'>*</span></label>
                    <input type="text" name="color" value={formData.color} onChange={e => {

                      setForm({ ...formData, color: e.target.value })
                    }} className='form-control' placeholder='color' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Size <span className='text-danger'>*</span></label>
                    <input type="text" name="size" value={formData.size} onChange={e => {

                      setForm({ ...formData, size: e.target.value })
                    }} className='form-control' placeholder='size' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Price <span className='text-danger'>*</span></label>
                    <input type="text" name="price" value={formData.price} onChange={e => {

                      setForm({ ...formData, price: e.target.value })
                    }} className='form-control' placeholder='price' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Quantity <span className='text-danger'>*</span></label>
                    <input type="text" name="availableqyt" value={formData.availableqyt} onChange={e => {

                      setForm({ ...formData, availableqyt: e.target.value })
                    }} className='form-control' placeholder='quantity' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Slug <span className='text-danger'>*</span></label>
                    <input type="text" name="slug" value={formData.slug} onChange={e => {

                      setForm({ ...formData, slug: e.target.value })
                    }} className='form-control' placeholder='slug' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Description</label>
                    <Input name="description" type="textarea" onChange={e => {

                      setForm({ ...formData, description: e.target.value })
                    }} />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Image <span className='text-danger'>*</span></label>
                    <input type="file" name="image" onChange={e => {
                      setimage(e.target.files[0])
                      setForm({ ...formData, image: e.target.files[0] })
                    }} className='form-control' placeholder='Short Name' required />
                  </div>
                  {image && <img src={`/${image.name}`} width={100} height={50} />}
                </div>
                <div className="col-md-12 mt-1">
                  <div className="form-control" style={{ border: "0px" }}>
                    <label>Status</label>
                    <div className="d-flex">
                      <div className='form-check me-1'>
                        <Input type='radio' required id='status-active' name='status' value="1" checked={formData.status === "1"} onChange={e => {
                          setForm({ ...formData, status: e.target.value })
                        }} />
                        <Label className='form-check-label' for='status-active'>
                          Active
                        </Label>
                      </div>
                      <div className='form-check me-1'>
                        <Input type='radio' required id='status-deactive' name='status' value="2" checked={formData.status === "2"} onChange={e => {
                          setForm({ ...formData, status: e.target.value })
                        }} />
                        <Label className='form-check-label' for='status-deactive'>
                          Inactive
                        </Label>
                      </div>
                    </div>
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
    const [form, setForm] = useState({
      id: editData.id,
      title: editData.title,
      slug: editData.slug,
      image: editData.image,
      category: editData.category,
      description: editData.description,
      size: editData.size,
      color: editData.color,
      price: editData.price,
      availableqyt: editData.availableqyt,
      status: editData.status,

    })
    // console.log(editData.image);

    const onSubmitEdit = e => {
      e.preventDefault()
      axios.post("http://localhost:3000/api/product/update-product", form).then(res => {
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
                  <div className="form-group">
                    <label>Title <span className='text-danger'>*</span></label>
                    <input type="text" name="title" value={form.title} onChange={e => {

                      setForm({ ...form, title: e.target.value })
                    }} className='form-control' placeholder='title' required />
                  </div>
                </div>

                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Category <span className='text-danger'>*</span></label>
                    <input type="text" name="category" value={form.category} onChange={e => {

                      setForm({ ...form, category: e.target.value })
                    }} className='form-control' placeholder='category' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Color <span className='text-danger'>*</span></label>
                    <input type="text" name="color" value={form.color} onChange={e => {

                      setForm({ ...form, color: e.target.value })
                    }} className='form-control' placeholder='color' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Size <span className='text-danger'>*</span></label>
                    <input type="text" name="size" value={form.size} onChange={e => {

                      setForm({ ...form, size: e.target.value })
                    }} className='form-control' placeholder='size' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Price <span className='text-danger'>*</span></label>
                    <input type="text" name="price" value={form.price} onChange={e => {

                      setForm({ ...form, price: e.target.value })
                    }} className='form-control' placeholder='price' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Quantity <span className='text-danger'>*</span></label>
                    <input type="text" name="availableqyt" value={form.availableqyt} onChange={e => {

                      setForm({ ...form, availableqyt: e.target.value })
                    }} className='form-control' placeholder='quantity' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Slug <span className='text-danger'>*</span></label>
                    <input type="text" name="slug" value={form.slug} onChange={e => {

                      setForm({ ...form, slug: e.target.value })
                    }} className='form-control' placeholder='slug' required />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Description</label>
                    <Input name="description" type="textarea" value={form.description} onChange={e => {

                      setForm({ ...form, description: e.target.value })
                    }} />
                  </div>
                </div>
                <div className="col-md-12 me-1 mt-1">
                  <div className="form-group">
                    <label>Image <span className='text-danger'>*</span></label>
                    <input type="file" name="image" onChange={e => {
                      {/* <input type="file" name="image" value={form.image} onChange={e => { */ }
                      //
                      setForm({ ...form, image: ` /${e.target.files[0].name}` })

                    }} className='form-control' placeholder='Short Name' required />
                  </div>
                </div>
                <div className="col-md-12 mt-1">
                  <div className="form-control" style={{ border: "0px" }}>
                    <label>Status</label>
                    <div className="d-flex">
                      <div className='form-check me-1'>
                        <Input type='radio' required id='status-active' name='status' value="1" checked={form.status === "1"} onChange={e => {
                          setForm({ ...form, status: e.target.value })
                        }} />
                        <Label className='form-check-label' for='status-active'>
                          Active
                        </Label>
                      </div>
                      <div className='form-check me-1'>
                        <Input type='radio' required id='status-deactive' name='status' value="2" checked={form.status === "2"} onChange={e => {
                          setForm({ ...form, status: e.target.value })
                        }} />
                        <Label className='form-check-label' for='status-deactive'>
                          Inactive
                        </Label>
                      </div>
                    </div>
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
        axios.post("http://localhost:3000/api/product/delete-product", { id: row.id }).then(res => {
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
                <h4>Orders</h4>
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
                            request()
                          }} />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>&nbsp;</label>
                          <button className='btn btn-primary btn-sm form-control bg-pink-600' onClick={request}><RefreshCw size={15} /></button>
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