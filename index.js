const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.get('/api/v1/places', (req, res) => {
  const coords = `40.740627371382296, -73.91768744610071`;
  const keyword = 'craft_beer';
  const rankby = 'distance';

  let results = [];

  // const requestPlaces = params => {
  //   axios(params)
  //     .then(response => {
  //       // TO-DO: Refactor
  //       if (response.data.status === 'ZERO_RESULTS') {
  //         res.status(200).json({});
  //       } else if (response.data.status === 'OK') {
  //         console.log(response.data);
  //         results.push(...response.data.results);
  //         return results;
  //       } else {
  //         if (response.data.error_message) {
  //           console.log(response.data);
  //           res.status(500).json(response.data.error_message);
  //         } else {
  //           console.log(response.data);
  //           res.status(500).json(response.data);
  //         }
  //       }
  //     })
  //     .then(data => {
  //       res.status(200).json(data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res.status(500);
  //     });
  // };

  const requestNextPage = nextPageToken => {
    axios
      .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_API_KEY}`)
      .then(response => {
        console.log('IN REQ NEXT PAGE');
        //console.log(response);
        results.push(...response.data.results);
        //console.log(results);
        console.log('Results:' + results.length);
        console.log(response.data.next_page_token);
        if (response.data.next_page_token) {
          return response.data.next_page_token;
        } else {
          return null;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const requestPlaces = () => {
    axios
      .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&keyword=${keyword}&rankby=${rankby}&key=${process.env.GOOGLE_API_KEY}`)
      .then(response => {
        results.push(...response.data.results);
        //console.log(results);
        console.log('Results:' + results.length);
        let next_page_token = response.data.next_page_token;
        console.log(next_page_token);
        if (next_page_token) {
          setTimeout(() => {
            console.log('CALLING REQ NEXT PAGE');
            next_page_token = requestNextPage(response.data.next_page_token);
            console.log('AFTER REQ NEXT PAGE');
            console.log(next_page_token);
          }, 5000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Make initial request
  // If response.data.next_page_token
  // Make another request
  // If

  requestPlaces();
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
