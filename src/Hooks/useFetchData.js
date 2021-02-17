import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (base) => {
    console.log("called fetch");
    const [Result , setResult] = useState(null);
    useEffect(() => {
        axios.get(`https://api.exchangeratesapi.io/latest&base=${base}`)
        .then((result) => {
            setResult(result.data.rates);
        })
        .catch(function(error) {
            console.log(error);
        });
    }, [base]);
    
    return Promise.resolve(Result);
}
 
export default useFetchData;
