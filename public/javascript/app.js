const app = angular.module('PantryApp', []);

app.controller('MainController', ['$http', function($http){
	// Models. Initial state
	let login = false;
	let signup = false;
	this.optionTU = false;

	this.hello = 'oh hai!';
	this.loggedIn = false;
	this.loginModel = false;
	this.signupModel = false;
	this.colorKey = true;
  this.foods = [];
  this.formData = {};
	this.error = "";
	this.currentUserId = null;
	this.userId = null;
	// this.userFormData = {};
	this.getStorage = "";
	this.getContainer = "";
	this.getUrl = "";
	this.localURL = "http://localhost:3000/";
	this.user = {};
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
			setTimeout(decodeIds, .1);
	  }).catch(reject => {
	    console.log("reject ", reject);
	  });
	};

	this.addFood = () => {
    console.log("Form Data ", this.formData);
		this.storage = this.formData.storage_id;
		this.container = this.formData.container_id;
		// data: { user: { username: userFormData.username, password: userFormData.password }},
		$http({
			method: 'Post',
			url: this.localURL + 'users/' + this.userId + '/storages/' + this.storage + '/containers/' + this.container + '/foods',
			data: this.formData
		}).then(response => {
			console.log('response: ', response.data.food);
			this.foods.unshift(response.data.food);
			this.formData = {};
			setTimeout(decodeIds, .1);
		}).catch(reject => {
			console.log('reject: ', reject);
		});
	};

	this.deleteFoods = (id) => {
		$http({
      method: 'DELETE',
      url: this.localURL + 'foods/' + id,
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

	editTransform = () => {

	}

	this.editFoods = (editForm) => {
		$http({
      method: 'PUT',
      url: this.localURL + 'foods/' + this.editForm._id,
      data: this.editForm
    }).then(response => {
      if ($location.url() === '/') {
        const updateByIndex = this.foods.findIndex(place => place._id === response.data._id)
        this.places.splice(updateByIndex , 1, response.data)
      }
      this.place = response.data;
      this.openShow(response.data);
    }).catch(err => console.error('Catch', err));
    this.edit = false;
    this.currentEdit = {};
	}

/////////////////////
	this.myFunction = () => {
		 console.log(this.foodItem);
		this.foodItem[0].style.backgroundColor = "blue";
	};

	decodeIds = () => {
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
// Auth
this.signup = (userFormData) => {
	$http({
		method: 'POST',
		url: this.localURL + 'users',
		data: { user: { username: userFormData.username, password: userFormData.password }},
	}).then(response => {
		console.log(response);
		this.error = '';
		this.user = response.data.user;
		this.loggedIn = true;
		signup = false;
		loginLogic();
		localStorage.setItem('token', JSON.stringify(response.data.token));
		this.userFormData = {};
	}).catch(reject => {
		console.log('reject: ', reject);
		if (reject.status == 500) {
			this.error = 'Username Taken';
			console.log('username already taken');
		} else if (reject.status == 700) {
			console.log("Peaches");
		}
	});
};

this.login = (userFormData) => {
	console.log(userFormData);

	$http({
		method: 'POST',
		url: this.localURL + 'users/login',
		data: { user: { username: userFormData.username, password: userFormData.password }},
	}).then(response => {
		console.log(response);
		console.log(response.data.status);
		if (response.data.status == 401) {
			console.log("Bad");
			this.error = 'Username and/or Password is incorrect';
		} else if (response.data.status == 200) {
			console.log("Good");
			this.error = '';
			this.user = response.data.user;
			this.userId = this.user.id;
			console.log("this is userId:", this.userId);
			this.loggedIn = true;
			login = false;
			loginLogic();
			localStorage.setItem('token', JSON.stringify(response.data.token));
			this.userFormData = {};
			this.getFoods("all", "all");
		}
		// console.log("this.user", this.user.username);
	}).catch(reject => {
		console.log('reject: ', reject);
		console.log("poop");
	});
};

this.getUsers = () => {
	$http({
		url: this.localURL + 'users',
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
		}
	}).then((response) => {
		console.log(response);
		if (response.data.status == 401) {
			this.error = "Unauthorized";
		} else {
			this.users = response.data;
		}
	});
};

this.logout = () => {
	localStorage.clear('token');
	location.reload();
}




	// Models

	authModels = (btn) => {
		if (btn == 'login') {
			// console.log(btn);
			login = !login;
			signup = false;
			// loginLogic();
		} else if (btn == 'signup') {
			// console.log(btn);
			signup = !signup;
			login = false;
			// loginLogic();
		}
		loginLogic();
	}

	loginLogic = () => {
		const loginModel = document.getElementById('loginModel');
		const signUpModel = document.getElementById('signUpModel');
		// console.log("Login", login);

		if (login == true) {
			loginModel.style.display = 'block';
		} else if (login == false) {
			loginModel.style.display = 'none';
		};

		if (signup == true) {
			signUpModel.style.display = 'block';
		} else if (signup == false) {
			signUpModel.style.display = 'none';
		};
	};

}]);
