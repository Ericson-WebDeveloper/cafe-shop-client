import axios, { isAxiosError } from "axios";
import { ErrorResponseF, IJoiType } from '../api/ResponseType';

// https://erixzon-website.online
// http://localhost:8000

const axs = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

axs.defaults.withCredentials = true

// Add a request interceptor
axs.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axs.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let errors: ErrorResponseF = {
        status: 400,
        errors: [],
        message: '',
        error: ''
    };

    if (isAxiosError(error) && error.response) {
        
       if(error.response.status == 422 && error.response.data) {
         // Check if it's a Joi validation error
         if (error.response.data.errors && error.response.data.errors?.details) {
            // You can handle the Joi validation error here
            // For example, you can extract details and handle them accordingly
            const validationErrors = error.response.data.errors?.details.map((detail: IJoiType) => detail.message);
            // const errorMessage = validationErrors.join('\n');
            errors = {
                status: 422,
                errors: validationErrors,
                message: error.response.data.message ? error.response.data.message : 'Error Server Contact or Report to Support Team.'
            }
            // // Handle the error message as needed (e.g., display a notification)
            // console.error('Joi validation error:', errorMessage);
          }
       } else if((error.response.status == 400 || error.response.status == 401 || error.response.status == 403 || error.response.status == 404) && error.response.data) {
        // Check if it's a Joi validation error
        if (error.response.data.message) {
           errors = {
               status: error.response.status,
               errors: [],
               message: error.response.data.message ? error.response.data.message : 'Error Server Contact or Report to Support Team.'
           }
           // // Handle the error message as needed (e.g., display a notification)
           // console.error('Joi validation error:', errorMessage);
         }
      } else if(error.response.status == 500 && error.response.data) {
        let validationErrors = [];
        if (error.response.data.errors && error.response.data.errors?.details) {
             validationErrors = error.response.data.errors?.details.map((detail: IJoiType) => detail.message);
            
        }
        errors = {
            status: 422,
            errors: validationErrors || [],
            message: error.response.data.message ? error.response.data.message : 'Error Server Contact or Report to Support Team.'
        }
        
      } 
      else {
        errors = {
            status: 500,
            errors: [],
            message: 'Error Server Contact or Report to Support Team.'
        }
      }
    } else {
        errors = {
            status: 500,
            errors: [],
            message: 'Error Server Contact or Report to Support Team.'
        }
    }
    return Promise.reject(errors);
});


export default axs;