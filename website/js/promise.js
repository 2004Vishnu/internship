const order=new Promise((resolve,reject)=>{
    // let data=fetch("https://jsonplaceholder.typicode.com/posts/1")
        let data=null;
        if(data){
            resolve(data);
        }
    
        else{
        reject("no data");
    }
   
});

loading=false;
error=false;

const datahandler=()=>{
    let loading=true;
order.then((data)=>{
    // console.log(loading);
    console.log(data);
})
.catch((err)=>{
    error=true;
    console.log(err);
})
.finally(()=>{
    loading=false;
    console.log("order is completed");
});
}
datahandler();