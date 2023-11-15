/*
 * Write your client - side JS code in this file.Don't forget to include your
    * name and @oregonstate.edu email address below.
 *
 * Name: Samuel Donovan
    * Email: donovsam@oregonstate.edu
 * /*/

//varibles(filter)
var posts = document.getElementById('posts');
var filterB = document.getElementById('filter-update-button');
var filterLV = document.getElementById('filter-min-price');
var filterUV = document.getElementById('filter-max-price');
var filterC = document.getElementById('filter-city');
var filterCond = document.getElementsByName("filter-condition");
var filterT = document.getElementById('filter-text');

 //varibles(sell)

 var oButton = document.getElementById('sell-something-button');
 var closeButton = document.getElementById('modal-close');
 var pButton = document.getElementById('modal-accept');
 var cancelButton = document.getElementById('modal-cancel');
 var sell = document.getElementById('sell-something-modal');
 var background = document.getElementById('modal-backdrop');
 var purl = document.getElementById('post-photo-input');
 var itemD = document.getElementById('post-text-input');
 var condition = document.getElementsByName('post-condition');
 var city = document.getElementById('post-city-input');
 var sellp = document.getElementById('post-price-input');

 //functions
function cond() {
    for (var i = 0; i < condition.length; i++) {
        if (condition[i].checked == true) {
            return condition[i].value;
        }
    }


}
function closeSellModal() {
    sell.style.display = 'none';
    background.style.display = 'none';
    itemD.value = "";
    purl.value = "";
    sellp.value = "";
    city.value = "";
    condition[0].checked = true;
}

function openSellModal() {
    sell.style.display = 'block';
    background.style.display = 'block';
    
}
function parse() {
if (itemD.value == "" || purl.value == "" || sellp.value == "" || city.value == "") {
    return true;
}
else {
    return false;
}
}
function postbutton() {
    if (parse() == true) {
        alert("not specified")
    }
    else {
        createNewPost(itemD.value, purl.value, sellp.value, city.value, cond());
        closeSellModal();
    }
}

function createNewPost(itemD, purl, sellp, city, condition) {
    var postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.setAttribute('data-price', sellp);
    postDiv.setAttribute('data-city', city);
    postDiv.setAttribute('data-condition', condition);

    var postContentsDiv = document.createElement('div');
    postContentsDiv.classList.add('post-contents');
    postDiv.appendChild(postContentsDiv);

    var postImageContainerDiv = document.createElement('div');
    postImageContainerDiv.classList.add('post-image-container');
    postContentsDiv.appendChild(postImageContainerDiv);

    var imageImg = document.createElement('img');
    imageImg.src = purl;
    postImageContainerDiv.appendChild(imageImg);

    var postInfoContainerDiv = document.createElement('div');
    postInfoContainerDiv.classList.add('post-info-container');
    postContentsDiv.appendChild(postInfoContainerDiv);

    var linkA = document.createElement('a');
    linkA.classList.add('post-title');
    linkA.href = "#";
    linkA.textContent = itemD;
    postInfoContainerDiv.appendChild(linkA);

    var postPriceSpan = document.createElement('span');
    postPriceSpan.classList.add('post-price');
    postPriceSpan.textContent = "$" + sellp;
    postInfoContainerDiv.appendChild(postPriceSpan);

    var postCitySpan = document.createElement('span');
    postCitySpan.classList.add('post-city');
    postCitySpan.textContent = "(" + city + ")";
    postInfoContainerDiv.appendChild(postCitySpan);


   
   posts.appendChild(postDiv);
    
}



//filtered functions
function filterTextBox() {
    var postSelector = document.querySelectorAll('.post');
    var clean = cleanText(filterT.value)
    var text = clean.toLowerCase();

    for (var i = 0; i < postSelector.length; i++) {
        if (postSelector[i].querySelector(".post-title").textContent.toLowerCase().indexOf(text) == -1) {
            postSelector[i].parentNode.removeChild(postSelector[i]);
        }
    }
}


function filterValues() {
    var postSelector = document.querySelectorAll('.post');
    var min = Number(filterLV.value);
    var max = Number(filterUV.value);

    if (max == '') {
        max = Number.MAX_VALUE;
    }
    if (min == '') {
        min = Number.MIN_VALUE;
    }

    for (var i = 0; i < postSelector.length; i++) {
        if (Number(postSelector[i].getAttribute("data-price")) < min || Number(postSelector[i].getAttribute("data-price")) > max) {
            postSelector[i].parentNode.removeChild(postSelector[i]);
        }
    }
}

function filterCities() {
    var postSelector = document.querySelectorAll('.post');
    var city = filterC.value;

    if (city != 0) {
        for (var i = 0; i < postSelector.length; i++) {
            if (city != postSelector[i].getAttribute("data-city")) {
                postSelector[i].parentNode.removeChild(postSelector[i]);
            }
        }
    }
}


function filterConditions() {
    var postSelector = document.querySelectorAll('.post');

    if (findCondition() != 0) {
        for (var i = 0; i < postSelector.length; i++) {
            if (findCondition().indexOf(postSelector[i].getAttribute("data-condition")) == -1) {
                postSelector[i].parentNode.removeChild(postSelector[i]);
            }
        }
    }
}


function findCondition() {
    var conditionArray = [];

    for (var i = 0; i < filterCond.length; i++) {
        if (filterCond[i].checked != false) {
            conditionArray.push(filterCond[i].value);
        }
    }

    if (conditionArray.length != 0) {
        return conditionArray;
    }
    else {
        return 0;
    }
}


function cleanText(text) {
    var clean = text.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '');

    return clean;
}

function filteredPosts() {
    filterTextBox();
    filterValues();
    filterCities();
    filterConditions();
}

oButton.addEventListener('click', openSellModal);
closeButton.addEventListener('click', closeSellModal);
cancelButton.addEventListener('click', closeSellModal);
pButton.addEventListener('click', postbutton);
filterB.addEventListener('click', filteredPosts);