const app = require('../tourServer');
const assert = require('chai').assert;
const request = require('supertest'); 
const cookie = require('cookie');
const chai = require('chai');
let agent = request.agent(app); //Use across many requests

describe('Get Tour Tests', function () {
	let response;
	let tours = null;
	before(async function(){
		response = await request(app).get('/tours');
	})
	it('Everything is OK', async function(){
		assert.equal(response.status, 200);
	});
	it('Returns an array', function(){
		tours = JSON.parse(response.text);
		assert.isArray(tours);
	});
	it('All tour elements have name and date', function(){
		tours.forEach(function(tour){
			assert.containsAllKeys(tour, ['Name', 'Date']);
		});
	});
	it('Cookie with appropriate name is returned', function(){
		let cookies = response.header['set-cookie'].map(cookie.parse);
		let mycookie = cookies.filter(c => c.hasOwnProperty('TourSid'));
		assert.notEmpty(mycookie);
	});
})


describe('Get an Individual Tour', function () {
	let response;
    let resp;
	let tours = null;
    const arr = [];
	before(async function(){
        resp = await request(app).get('/tours');
        tours = JSON.parse(resp.text);
        for(var i=0;i<2;i++){
            arr.push(tours[i]._id);
        }  
	})
    
	it('Get an existing Tour', async function(){
         console.log('Trying Path');
         response = await request(app).get(`/tours/${arr[0]}`);
		 assert.equal(response.status, 200);
	});
    it('Get another existing Tour', async function(){
         console.log('Trying Path');
         response = await request(app).get(`/tours/${arr[1]}`);
		 assert.equal(response.status, 200);
	});
    
    it('Try getting a non-existant Tour', async function(){
         console.log('Trying Path');
         response = await request(app).get(`/tours/xzLSq1mZCchYhKdLJH`);
		 assert.equal(response.status, 401);
	});
});
