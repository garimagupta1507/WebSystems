const app = require('../tourServer');
const assert = require('chai').assert;
const request = require('supertest'); 
const cookie = require('cookie');

describe('Add Tour Tests', function () {
	let response;
	let tours = null;
	let myCookie = null;
	let agent = request.agent(app); //Use across many requests
	
	before(async function(){
		response = await agent.get('/tours');
	})
    
    //Add Tours via Admin
    describe('Adding Tour', function() {
		before(async function(){
			response = await agent.post('/login')
				.send({"email": "sided1830@outlook.com", "password": "C}m8\"L,F"});
            //console.log(JSON.parse(response.text));
		});
        
        it('Count Before Admin Addition', async function(){
			response = await request(app).get('/count/tour');
            console.log(`Before Adding Tours: ${JSON.parse(response.text)}`);
			assert.equal(response.status, 200);
		});
        
        it('Login as Admin, add Tour', async function(){
            response = await agent.post('/addTours').send({
              "Name": "Rack Mountains",
              "Date": "Starting May 2020"
            });
			assert.equal(response.status, 200);
		});
        it('Count After Admin Addition', async function(){
			response = await request(app).get('/count/tour');
            console.log(`After Added Tours: ${JSON.parse(response.text)}`);
			assert.equal(response.status, 200);
		});
        
         it('Guest try to add Tour', async function(){
            agent = request.agent(app); 
            response = await agent.post('/login')
				.send({"email": "ox1815@live.com", "password": "h$$gCf{'"});
             response = await agent.post('/addTours').send({
              "Name": "Rack Mountains",
              "Date": "Starting May 2020"
            });
			assert.equal(response.status, 200);
		});
	});
});
	
describe('Delete Tour Tests', function () {
	let response;
	let tours = null;
	let myCookie = null;
	let agent = request.agent(app); //Use across many requests
	
	before(async function(){
		response = await agent.get('/tours');
	})
    
    //Add Tours via Admin
	describe('Deleting Tour', function() {
		before(async function(){
			response = await agent.post('/login')
				.send({"email": "sided1830@outlook.com", "password": "C}m8\"L,F"});
            //console.log(JSON.parse(response.text));
		});
        
        it('Count Before Admin Deletion', async function(){
			response = await request(app).get('/count/tour');
            console.log(`Before Deleting Tours: ${JSON.parse(response.text)}`);
			assert.equal(response.status, 200);
		});
        
        it('Admin try to delete Tour', async function(){
            response = await agent.delete('/deleteTours').send({
            "_id" : "Qk3lT7BekLAKMyGI"
            });
			assert.equal(response.status, 200);
		});
        it('Count After Admin Deletion', async function(){
			response = await request(app).get('/count/tour');
            console.log(`After Deleting Tours: ${JSON.parse(response.text)}`);
			assert.equal(response.status, 200);
		});
        
           it('Guest try to delete Tour', async function(){
               agent = request.agent(app); 
            response = await agent.post('/login')
				.send({"email": "ox1815@live.com", "password": "h$$gCf{'"});
            response = await agent.delete('/deleteTours').send({
            "_id" : "ypHS0iMvinmxc1i9"
            });
			assert.equal(response.status, 200);
		});
	});
    
})