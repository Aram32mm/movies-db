import httpInstance from "../httpInstance";

export const getTopRatedMovies = async () => {
    let res: any;
    const endpoint = `top_rated?api_key=${process.env.REACT_APP_MDB_API_KEY}&lannguage=en-US`;
    await httpInstance
        .get(endpoint)
        .then((response) => {
             res = response;
         })
         .catch((err) => {
            res = err.response;
         });
    return res;
};