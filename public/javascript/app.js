const app = angular.module('PantryApp', []);

app.controller('MainController', ['$http', function($http){
	// Models. Initial state
	this.hello = 'oh hai!';
  this.foods = [];
  this.formData = {};
  console.log("What!");

	const GetFoods = () => {
	  $http({
	    method: 'GET',
	    url: 'http://localhost:3000/foods',
	  }).then(response => {
	    console.log("response: ", response);
	    this.foods = response.data.foods;

	  }).catch(reject => {
	    console.log("reject ", reject);
	  });
	};

	this.addFood = () => {
    console.log("Form Data ", this.formData);
		$http({
			method: 'Post',
			url: 'http://localhost:3000/storages/' + this.storage + '/containers/' + this.container + '/foods',
			data: this.formData
		}).then(response => {
			console.log('response: ', response.data.food);
			this.foods.unshift(response.data.food);
		}).catch(reject => {
			console.log('reject: ', reject);
		});
	};

  GetFoods();
}]);
