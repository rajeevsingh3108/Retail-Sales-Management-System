const { getAllSales } = require('../utils/dataLoader');

function parseListParam(value) {
  if (!value) return [];
  return value.split(',').map((v) => v.trim()).filter(Boolean);
}

function parseNumber(value, fallback = null) {
  const n = Number(value);
  return Number.isNaN(n) ? fallback : n;
}

async function getSales(options) {
  const {
    search,
    regions,
    genders,
    minAge,
    maxAge,
    categories,
    tags,
    paymentMethods,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    page,
    limit,
  } = options;

  const allSales = await getAllSales();

  let filtered = allSales;

  // Search Customer
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter((sale) => {
      const nameMatch =
        sale.customerName &&
        sale.customerName.toLowerCase().includes(s);
      const phoneMatch =
        sale.phoneNumber && sale.phoneNumber.includes(search);
      return nameMatch || phoneMatch;
    });
  }

  // Filter
if (regions && regions.length > 0) {
  const normalizedRegions = regions.map(r =>
    r.trim().toLowerCase()
  );

  filtered = filtered.filter((sale) => {
    return normalizedRegions.includes(
      sale.customerRegion?.trim().toLowerCase()
    );
  });
}

//Gender
if (genders && genders.length > 0) {
  const normalizedGenders = genders.map(g =>
    g.trim().toLowerCase()
  );

  filtered = filtered.filter((sale) => {
    return normalizedGenders.includes(
      sale.gender?.trim().toLowerCase()
    );
  });
}


  // Age range
  if (minAge !== null || maxAge !== null) {
    filtered = filtered.filter((sale) => {
      if (sale.age == null) return false;
      if (minAge !== null && sale.age < minAge) return false;
      if (maxAge !== null && sale.age > maxAge) return false;
      return true;
    });
  }

  // Product category
if (categories && categories.length > 0) {
  const normalizedCategories = categories.map(c =>
    c.toString().trim().toLowerCase()
  );

  filtered = filtered.filter((sale) => {
    if (!sale.productCategory) return false;

    return normalizedCategories.includes(
      sale.productCategory.toString().trim().toLowerCase()
    );
  });
}


  // Tags 
  if (tags && tags.length > 0) {
    filtered = filtered.filter((sale) => {
      if (!sale.tags || sale.tags.length === 0) return false;
      return sale.tags.some((t) => tags.includes(t));
    });
  }

  // Payment
if (paymentMethods && paymentMethods.length > 0) {
  const normalizedPayments = paymentMethods.map(p =>
    p.toString().trim().toLowerCase()
  );

  filtered = filtered.filter((sale) => {
    if (!sale.paymentMethod) return false;

    return normalizedPayments.includes(
      sale.paymentMethod.toString().trim().toLowerCase()
    );
  });
}


  // Date range
  if (startDate || endDate) {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    filtered = filtered.filter((sale) => {
      if (!sale.date) return false;
      if (start && sale.date < start) return false;
      if (end && sale.date > end) return false;
      return true;
    });
  }

  // Sorting
  const sortKey = sortBy || 'date';
  const order = sortOrder === 'asc' ? 1 : -1; 

  filtered.sort((a, b) => {
    let valA;
    let valB;

    if (sortKey === 'quantity') {
      valA = a.quantity || 0;
      valB = b.quantity || 0;
    } else if (sortKey === 'customerName') {
      valA = a.customerName || '';
      valB = b.customerName || '';
      return valA.localeCompare(valB) * order;
    } else {
      valA = a.date ? a.date.getTime() : 0;
      valB = b.date ? b.date.getTime() : 0;
    }

    if (valA < valB) return -1 * order;
    if (valA > valB) return 1 * order;
    return 0;
  });

  // Pagination
  const pageNum = page || 1;
  const pageSize = limit || 10;
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const startIndex = (pageNum - 1) * pageSize;
  const pageData = filtered.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    data: pageData,
    meta: {
      page: pageNum,
      limit: pageSize,
      totalItems,
      totalPages,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1,
    },
  };
}

function buildOptionsFromQuery(query) {
  const regions = parseListParam(query.region);
  const genders = parseListParam(query.gender);
  const categories = parseListParam(query.category);
  const tags = parseListParam(query.tags);
  const paymentMethods = parseListParam(query.paymentMethod);

  const minAge = query.minAge ? parseNumber(query.minAge) : null;
  const maxAge = query.maxAge ? parseNumber(query.maxAge) : null;

  const page = query.page ? parseNumber(query.page, 1) : 1;
  const limit = query.limit ? parseNumber(query.limit, 10) : 10;
  let finalMinAge = minAge;
  let finalMaxAge = maxAge;
  if (
    finalMinAge !== null &&
    finalMaxAge !== null &&
    finalMinAge > finalMaxAge
  ) {
    const temp = finalMinAge;
    finalMinAge = finalMaxAge;
    finalMaxAge = temp;
  }

  return {
    search: query.search || '',
    regions,
    genders,
    minAge: finalMinAge,
    maxAge: finalMaxAge,
    categories,
    tags,
    paymentMethods,
    startDate: query.startDate || null,
    endDate: query.endDate || null,
    sortBy: query.sortBy || 'date',
    sortOrder: query.sortOrder || 'desc',
    page,
    limit,
  };
}

module.exports = {
  getSales,
  buildOptionsFromQuery,
};
