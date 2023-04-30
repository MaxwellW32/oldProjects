"use strict";
//load navbar
document.addEventListener("DOMContentLoaded", function () {
    function getNavBar() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'menus/navbar.html', true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4)
                return;
            if (this.status !== 200)
                return; // or whatever error handling you want
            const myNav = document.querySelector('.holdNavBar');
            myNav.innerHTML = this.responseText;
        };
        xhr.send();
    }
    function getFooter() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'menus/footer.html', true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4)
                return;
            if (this.status !== 200)
                return; // or whatever error handling you want
            const myNav = document.querySelector('.holdFooter');
            myNav.innerHTML = this.responseText;
        };
        xhr.send();
    }
    getNavBar();
    getFooter();
});
