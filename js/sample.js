const str_data = JSON.parse(localStorage.getItem("myData"))
console.log(str_data)
document.write(`<script src="${str_data}"></script>`)