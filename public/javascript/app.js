const app = angular.module('PantryApp', []);

app.controller('MainController', ['$http', function($http){
	// Models. Initial state
	this.hello = 'oh hai!';
  this.foods = [];
  this.formData = {};
	this.getStorage = "";
	this.getContainer = "";
	this.getUrl = "";
  console.log("What!");

	this.GetFoods = (storage, container) => {
		console.log("storage = ", storage, "Container = ", container);
		if (((storage == "all") || (storage == null)) && ((container == "all") || (container == null))) {
			this.getUrl = "http://localhost:3000/foods"
			console.log("Url = ", this.getUrl);
		} else if ((container == "all") || (container == null)){
			this.getUrl = "http://localhost:3000/" + storage
			console.log("Url = ", this.getUrl);
		} else if ((storage == "all") || (storage == null)){
			this.getUrl = "http://localhost:3000/" + container
			console.log("Url = ", this.getUrl);
		}
	  $http({
	    method: 'GET',
			url: this.getUrl,

	  }).then(response => {
	    console.log("response: ", response);
	    this.foods = response.data.foods;
			// console.log(this.foods);
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

	// this.sort = (sortie) => {
	// 	if (sortie == 1) {
	// 		// sort by purchased_date
	// 	} else if (sortie == 2) {
	// 		// sort by expiration_date
	// 	}
	// }

/////////////////////
	this.myFunction = () => {
		 this.foodItem = document.body.getElementsByClassName('foodItem');
		 console.log(this.foodItem);
		this.foodItem[0].style.backgroundColor = "blue";
	};
/////////////////////

  this.GetFoods("all", "all");
}]);
