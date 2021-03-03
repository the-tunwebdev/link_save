const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks=[]

//show modal , foucs on input 
function showModal(){
    modal.classList.add('show-modal')
    websiteNameEl.focus()
}
function validation(nameValue,urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const regex = new RegExp(expression);
    
    if(!urlValue.match(regex)){
        alert('please provide a valid web adrees')
        return false
    }
    // valid
    return true
}
// delBook
function delBook(url){
    bookmarks.forEach((bookmark,index)=>{
        if(bookmark.url=== url){
            bookmarks.splice(index,1);
        }
    })
    // update bookmarks array in the local storage after removig 
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    fetchBookMarks()
}
// build the bookmarks using the DOM
function buidBook(){
    // remove all bookmark container
    bookmarksContainer.textContent='';
    bookmarks.forEach((bookmark)=>{
        const {name,url}= bookmark;
        // item 
        const item = document.createElement('div');
        item.classList.add('item');
        // close icon
        const iconClose= document.createElement('i');
        iconClose.classList.add('fas','fa-times');
        iconClose.setAttribute('title','Delete');
        iconClose.setAttribute('onclick',`delBook('${url}')`)
        // favicon/ link conatiner
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // favicon
        
        const favicon = document.createElement('img');
        favicon.setAttribute('type','image/png')
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
        favicon.setAttribute('alt','Favicon');
        // link
        const link = document.createElement('a');
        link.setAttribute('href',`${url}`)
        link.setAttribute('target','_blank');
        link.textContent= name;
        // append to bookmarks container
        linkInfo.append(favicon,link)
        item.append(iconClose,linkInfo)
        bookmarksContainer.appendChild(item)
    })
}
// feych bookmarks 
function fetchBookMarks(){
    // get the bookmarks if they are available
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    }else{
        // create a bookmarks array in the loczl storage 
        bookmarks=[{
            name:'w3s',
            url:'https://www.w3schools.com/'
        }]
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
        
    }
    buidBook()
}
function storeBookMark(e){
    e.preventDefault()
    const nameValue= websiteNameEl.value ;
    let urlValue= websiteUrlEl.value;
    if(!urlValue.includes('https://','https://')){
        urlValue=`https://${urlValue}`;
    } 
    if(!urlValue.endsWith(".com")){
        urlValue=`${urlValue}.com`
    }
    if(!validation(nameValue,urlValue)){
        return false
    }
    const bookmark={
        name:nameValue,
        url:urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    fetchBookMarks()
    bookmarkForm.reset();
    websiteNameEl.focus()

}
// modal event listeners
modalShow.addEventListener('click',showModal)
modalClose.addEventListener('click',()=>{modal.classList.remove('show-modal')})
window.addEventListener('click',(e)=>{e.target===modal? modal.classList.remove('show-modal'): false})
bookmarkForm.addEventListener('submit',storeBookMark)
fetchBookMarks()