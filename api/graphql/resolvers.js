const Sequelize = require('sequelize');
const { QueryTypes, Op } = require('sequelize');

const onQuery = async (log, conn) => {
  let str = log
    .toLowerCase()
    .replace(/(:?executing\s\(\D+\):\s)/g, '')
    .replace(/(:?(offset)\s\d+)|(:?(limit)\s\d+)/g, '');
  let totalRows = await conn
    .query(str, { type: QueryTypes.SELECT })
    .then((res) => res.length);
  // console.log('check log query === ', JSON.stringify({log, str, totalRows}))
  return totalRows;
};

// {isSearch = true, isOrder = true, isPaginate = true
const queryWrapper = (query, args) => {
  let order;
  let where;
  let paginate = `limit :limit offset :offset`;
  try {
    order = args._order ? JSON.parse(args._order) : {};
    let search = args._search ? JSON.parse(args._search) : {};
    where = [search.key, search.value];
    // where = `where (lower(cast((p.${where[0]}) as text)))  like '%'||(lower(cast('${where[1]}' as text)))||'%'`
    where = `where to_tsvector(lower(cast(concat(${where[0]}) as text))) @@ plainto_tsquery(lower(cast('${where[1]}' as text)))`;
    order = !!order.col ? [order.col || 'id', order.type || 'asc'] : null;
    if (order) order = `order by ${order[0]} ${order[1]}`;
    if (!search.key) where = null;
    // if (!order.col) order = null
    query += ` ${where || ''} `;
    query += `${order || ''} `;
  } catch (e) {
    console.log('ERR_QUERY_PROPERTY', e.message);
  }
  query += ` ${paginate || ''} `;
  return query;
};

const connTableWrapper = (conn, query, args, options = {}) => {
  let variables = {
    limit: args.limit || 10,
    offset: args.offset || 0,
  };
  variables = { ...variables, ...options };
  return conn.query(queryWrapper(query, args), {
    type: QueryTypes.SELECT,
    replacements: variables,
    logging: (log) => onQuery(log, conn),
  });
};

module.exports = {
  Properties: async (args, { db, conn }) => {
    let query = `select p.*
      --(select image_url from image_property ip where ip.propertyid = p.id limit 1) as cover
      from property p`;

    return await connTableWrapper(conn, query, args);
  },
  Accounts: async (args, { conn }) => {
    console.log('artgs', { args });
    let query = `select * from account a`;
    return await connTableWrapper(conn, query, args);
  },
  Property: async (args, { conn }) => {
    let query = `select p.*,
      array_to_json(array(select ip.image_url from image_property ip where ip.propertyid = p.id)) as images,
      to_json(aa) as agent
      from property p
      left join account aa on p.account_id = aa.id
      where p.id = :id limit 1`;
    let item = await conn.query(query, {
      replacements: { id: Number(args.id) },
      type: QueryTypes.SELECT,
    });
    // console.log('item', item)
    return item[0] || {};
  },
  PropertyImages: async (args, { conn }) => {
    let item = await conn.query(
      `select * from image_property ip where ip.propertyid = :id`,
      { replacements: { id: Number(args.id) }, type: QueryTypes.SELECT }
    );
    return item || {};
  },
  SelfProperty: async (args, { conn }) => {
    let query = `select p.*,
    array_to_json(array(select ip.image_url from image_property ip where ip.propertyid = p.id)) as images,
    to_json(a) as agent
    from property p inner join account a on a.id = p.account_id where p.account_id = a.id`;
    let item = await conn.query(query, {
      replacements: {
        id: Number(args.id),
      },
      type: QueryTypes.SELECT,
    });
    return item // {}
  },
};
