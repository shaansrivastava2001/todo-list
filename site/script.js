let newtodo = document.querySelector(".new-todo input");
let newbtn = document.querySelector(".new-todo button");
let mainlist = document.querySelector(".mylist");
let clearAllBtn = document.querySelector(".bottom-line button");
let alertmsg = document.querySelector(".alert");

showmylist();
// for the button to be disabled when nothing is present in the input field
let inputactive = ()=>{
    let fulldata = newtodo.value;
    if (fulldata.trim()!=0){
        newbtn.classList.add("active");
    }else{
        newbtn.classList.remove("active");
    }
}

// for add button
let addbtnclk = ()=>{
    let fulldata = newtodo.value;
    let ls = localStorage.getItem("Fresh Todo");
    if(ls==null){
        arr=[];
        alertmsg.classList.remove("fade");
        alertmsg.classList.add("show");
        newbtn.classList.remove("active");
    }else{
        arr = JSON.parse(ls);
        newbtn.classList.remove("active");
        alertmsg.classList.remove("show");
        alertmsg.classList.add("fade");
    }
    arr.push(fulldata);
    localStorage.setItem("Fresh Todo",JSON.stringify(arr));
    showmylist();
    newbtn.classList.remove("active");
}

// this function is for ul to get data from here
function showmylist(){
    let ls = localStorage.getItem("Fresh Todo");
    if(ls==null){
        arr=[];
    }else{
        arr = JSON.parse(ls);
    }
    const pendingTasks = document.querySelector(".pendingtasks");
    pendingTasks.textContent = arr.length;
    if(arr.length>0){ 
        clearAllBtn.classList.add("active");
    }else{
        clearAllBtn.classList.remove("active");
    }
    let newLiTag = "";
    arr.forEach((element, index) => {
        newLiTag += `<li class="singletask">${element}<span><i class="fas fa-edit" onclick="edit(${index})"></i><i class="fas fa-trash-alt" onclick="deleteTask(${index})"></i></span></li><input type="text" class="editbox" value="Edit task"/>`;
    });
    mainlist.innerHTML = newLiTag;
    newtodo.value = "";
}

// to delete a task
function deleteTask(index){
    let ls = localStorage.getItem("Fresh Todo");
    arr = JSON.parse(ls);
    arr.splice(index, 1);
    localStorage.setItem("Fresh Todo", JSON.stringify(arr));
    showmylist();
}

function edit(index){
    let savebtn = document.getElementsByClassName("save");
    let addbtn = document.getElementsByClassName("add");
    addbtn.innerHTML = "Save";
    // console.log(savebtn.style);
    let saveindex = document.getElementById("todoedit");
    saveindex.value = index;
    let webtask = localStorage.getItem("Fresh Todo");
    let taskobj = JSON.parse(webtask);
    newtodo.value = taskobj[index];
}


let savebtn = document.getElementsByClassName("save");
function save(){
    console.log("sss");
    let addbtn = document.getElementsByClassName("add");
    let webtask = localStorage.getItem("Fresh Todo");
    let taskobj = JSON.parse(webtask);
    let saveindex = document.getElementById("todoedit").value;
    arr.push(saveindex);
    localStorage.setItem("Fresh Todo",JSON.stringify(arr));
    showmylist();
}

// to clear the list
let doempty = ()=>{
    arr = [];
    localStorage.setItem("Fresh Todo", JSON.stringify(arr));
    showmylist();
}