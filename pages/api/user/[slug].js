import knex from '../../../database-config'

// ── Helpers ──────────────────────────────────────────────────────────────────

const applySearch = (query, searchFrom, search) => {
  if (!search) return query
  return query.where((q) => {
    searchFrom.forEach((col) => q.orWhereILike(col, `%${search}%`))
  })
}

const applyStatus = (query, status) => {
  if (status !== undefined && status !== '') {
    query.where('status', status)
  }
  return query
}

const paginateTotal = async (searchFrom, search, status, table) => {
  let query = knex(table)
  query = applyStatus(query, status)
  query = applySearch(query, searchFrom, search)
  return query.count('id as total').first()
}

const paginate = (limit, offset, searchFrom, status, sort, search, order, table) => {
  let query = knex(table)
  query = applyStatus(query, status)
  query = applySearch(query, searchFrom, search)
  return query.orderBy(sort, order).limit(limit).offset(offset)
}

const buildRows = (rows, total, limit, offset, order) => {
  const data_rows = []
  if (order === 'asc') {
    let sr = total.total - limit * offset
    rows.forEach((row) => {
      data_rows.push({ ...row, sr })
      sr--
    })
  } else {
    let sr = offset + 1
    rows.forEach((row) => {
      data_rows.push({ ...row, sr })
      sr++
    })
  }
  return data_rows
}

// ── Handlers ─────────────────────────────────────────────────────────────────

const handleGetUsers = async (req, res) => {
  const {
    offset = 0,
    limit = 10,
    order = 'asc',
    sort = 'id',
    search = '',
    status = '',
  } = req.body

  const searchFrom = ['name', 'email', 'phone']

  const [total, rows] = await Promise.all([
    paginateTotal(searchFrom, search, status, 'user'),
    paginate(limit, offset, searchFrom, status, sort, search, order, 'user'),
  ])

  const data_rows = buildRows(rows, total, limit, offset, order)

  return res.status(200).json({
    error: false,
    message: 'Users retrieved successfully.',
    data: { rows: data_rows, total },
  })
}

const handleUpdateUser = async (req, res) => {
  const { id, ...inputData } = req.body

  if (!id) {
    return res.status(400).json({
      status: false,
      message: 'User ID is required.',
      data: [],
    })
  }

  // Prevent accidental role/password escalation unless explicitly allowed
  const allowedFields = ['name', 'email', 'phone', 'status', 'address', 'image']
  const safeData = Object.fromEntries(
    Object.entries(inputData).filter(([key]) => allowedFields.includes(key))
  )

  if (Object.keys(safeData).length === 0) {
    return res.status(400).json({
      status: false,
      message: 'No valid fields provided to update.',
      data: [],
    })
  }

  const data = await knex('user').update(safeData).where({ id })

  return res.status(200).json({
    status: true,
    message: 'User updated successfully.',
    data,
  })
}

// ── Main handler ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  const { slug } = req.query

  // Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: 'Method not allowed.' })
  }

  try {
    switch (slug) {
      case 'user':
        return await handleGetUsers(req, res)

      case 'user-update':
        return await handleUpdateUser(req, res)

      default:
        return res.status(404).json({ error: true, message: `Unknown route: ${slug}` })
    }
  } catch (error) {
    console.error(`[/api/users/${slug}]`, error)
    return res.status(500).json({
      error: true,
      message: error.sqlMessage || error.message || 'Something went wrong.',
      data: null,
    })
  }
}
