$(()=>{



    let allcookies = localStorage.getItem('recepti');
    console.log(allcookies);
    let receptiArr = [];
    receptiArr = JSON.parse(allcookies);
    console.log(receptiArr);


    receptiArr.forEach((s,e)=>{
        let $card = $(`<div class="card" style="width: 20rem;">`);
        let $blok = $(`<div class="card-block">`);
        let $name = $(`<h4 class="card-title">`);
        $name.text(s.ime);
        let $poteklo = $(`<p class="card-text">`);
        $poteklo.text(s.poteklo);
        let $ulLiist = $(`<ul class="list-group list-group-flush">`);
  
        s.sostojki.forEach((b)=>{
            $ulLiist.append(
                `<li class="list-group-item">${b}</li>`
            )
        })
        $blok.append($name, $poteklo);
        $card.append($blok, $ulLiist);
        $(".container").append($card);
       
    })
})
