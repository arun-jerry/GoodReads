//config
var resultsData = {};
var featuredResults = "Dan Brown";

var items = [];

var loadXMLFile = (text, page = 1) => {
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      processResults(this);
    } else {
      document.getElementById("book-shelf").innerHTML = '<div class="loader">Loading...</div>';
    }
  };
  if(!hasCached()) {
    xmlhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?key=slyYiNHQ3ESGgJSTiHDErA&page="+page+"&q="+text, true);
    xmlhttp.send();    
  } else {
    debugger;
    var books = cachedBooksResult();
    document.getElementById("book-shelf").innerHTML = books[0].result;
  }

}
var processResults = (xml) => {
  var i;
  var xmlDoc = xml.responseXML;
  var totalResults = Number(xmlDoc.getElementsByTagName("total-results")[0].innerHTML);
  if(totalResults) {
    //if hidden from previous search with no result
    document.querySelector('.nav-container').classList.remove("hide");

    populatePageData(xmlDoc);
    seachInfo(xmlDoc);

    document.querySelector('#total-pages').innerHTML = resultsData.pagesCount;
    document.getElementById("book-shelf").innerHTML = generateHtmlData(xmlDoc);

  } else {
    displayNoresult();
  }
}

const search = document.querySelector('#search-good-reads');
search.addEventListener('submit', event => {
  event.preventDefault();
  const searchText = getSearchText();
  loadXMLFile(searchText);
  document.querySelector('#goto-page').value = 1;
});

const gotoPage = document.querySelector('#search-page');
gotoPage.addEventListener('submit', event => {
  event.preventDefault();
  const searchText = getSearchText();
  const page =  getCurrentPage();
  loadXMLFile(searchText, page);
});

const next = document.querySelector('#pagination-nav');
next.addEventListener('click', event => {
  const currentPage = getCurrentPage();
  const searchText = getSearchText();
  const actionType = event.target.id;
  var page = nextPageNumber(actionType, currentPage, resultsData);

  if(page <= resultsData.pagesCount && page > 0 && currentPage!= page) {
    document.querySelector('#goto-page').value = page;
    loadXMLFile(searchText, page);
  }
});

var nextPageNumber = (actionType, currentPage, resultsData) => {
  switch(actionType) {
    case "next":
    return currentPage + 1;
    break;
    case "prev":
    return currentPage - 1;
    break;
    case "first":
    return 1;
    break;
    case "last":
    return resultsData.pagesCount;
    break;
  }
}

var getSearchText = () => {
  return document.querySelector('#search-field').value;
}

var getCurrentPage = () => {
  return Number(document.querySelector('#goto-page').value);
}

var generateHtmlData = (xmlDoc) => {
    var resultHtml = "";
    var books = xmlDoc.getElementsByTagName("work");
    for (i = 0; i <books.length; i++) {
      var title = books[i].getElementsByTagName('best_book')[0].getElementsByTagName('title')[0].innerHTML;
      var id = books[i].getElementsByTagName('best_book')[0].getElementsByTagName('id')[0].innerHTML;
      var smallImage = books[i].getElementsByTagName('best_book')[0].getElementsByTagName('image_url')[0].innerHTML;
      resultHtml += "<div class='books pointer' alt='"+ title +"'><a target='_window' href='https://www.goodreads.com/book/isbn/"+id+"' alt='"+ title +"'><img src='"+ smallImage +"' title='"+ title +"'> </a></div>";
    }
    shouldCache(resultHtml);
    return resultHtml;
}

var populatePageData = (xmlDoc) => {
  return resultsData = {
      'startPosotion': Number(xmlDoc.getElementsByTagName("results-start")[0].innerHTML),
      'endPosition': Number(xmlDoc.getElementsByTagName("results-end")[0].innerHTML),
      'totalResults': Number(xmlDoc.getElementsByTagName("total-results")[0].innerHTML),
      'pagesCount': Math.ceil(Number(xmlDoc.getElementsByTagName("total-results")[0].innerHTML)/20)
    }
}

var seachInfo = (xmlDoc) => {
    var queryTime = Number(xmlDoc.getElementsByTagName("query-time-seconds")[0].innerHTML);
    var seachText = getSearchText();
    var isNotFeaturedResult = seachText != featuredResults;

    if(isNotFeaturedResult) {
      document.querySelector('.featuring i').innerHTML = 'Showing seach results of "'+ seachText +'". Time taken for search '+ queryTime;  
    } else {
      document.querySelector('.featuring i').innerHTML = "Featuring great collections from Dan Brown";
    }
}

var displayNoresult = () => {
    document.getElementById("book-shelf").innerHTML = "";
    document.querySelector('.featuring i').innerHTML = "Sorry no books to display";
    document.querySelector('.nav-container').classList.add("hide");
}

var hasCached = () => {
  return cachedBooksResult().length;
}

var cachedBooksResult = () => {
  var key = getSearchText()+"page"+getCurrentPage();
  var cachedBooks = JSON.parse(window.localStorage.getItem('cachedData')) || [];
  return cachedBooks.filter((val) => {
    return val.page == key
  });
}

var shouldCache = (resultHtml) => {
  var cacheKey = getSearchText()+"page"+getCurrentPage();
    items = JSON.parse(window.localStorage.getItem('cachedData')) || [];

    if(!hasCached()) {
      items.push({
      page: cacheKey,
      result: resultHtml
    });
    window.localStorage.setItem('cachedData', JSON.stringify(items));
    }
};

window.onload = () => loadXMLFile(featuredResults);