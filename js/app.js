const loadPhone = async (getSearchValue, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${getSearchValue}`);
    const data = await res.json();
    const phone = data.data
    console.log(phone);
    displayPhone(phone, isShowAll)
}

// loadPhone();

const displayPhone = (phone, isShowAll) => {
    const phone_div = document.getElementById('Phone-container')
    phone_div.innerText = '';

    console.log(`click from show more button ${isShowAll}`);

    const ShowAllPhone = document.getElementById('show_all_phone');

    if (phone.length > 12 && !isShowAll) {
        ShowAllPhone.classList.remove('hidden');
    } else {
        ShowAllPhone.classList.add('hidden');

    }
    // show less then 12 phone
    if (!isShowAll) {
        phone = phone.slice(0, 12);
    }
    console.log(phone);

    phone.filter(phone => {
        const div = document.createElement('div');
        div.classList = `card bg-base-100 p-2 shadow-xl`
        div.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.brand}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">show Details</button>
              </div>
            </div>
        `
        phone_div.appendChild(div)
    });

    spnningWheel(false);

}

// handle button

const handleSearch = (isShowAll) => {
    spnningWheel(true)
    const getSearchText = document.getElementById('search-text');
    const getSearchValue = getSearchText.value;
    console.log(getSearchValue);

    loadPhone(getSearchValue, isShowAll);

    const pictureHidden = document.getElementById('main-picture');
    pictureHidden.classList.add('hidden');
}

// spnning wheel function

const spnningWheel = (isLoading) => {
    const spinningWheel = document.getElementById('spinning_wheel');
    if (isLoading) {
        spinningWheel.classList.remove('hidden');
    } else {
        spinningWheel.classList.add('hidden');

    }
}

// handle show more function
const handleShowAll = () => {

    handleSearch(true)

}

// show details

const showDetails = async (showDetails) => {
    my_modal_1.showModal();
    console.log(showDetails);

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${showDetails}`);
    const data = await res.json();
    const singlePhone = data.data;
    console.log(singlePhone);

    const phoneName = document.getElementById('phone_name');
    phoneName.innerHTML = `<h2><span>Brand:</span>${singlePhone.brand}</h2>
                             <h2><span>name:</span>${singlePhone.name}</h2>                   
                             <h2><span>chipset:</span>${singlePhone.mainFeatures.chipSet}</h2>                   
                             <h2><span>display:</span>${singlePhone.mainFeatures.displaySize}</h2>                   
                             <h2><span>memory:</span>${singlePhone.mainFeatures.memory}</h2>                   
    `;

    const phoneName1 = document.getElementById('image_container');
    phoneName1.innerHTML = `<img src="${singlePhone.image}" alt="Shoes" />`;


}