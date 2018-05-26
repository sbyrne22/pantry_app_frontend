console.log('Animation Triggers JS');

let tabUp = false

runAnimation = (elementID) => {
  // if (elementID == 'optionsTabUp') {
  console.log("this is id: ", elementID);
    let element = document.getElementById(elementID);
    if (tabUp == false) {
      element.classList.remove('optionsAnimateDown');
      element.classList.add('optionsAnimateUp');
    } else if (tabUp == true) {
      element.classList.remove('optionsAnimateUp');
      element.classList.add('optionsAnimateDown');
    };
    tabUp = !tabUp
  // }
};

// openTab = (tab) => {
//   if (tab == 'options') {
//     // this.optionTU = !this.optionTU;
//     // console.log(this.optionTU);
//     // foodTU = false;
//     runAnimation(tab);
//   }
// }
