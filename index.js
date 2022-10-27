

//base URL
const baseUrl = "http://localhost:3000/blog";
//grab elements of document
const blogArea = document.querySelector("#blog-session");
const form = document.querySelector("form");


//DOMContentloaded will allow the script load after the HTML document is loaded
//the submit event will submit the form of the blog
document.addEventListener("DOMContentLoaded",()=>{
    document.querySelector("form").addEventListener("submit" ,(e)=>{
        e.preventDefault();
         handleSubmit(e);
    })
})

//getBlog function will fetch the api from the server

function getBlog(){
    fetch(baseUrl)
//the server will then respond back from the server and treat it as json object
    .then(res => res.json())

//for each blog exist, render it from the server    
    .then(data => data.forEach(blog =>renderBlog(blog)))
}
 getBlog()

//renderBlog will set up the inside element within the funciton
//then append to the main blog area
function renderBlog (blog){
    const card = document.createElement("ul");
    card.className ="card"
    card.id = `${blog.id}`
    card.innerHTML=`
    <div class="blog-cards">
    <h2 class="blog-title">${blog.title}</h2>
    <img class="blog-img" src="${blog.image}" width="800" height="500">
    <p class="blog-content">${blog.content}</p>
    <button type="button" class="remove-blog-btn">REMOVE BLOG</button>
    </div>
    `


    blogArea.appendChild(card)
//remove button event, and removeBlog(blog.id) function will delete the blog from the server
    card.querySelector(".remove-blog-btn").addEventListener("click", ()=>{
        card.remove()
        removeBlog(blog.id)
    })
   
}

//handle button submit
function handleSubmit(e){
  
//new/blogObj have the event and target the id 
//and grab the value of the input that the user type in    
let newBlogObj = {
    title:e.target.title.value,
    image:e.target.image.value,
    content:e.target.contents.value
}

    
    renderBlog(newBlogObj)
    newBlogPost(newBlogObj)
    form.reset()
}

//Post method to post the blog to the server
function newBlogPost(newBlogObj){
    fetch(baseUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newBlogObj)
    })
    .then(res=> res.json())
    .then(data=> console.log(data))
}


//Patch method to update the added blog to the server
function updateBlog(newBlog){
    fetch(`${baseUrl}/${newBlog.id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        //convert js script to json string
        body:JSON.stringify(newBlog)
        
    })
    .then(res=>res.json())
    .then(data=>console.log(data))

}

//Delete method will delete the blog from the server, with specific id

function removeBlog(id){
    fetch(`${baseUrl}/${id}`, {
        method:"DELETE",
        headers:{
            "Content-Type" :"application/json"
        }
    })
    .then(res=> res.json())
    .then(data => console.log(data))
}
