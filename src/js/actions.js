'use strict';

document.addEventListener("DOMContentLoaded", function(event) {
  mainMenuOpen();
  productOpen();
});

function mainMenuOpen() {
  var menu = document.querySelectorAll('.mainMenu');
  var menuButton = document.querySelectorAll('.mainMenu__button');

  if (menuButton.length > 0) {
    menuButton.forEach(function (mainButton) {

      mainButton.addEventListener("click", function (event) {

        this.classList.toggle('mainMenu__button_open');
        menu.forEach(function(menuItem) {          
          menuItem.classList.toggle('mainMenu_open');
        });
      });
    });
  }
};

function productOpen() {
  var products = document.querySelectorAll('.productCase');

  if (products.length > 0) {
    products.forEach(function (product) {
      product.addEventListener("click", function (event) { 
        var thisOpened = this.classList.contains('productCase_open');       
        this.parentElement.querySelectorAll('.productCase_open').forEach(function (elem) {
          elem.classList.remove('productCase_open')
        });

        if (!thisOpened) {
          this.classList.add("productCase_open")
      }
      });
    });
  }
};

