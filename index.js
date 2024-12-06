import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "./firebase.js";

let uid = localStorage.getItem("uid");

let started = document.getElementById("started");
started.addEventListener("click", () => {
  window.location.href = "./Login-Form/login.html";
});

console.log(new Date().toLocaleString());

const currentDate = new Date();
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const day = currentDate.getDate();
const month = monthNames[currentDate.getMonth()];
const formattedDate = `${month} ${day}`;

//  ----------Dom Elements-----------------
let modal = document.getElementById("modal");
let modalTitle = document.getElementById("modalTitle");
let modalDis = document.getElementById("modalDis");
let modalFile = document.getElementById("modalFile");

const loader = document.getElementById("loader");

let blogBox = document.getElementById("blogBox");
let blogTime = document.getElementById("blogTime");
let blogTitle = document.getElementById("blogTitle");
let blogDis = document.getElementById("blogDis");

let cardImage = document.getElementById("cardImage");
let blogImage = document.getElementById("blogImage");
const blogCategory = document.getElementById("blogCategory").value;

// Cloudinary
const cloudName = "diq2krkmt";
const unsignedUploadPreset = "oibcek4o";
let imgUrl = new Image;
let uploadImage = () => {
  modalFile.addEventListener("change", () => {
    let file = modalFile.files[0];
    let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    let fd = new FormData();
    fd.append("upload_preset", unsignedUploadPreset);
    fd.append("file", file);

    fetch(url, {
      method: "POST",
      body: fd,
    })
      .then((response) => response.json())
      .then((data) => {
        let resourceURl = data.secure_url;
        
        console.log("uploaded succesfully", resourceURl);
        imgUrl.src = resourceURl;
        // imgUrl = toString(resourceURl);
        cardImage.appendChild(imgUrl);
        // }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};
uploadImage();
console.log(imgUrl);

//  modal
// Close Modal When Clicking Outside of Modal Content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none"; // Hide modal
  }
});
// Close Modal When Clicking on close button
window.closeModal = document
  .getElementById("closeModal")
  .addEventListener("click", () => {
    postContainer.style.display = "none";
  });

// const categories = Array.from(blogCategory);
// async function fetchAllBlogs() {
//   const blogs = [];

//   try {
//     for (const category of categories) {
//       const categoryCollection = collection(db, category);
//       const querySnapshot = await getDocs(categoryCollection);

//       querySnapshot.forEach((doc) => {
//         blogs.push({ ...doc.data(), category, id: doc.id });
//       });
//     }

//     displayBlogs(blogs);
//   } catch (error) {
//     console.error("Error fetching blogs: ", error);
//   }
// }

// // Function to display blogs on the page
// function displayBlogs(blogs) {
//   const blogsContainer = document.getElementById("blogsContainer");

//   blogsContainer.innerHTML = "";

//   blogs.forEach((blog) => {

// let blogBox = document.getElementById(blogBox)
//         blogready = `
//       <div class="card d-flex flex-row">
//                                 <div class="card-body">
//                                         <div class="card-header" id="blogTime">${blog.time}</div>
//                                   <h5 class="card-title" id="blogTitle">${blog.usertitle}</h5>
//                                   <p class="card-text" id="blogDis">${blog.discription}.</p>
//                                 </div>
//                                 <div class="cardImage w-50" style="height: 300px;">
//                                         <img src="${imgUrl}}" id="blogImage" alt="Card image cap" style="height: 300px; width: 100%;">
//                                 </div>
//                               </div>
//     `;
//     blogBox.innerHTML = blogready;

//   });

// }

// document.addEventListener("DOMContentLoaded", () => {
//         fetchAllBlogs();
//       });

async function fetchBlogs() {
  const categories = ["Design", "Technology", "AI"];
  blogBox.innerHTML = "";
  loader.style.display = "block";

  try {
    // blogImage.src = imgUrl;
    for (const category of categories) {
      const querySnapshot = await getDocs(collection(db, category));
      querySnapshot.forEach((doc) => {
        const blog = doc.data();
        const blogElement = document.createElement("div");
        blogElement.classList.add("col-md-12");
        blogElement.innerHTML += `
<div class="card d-flex flex-row">
                                <div class="card-body">
                                        <div class="card-header" id="blogTime">${blog.time}</div>
                                  <h5 class="card-title" id="blogTitle">${blog.title}</h5>
                                  <p class="card-text" id="blogDis">${blog.discription}.</p>
                                  <button class="btn btn-primary viewBlog" data-id="${doc.id}" data-category="${category}">View</button>
                                  </div>
                                  <div class="cardImage w-50" id="cardImage" style="height: 300px;">
                                  <img src="${imgUrl}" id="blogImage" alt="${blog.title}" style="height: 300px; width: 100%;">
                                  </div>
                                  </div>
                                  `;

        blogBox.appendChild(blogElement);

      });
    }
  }
  catch (err) {
    console.log(err);
  }
  finally {
    loader.style.display = "none";
  }

}

fetchBlogs();
let createBlogBtn = document.getElementById("createBlog");
let createBlog = () => {
  modal.style.display = "flex";

  ///---------------------Firebase Database work ----------------//
  let addData = async () => {
    window.submitBlog = document.getElementById("submitBlog");
    window.submitBlog.addEventListener("click", async () => {
      try {
        const userRef = doc(db, blogCategory, uid);
        await setDoc(userRef, {
          title: modalTitle.value,
          discription: modalDis.value,
          time: formattedDate,
        });

        //Succesfully creat post
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Post Created Successfully",
        });

        modal.style.display = "none";
        fetchBlogs()
        
        modalTitle = "";
        modalDis = "";
        modalFile = "";
        
      } catch (error) {
        console.error("Error adding user: ", error);
        Swal.fire({
          title: "Error",
          text: "Unsuccessful",
          icon: "error",
        });
      }
    });
  };

  addData();
 
};
createBlogBtn && createBlogBtn.addEventListener("click", createBlog);


let searchInput = document.getElementById("searchInput")
searchInput && searchInput.addEventListener("input", (e) => {
  e.preventDefault()
  const query = e.target.value.toLowerCase();
  const blogCards = document.querySelectorAll(".card");

  blogCards.forEach((card) => {
    blogTitle = blogTitle.innerText.toLowerCase();
    blogDis = blogDis.innerText.toLowerCase();

    if (blogTitle.includes(query) || blogDis.includes(query)) {
      card.parentElement.style.display = "block";
    } else {
      card.parentElement.style.display = "none";
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("viewBlog")) {
    const blogId = e.target.dataset.id;
    const category = e.target.dataset.category;
    window.location.href = `Blog/blog.html?id=${blogId}&category=${category}`;
  }
});