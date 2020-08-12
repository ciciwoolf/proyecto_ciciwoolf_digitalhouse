/*

install 

backend
npm i axios

frontend
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.1/axios.min.js"></script>


const default = {
    baseURL: 'www.spotify.com/api/',
    timeout: 4000
};
module.exports = default;


This goes in...

const axios = require('axios');
const default = './default');
const url = 'artista';

const artistRequest = {
    getArtista: function(id) {
        return axios({
            ...defaults,
            method: 'get',
            url: '${url}/${id};
        })
    }
}
module.exports = artistRequest;

store in a variable: 

const artistRequest = require('./requests/src/artistsRequest');

artistRequest.getArtista(59).then(response => {
    console.log(response.data);
}) .catch(error => {
    console.log(error.response)
})
})

*/