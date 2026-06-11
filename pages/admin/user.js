import DataTable from 'react-data-table-component'
import { useState, useEffect, useCallback } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, Input, Button, Label, Badge } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Select from 'react-select'
import Spinner from "../../components/spinner/Loading-spinner"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { RefreshCw, ChevronDown, Edit } from "react-feather"
import { toast } from 'react-toastify'
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";

const MySwal = withReactContent(Swal)

const Listing = () => {
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
    status: ""
  })

  const status = [{ value: "", label: "All" },{ label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' }]

  const request = (reset_offset = true) => {
    if (reset_offset) {
      query.offset = 0
      setQuery(query)
    }
    axios.post("http://localhost:3000/api/user/user", query).then((res) => {
      if (res.data.error) {
        const resMessage = res.data.message
        if (Array.isArray(resMessage)) {
          return toast.error(resMessage[0])
        }
        return toast.error(resMessage)
      }
      setTotal(res.data.data.total.total)
      setData(res.data.data.rows)
    })
  }

  useEffect(() => {
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
      name: 'Name',

      selector: row => row.name
    },
    {
      name: 'Email',

      selector: row => row.email
    },
    {
      name: 'Phone',

      selector: row => row.phone
    },
    {
      name: 'Image',

      selector: row => {
        return (<img src={row.image} width={34} height={34} />)
      }
    },
    {
      name: 'Status',
      selector: row => {
        return (
          <center>
            {row.status == 'Active' && < Badge color="green" pill style={{ background: "green" }}>{row.status ? row.status : "N/A"} </Badge >}
            {row.status == 'Inactive' && < Badge color="red" pill style={{ background: "red" }}>{row.status ? row.status : "N/A"} </Badge >}
          </center>)
      }
    },
    {
      name: 'Action',

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


  const EditModal = () => {
    const [form, setForm] = useState({
      id: editData.id,
      status: editData.status,

    })
    console.log("form", form);

    const onSubmitEdit = e => {
      e.preventDefault()
      axios.put("http://localhost:3000/api/user/user-update", form).then(res => {
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
                <div className="col-md-12 mt-1">
                  <div className="form-control" style={{ border: "0px" }}>
                    <label>Status</label>
                    <div className="d-flex">
                      <div className='form-check me-1'>
                        <Input type='radio' required id='status-active' name='status' value="Active" checked={form.status === "Active"} onChange={e => {
                          setForm({ ...form, status: e.target.value })
                        }} />
                        <Label className='form-check-label' for='status-active'>
                          Active
                        </Label>
                      </div>
                      <div className='form-check me-1'>
                        <Input type='radio' required id='status-deactive' name='status' value="Inactive" checked={form.status === "Inactive"} onChange={e => {
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
            <div className="card-body">
              <div className="d-flex justify-content-between align-center">
                <h4>User</h4>
              </div>
              <hr />

              {(data !== null) ? (
                <>
                  <EditModal />
              
                    <div className="d-flex justify-content-between mb-1">
                      <div></div>
                      <div className="row">
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Status</label>
                            <Select
                              className='react-select'
                              classNamePrefix='select'
                              defaultValue={{ value: "All", label: "All" }}
                              name='project_type'
                              key={status}
                              options={status}
                              menuPlacement="auto"
                              maxMenuHeight={250}
                              onChange={(e) => {
                                query.status = e.value
                                setQuery(query)
                                request()
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
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
                        <div className="col-md-2">
                          <div className="form-group">
                            <label>&nbsp;</label>
                            <button className='btn btn-primary btn-sm form-control mr-2 w-10 h-7' onClick={(newValue) => {
                              query.search = ""
                              query.status = ""
                              query.date = ""
                           
                              setQuery(query)
                              request()
                            }} ><RefreshCw size={8} /></button>
                          </div>
                        </div>
                      </div>

                    </div>
                    {/* <div className="row">
                    <div className="col-md-12">
               
                      <div className="col-md-5">
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
                      <div className="col-md-5">
                        <div className="form-group">
                          <Select
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue={{ value: "All", label: "All" }}
                            name='status'
                            key={status}
                            options={status}
                            menuPlacement="auto"
                            // maxMenuHeight={250}
                            onChange={(e) => {
                              query.status = e.value
                              setQuery(query)
                              request()
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
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
                        </div>*/}
                 
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