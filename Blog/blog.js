import {
        db,
        getDoc,
        doc,
        Timestamp,
      } from "../firebase.js";
      
//  Dom Elements
let blogContainer = document.getElementById("blogContainer");

      document.addEventListener("DOMContentLoaded", async () => {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        
        const blogId = urlParams.get("id");
        const category = urlParams.get("category");
      
        if (blogId && category) {
          const docRef = doc(db, category, blogId);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            const blog = docSnap.data();
            blogContainer.innerHTML = `
              <h1>${blog.title}</h1>
              <img src="${blog.picture}" class="img-fluid" alt="${blog.title}">
              <p>${blog.description}</p>
              <small>Posted on: ${new Date(blog.time).toLocaleString()}</small>
            `;
          } else {
            document.getElementById("blogDetails").innerHTML = "<h1>Blog not found!</h1>";
          }
        }
      });      


      