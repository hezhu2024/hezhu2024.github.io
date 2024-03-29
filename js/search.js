

// ]
// var timer = document.getElementById('element_1');
// console.log(timer);
// console.log(typeof timer);
// console.dir(timer);
// var firstbox = document.querySelector('.footer');
// console.log(firstbox);
// var ul = document.querySelector('ul');
// console.log(ul);
//获取元素 在搜索文本中添加元素
var element = document.querySelectorAll('li');
const search = document.querySelector('#search_text');
// console.log(element);
var tem = new Array(element.length)
for (let i = 0; i < element.length; i++) {
    tem[i] = element[i];
    tem[i].onclick = function () {

        // console.log(tem.childNodes[3].innerText);
        // console.log(search.value);
        search.value += tem[i].childNodes[3].innerText + ',';
    }
}

const search_button = document.querySelector('#search_button')
// console.log(search_button)
const pager = document.querySelector('.pager')
const data_list = document.querySelector('.data_list')
pager.style.display = "none"
data_list.style.display = "none"

search_button.onclick = function () {
    // console.log('!!')
    let chosed_value = document.querySelector('#nspecies_equal').value
    if (chosed_value == 0) {
        chosed_value = 10
    }
    // console.log(chosed_value)
    document.querySelector('.data_tem_list').innerHTML = ''
    document.querySelector('.number_pager').innerHTML = ''
    if (search.value == '') {
        // console.log('??')
        pager.style.display = "none"
        data_list.style.display = "none"
        return
    }
    let element_chosed = search.value
    element_chosed = element_chosed.split(',')
    element_chosed.pop()
    // console.log(element_chosed)
    let datalist_tem = []
    // 符合对象的数量
    data_material_new.map((item, index_dmn) => {
        // console.log(index_dmn)
        const { id, simple_name, element_name, space_group, bandgap, ZT } = item
        let sign_tem = 1
        element_chosed.forEach((i, index_i) => {
            let sign = 0
            // let sign_tem = 1
            element_name.forEach((j, index_j) => {
                // console.log(i, j)
                if (i == j) {
                    sign = 1
                }

                if (index_j == element_name.length - 1) {
                    // console.log(sign)
                    return sign
                }

            })

            if (element_name.length > chosed_value) {
                sign = 0
            }
            sign_tem = sign_tem * sign
            if (index_i == element_chosed.length - 1) {
                // console.log(index_i, sign_tem)
                return sign_tem
            }
        })
        if (sign_tem == 1) {
            datalist_tem.push(item)
        }
    })
    // console.log(datalist_tem)
    // 渲染对象与分页器
    pager.style.display = "flex"
    data_list.style.display = "block"
    const number_list = 20
    let datalist_tem_class = []
    let i_now_page = 1
    const number_i_page = Math.ceil(datalist_tem.length / number_list)
    for (let i = 0; i < number_i_page; i++) {
        let tem = []
        for (let j = 0; j < number_list; j++) {
            if (i * number_list + j >= datalist_tem.length) {
                continue
            }
            tem.push(datalist_tem[i * number_list + j])
        }
        datalist_tem_class.push(tem)
        // console.log(tem)

    }
    // datalist_tem_class.pop()
    // console.log(datalist_tem_class)
    // 展示当前页的对应数据


    function show_datalist() {
        document.querySelector('.data_tem_list').innerHTML = ''
        document.querySelector('.data_tem_list').innerHTML += datalist_tem_class[i_now_page - 1].map((item, index_dmni) => {
            const { id, simple_name, element_name, space_group, bandgap, ZT } = item
            let simple_name_tem = ''
            simple_name.forEach((i, index_i) => {
                simple_name_tem += i
            })
            return `
                    <a href=" ../sample.html"  target="blank" style="text-decoration: none">
                        <div class="hanger">
                            <p class="search_entry">${simple_name_tem}</p>
                            <p class="mp_index">${id}</p>
                            <p class="space_group">${space_group}</p>
                            <p class="bandgap">${bandgap}eV</p>
                            <p class="ZT">${ZT}</p>
                        </div>
                    </a>
                    
                `
        }).join('')

    }
    if (datalist_tem_class.length != 0) {
        show_datalist()
    }
    // function get_chosed_data(data_chosed) {
    //     let new_element_scr = document.createElement("script")
    //     new_element_scr.setAttribute("type", "module")
    //     new_element_scr.setAttribute("src", ` ../js/materials/${data_chosed.id}/data_materials.js`)
    //     document.body.appendChild(new_element_scr)

    // }
    const chosed_a = document.querySelectorAll('a')
    for (let i = 0; i < chosed_a.length; i++) {
        let chosed_a_i = chosed_a[i]
        chosed_a_i.addEventListener('click', function () {
            const data_chosed = datalist_tem_class[i_now_page - 1][i]
            let str_data_chosed = `js/materials/${data_chosed.id}/data_materials.js`
            localStorage.setItem("myData", JSON.stringify(str_data_chosed))


        })


    }
    // 根据i_now_page展示
    function show_number_pages() {
        document.querySelector('.number_pager').innerHTML = ''
        if (i_now_page == 1) {
            for (let i in [...Array(number_i_page).keys()]) {
                j = Number(i) + 1

                if (j <= 5) {
                    number_pager.innerHTML += `<div class="a${j}_page i_page">${j}</div>`
                }
                else if (j == number_i_page && number_i_page >= 7) {
                    number_pager.innerHTML += `<div class="a${j}_page i_page">${j}</div>`
                }
                else if (j == 6) {
                    number_pager.innerHTML += `<div class="a${j}_page j_page">...</div>`
                }
            }
            // 给当前页上色
            document.querySelector(`.a${i_now_page}_page`).style.backgroundColor = 'pink'
        }
        else if (i_now_page >= number_i_page - 5 && number_i_page >= 8) {
            for (let i in [...Array(number_i_page).keys()]) {
                j = Number(i) + 1

                if (j == 1) {
                    number_pager.innerHTML += `<div class="a${j}_page i_page">${j}</div>`
                }
                else if (j >= number_i_page - 5) {
                    number_pager.innerHTML += `<div class="a${j}_page i_page">${j}</div>`
                }
                else if (j == 2) {
                    number_pager.innerHTML += `<div class="a${j}_page j_page">...</div>`
                }


            }
            // 给当前页上色
            document.querySelector(`.a${i_now_page}_page`).style.backgroundColor = 'pink'
        }
        else {
            for (let i in [...Array(number_i_page).keys()]) {
                j = Number(i) + 1

                if (j >= i_now_page - 1 && j <= i_now_page + 1) {
                    number_pager.innerHTML += `<div class="a${j}_page i_page">${j}</div>`
                }
                else if (j == number_i_page) {
                    number_pager.innerHTML += `<div class="a${j}_page i_page">${j}</div>`
                }
                else if (j == i_now_page + 2) {
                    number_pager.innerHTML += `<div class="a${j}_page j_page">...</div>`
                }


            }
            // 给当前页上色
            document.querySelector(`.a${i_now_page}_page`).style.backgroundColor = 'pink'
        }
    }

    const number_pager = document.querySelector('.number_pager')
    // 生成具体第一次的分页器
    for (let i in [...Array(number_i_page).keys()]) {
        j = Number(i) + 1

        if (j <= 6) {
            number_pager.innerHTML += `<div class="a${j}_page i_page">${j}</div>`
        }
        else if (j == number_i_page) {
            number_pager.innerHTML += `<div class="a${j}_page i_page">${j}</div>`
        }
        else if (j == 7) {
            number_pager.innerHTML += `<div class="a${j}_page ">...</div>`
        }


    }


    let iter = 0
    function make_event_pager() {
        iter += 1
        const chosed_page = document.querySelectorAll('.i_page')
        for (let i = 0; i < chosed_page.length; i++) {
            let chosed_i_page = chosed_page[i]
            // console.log(chosed_i_page)
            chosed_i_page.addEventListener('click', function () {
                document.querySelector(`.a${i_now_page}_page`).style.backgroundColor = 'pink'
                // 关键衔接点，当前点击页
                i_now_page = Number(this.innerText)
                console.log(i_now_page)

                // 渲染对应页信息
                show_datalist()
                // 渲染对应分页器
                show_number_pages()
                // 调用本身
                if (iter = 1) {
                    make_event_pager()
                    iter = 0
                }

            })

        }
    }
    make_event_pager()
    // 给当前页上色
    if (datalist_tem_class.length != 0) {
        document.querySelector(`.a${i_now_page}_page`).style.backgroundColor = 'pink'
    }

    // for (let i in [...Array(number_i_page).keys()]) {
    //     j = Number(i) + 1;
    //     const tem_page = document.querySelector(`.a${j}_page`)
    //     // console.log(tem_page)
    //     // tem_page.onclick = function () { 
    //     //     document.querySelector('.data_tem_list').innerHTML = ''

    //     // }
    // }
    // document.querySelector('.number_pager')



    const left_page = document.querySelector('.left_page')
    const right_page = document.querySelector('.right_page')
    left_page.onclick = function () {
        document.querySelector('.data_tem_list').innerHTML = ''
        document.querySelector('.number_pager').innerHTML = ''
        if (i_now_page == 1) {
            i_now_page = i_now_page - 0
        }
        else {
            i_now_page = i_now_page - 1
        }
        show_datalist()



        show_number_pages()
        let iter = 0
        make_event_pager()
        if (datalist_tem_class.length != 0) {
            document.querySelector(`.a${i_now_page}_page`).style.backgroundColor = 'pink'
        }
        const chosed_a = document.querySelectorAll('a')
        for (let i = 0; i < chosed_a.length; i++) {
            let chosed_a_i = chosed_a[i]
            chosed_a_i.addEventListener('click', function () {
                const data_chosed = datalist_tem_class[i_now_page - 1][i]
                let str_data_chosed = `js/materials/${data_chosed.id}/data_materials.js`
                localStorage.setItem("myData", JSON.stringify(str_data_chosed))

            })
        }
    }


    right_page.onclick = function () {
        document.querySelector('.data_tem_list').innerHTML = ''
        document.querySelector('.number_pager').innerHTML = ''
        if (i_now_page == number_i_page) {
            i_now_page = i_now_page - 0
        }
        else {
            i_now_page = i_now_page + 1
        }
        show_datalist()
        show_number_pages()
        let iter = 0
        make_event_pager()
        if (datalist_tem_class.length != 0) {
            document.querySelector(`.a${i_now_page}_page`).style.backgroundColor = 'pink'
        }
        const chosed_a = document.querySelectorAll('a')
        for (let i = 0; i < chosed_a.length; i++) {
            let chosed_a_i = chosed_a[i]
            chosed_a_i.addEventListener('click', function () {
                const data_chosed = datalist_tem_class[i_now_page - 1][i]
                let str_data_chosed = `js/materials/${data_chosed.id}/data_materials.js`
                localStorage.setItem("myData", JSON.stringify(str_data_chosed))

            })
        }
    }
    search.value = ''


}

