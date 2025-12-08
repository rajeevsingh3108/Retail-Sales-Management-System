import Sale from "../models/Sale.js";

function parseListParam(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseNumber(value, fallback = null) {
  const n = Number(value);
  return Number.isNaN(n) ? fallback : n;
}

console.log(query);
export function buildOptionsFromQuery(query) {
  console.log(query);
  const regions = parseListParam(query.region);
  const genders = parseListParam(query.gender);
  const categories = parseListParam(query.category);
  const tags = parseListParam(query.tags);
  const paymentMethods = parseListParam(query.paymentMethod);

  const minAge = query.minAge ? parseNumber(query.minAge) : null;
  const maxAge = query.maxAge ? parseNumber(query.maxAge) : null;

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

  const page = query.page ? parseNumber(query.page, 1) : 1;
  const limit = query.limit ? parseNumber(query.limit, 10) : 10;

  return {
    search: query.search || "",
    regions,
    genders,
    minAge: finalMinAge,
    maxAge: finalMaxAge,
    categories,
    tags,
    paymentMethods,
    startDate: query.startDate || null,
    endDate: query.endDate || null,
    sortBy: query.sortBy || "date",
    sortOrder: query.sortOrder || "desc",
    page,
    limit,
  };
}

export async function getSales(options) {
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

  const query = {};
  if (search) {
    query.$or = [
      { "Customer Name": { $regex: search, $options: "i" } },
      { "Phone Number": { $regex: search, $options: "i" } },
    ];
  }
  if (regions.length > 0) {
    query["Customer Region"] = { $in: regions };
  }

  if (genders.length > 0) {
    query["Gender"] = { $in: genders };
  }

  if (categories.length > 0) {
    query["Product Category"] = { $in: categories };
  }

  if (paymentMethods.length > 0) {
    query["Payment Method"] = { $in: paymentMethods };
  }
  if (minAge !== null || maxAge !== null) {
    query["Age"] = {};
    if (minAge !== null) query["Age"].$gte = minAge;
    if (maxAge !== null) query["Age"].$lte = maxAge;
  }
  if (startDate || endDate) {
    query["Date"] = {};
    if (startDate) query["Date"].$gte = new Date(startDate);
    if (endDate) query["Date"].$lte = new Date(endDate);
  }
  if (tags.length > 0) {
    query["Tags"] = {
      $regex: tags.join("|"),
      $options: "i",
    };
  }

  const sort = {};
  const order = sortOrder === "asc" ? 1 : -1;

  if (sortBy === "quantity") {
    sort["Quantity"] = order;
  } else if (sortBy === "customerName") {
    sort["Customer Name"] = order;
  } else {
    sort["Date"] = order;
  }

  const skip = (page - 1) * limit;

  const totalItems = await Sale.countDocuments(query);

  const data = await Sale.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  console.log("SALES DATA FETCHED:");
  console.log("Total records returned:", data.length);
  console.log("Sample record:", data[0]);

  const totalPages = Math.ceil(totalItems / limit) || 1;

  return {
    data,
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}
