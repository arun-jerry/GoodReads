# GoodReads

## KEY FEATURES:
* Local storage.!!! Yes the searched pages are saved locally. The result from `generateHtmlData()` is stored agains a key shown below. `key = search_text + "page" + current_pagenumber`
* Beautiful design and flexibility, the page reamins intact even on smaller screens with a scroll in the middle just for the books and the rest are fixed.
* Click on the book and it takes you to the good reads page directly.
* Hover over the book incase the book does not have a proper image on top. (lazy implimentation using `title` attribute)

## SCOPE FOR IMPROVEMENT
* could have display more info of the book on click rather than navigating it to the good reads page itself.
* could have integrated more API than just using the search API alone.
* could have implimented validations in search
* Did not cache no result page for a keyword
* WELL IT CAN GO ON AND ON....! 

#### Screen 1 : Landing page
The landing page features a collection of Dan Brown's books. The page is resolution friendly as well. If seen through a small screen the books alone will have horizontal scroll. 
![GitHub Logo](/screenshots/featured.png)


#### Screen 2 : No result page
A simple no results page where the screen is blank with a small message below the search.
![GitHub Logo](/screenshots/noresults.png)

 
#### Screen 3 : Search with results
You can navigate through the button on the bottom left, first page of the results, previous page, next page and last page in their corresponding order. 
![GitHub Logo](/screenshots/searchwithresults.png)

