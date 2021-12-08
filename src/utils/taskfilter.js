export function storeTaskNames(newTask){
    console.log("aaa")
    console.log(localStorage)
    var arr = [];
    if(null != localStorage.getItem("tasknamelist"))
    {
        arr = localStorage.getItem("tasknamelist").split(',');
    }
    if(arr.length >= 10){
        arr.shift();
    }
    let filter = new Set(arr);
    filter.add(newTask.task_name)
    arr = [...filter];
    localStorage.setItem("tasknamelist", arr);
    console.log("bbb")
    console.log(localStorage)
}

export function reverseTaskNames(){
    let names = localStorage.getItem("tasknamelist")
    return names ? names.split(',').reverse() : [];
}