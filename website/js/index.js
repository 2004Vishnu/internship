let p= document.getElementById("fruit");
      let q=document.getElementById("fruits").onchange=function(e){
    console.log(e) 
        p.innerText=e.target.value;}


let img1=document.getElementById("myimg");
img1.addEventListener("load",function(){
     document.getElementById("img").innerHTML = "Page is fully loaded!";
    })

    function copyText() {
      const text = document.getElementById("content").value;
      window.navigator.clipboard.writeText(text);
    }
      
  function pasteAppend() {
      window.navigator.clipboard.readText()
        .then(text => {
          document.getElementById("content1").value += text;
        });
    }

    function pasteReplace() {
      window.navigator.clipboard.readText()
        .then(text => {
          document.getElementById("content1").value = text;
        });}