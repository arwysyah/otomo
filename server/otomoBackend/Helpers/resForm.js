module.exports = {
  getAll: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },
  getArticles: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },
  filterProduct: (res,response, name)=>{
    const form = {
        name,
        response,
    };
    res.json(form);
  },
  postProduct: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },
  deleteProduct: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },
  putProduct: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },
  getHistory: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },
  postHistory: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },

  getWishlist: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },
  postWishlist: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  },
  deleteWishlist: (res, response, status) => {
    const form = {
      status,
      response
    };
    res.json(form);
  }
};
