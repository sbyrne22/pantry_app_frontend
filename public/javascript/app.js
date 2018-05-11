const app = angular.module('PantryApp', []);

app.controller('MainController', ['$http', function($http){
	// Models. Initial state
	this.hello = 'oh hai!';
	this.colorKey = true;
  this.foods = [];
  this.formData = {};
	this.getStorage = "";
	this.getContainer = "";
	this.getUrl = "";
	this.localURL = "http://localhost:3000/foods/";
	this.selectOrder = "";
	this.foodStorage = document.getElementsByClassName("storageType");
	this.foodItem = document.body.getElementsByClassName('foodItem');
  console.log("What!");

	this.getFoods = (storage, container) => {
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
			setTimeout(this.decodeIds, .1);
	  }).catch(reject => {
	    console.log("reject ", reject);
	  });
	};

	this.addFood = () => {
    console.log("Form Data ", this.formData);
		this.storage = this.formData.storage_id;
		this.container = this.formData.container_id;
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

	this.deleteFoods = (id) => {
		$http({
      method: 'DELETE',
      url: this.localURL + id,
    }).then(response => {
			console.log("ID: ", id);
			const findId = () => {

			}
        const removeByIndex = this.foods.findIndex(x => x.id === id);
				console.log("Index to be Deleted", removeByIndex);
        this.foods.splice(removeByIndex, 1);
    }, error => {
      console.error(error.message)
    }).catch(err => console.error('Catch', err));
	}

	this.editFoods = () => {

	}

/////////////////////
	this.myFunction = () => {
		 console.log(this.foodItem);
		this.foodItem[0].style.backgroundColor = "blue";
	};

	this.decodeIds = () => {
		if (this.foodItem.length == 0) {
			console.log("there are no foodItems");
		} else {
			console.log("There are", this.foodItem.length, "foodItems");

			console.log("Hey");
			for (let i = 0; i < this.foodItem.length; i ++) {
				this.foodItemChildren = this.foodItem[i].children
				console.log("this is i: ", i);
				console.log("This food item has ", this.foodItem[i].children.length, "Children");
				console.log(this.foodItemChildren[1].innerHTML);
				if (this.foodItemChildren[1].innerHTML == 1) {
					// this.foodItemChildren[1].innerHTML = "Refridgerator";
					this.foodItemChildren[0].style.backgroundColor = "#646663";
					this.foodItemChildren[2].style.backgroundColor = "rgba(100, 102, 99, 1)";
					this.foodItemChildren[3].style.backgroundColor = "#646663";
				} else if (this.foodItemChildren[1].innerHTML == 2) {
					// this.foodItemChildren[2].innerHTML = "Freezer";
					this.foodItemChildren[0].style.backgroundColor = "#E0FBFC";
					this.foodItemChildren[2].style.backgroundColor = "rgba(224, 251, 252, 1)";
					this.foodItemChildren[3].style.backgroundColor = "#E0FBFC";
				} else if (this.foodItemChildren[1].innerHTML == 3) {
					// this.foodItemChildren[2].innerHTML = "Pantry";
					this.foodItemChildren[0].style.backgroundColor = "#846452";
					this.foodItemChildren[2].style.backgroundColor = "rgba(132, 100, 82, 1)";
					this.foodItemChildren[3].style.backgroundColor = "#846452";
				};

				if (this.foodItemChildren[0].children[0].innerHTML == 1) {
					this.foodItemChildren[0].children[0].innerHTML = "Box";
				} else if (this.foodItemChildren[0].children[0].innerHTML == 2) {
					this.foodItemChildren[0].children[0].innerHTML = "Can";
				} else if (this.foodItemChildren[0].children[0].innerHTML == 3) {
					this.foodItemChildren[0].children[0].innerHTML = "Bag";
				};
			};
		};
	};
/////////////////////

  this.getFoods("all", "all");
}]);
