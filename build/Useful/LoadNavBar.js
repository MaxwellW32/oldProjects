"use strict";
//load navbar
document.addEventListener("DOMContentLoaded", function () {
    function getNavBar() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/menus/navbar.html', true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4)
                return;
            if (this.status !== 200)
                return; // or whatever error handling you want
            const myNavHolder = document.querySelector('.holdNavBar');
            const nav = document.createElement("nav");
            nav.innerHTML = this.responseText;
            myNavHolder.parentNode?.replaceChild(nav, myNavHolder);
        };
        xhr.send();
    }
    function getFooter() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/menus/footer.html', true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status !== 200) {
                return;
            }
            const myNavHolder = document.querySelector('.holdFooter');
            const nav = document.createElement("footer");
            nav.innerHTML = this.responseText;
            myNavHolder.parentNode?.replaceChild(nav, myNavHolder);
        };
        xhr.send();
    }
    getNavBar();
    getFooter();
});
