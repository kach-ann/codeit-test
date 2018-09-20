'use strict';

import './companies.scss';

class Companies {

  constructor() {
    this.companiesList = [];
  };

  render(){
    document.title = 'Companies';

    $('#app').html(render());

    $.get('http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList', this.displayCompanies.bind(this));

  }

  displayCompanies (resp) {

    $('.total .loader,.companiesList .loader,.news .loader, .location .loader').remove()
    this.companiesList = resp.list;

    resp.list.forEach((company) => {
      $('.company-list').append(`<div>${company.name}</div>`);
    });

    $('.total .card-body').append(`<div class="totalCompanies">${resp.list.length}</div>`);

    $('.company-list div').on("click", this.partnesrsPersent.bind(this));
  }

  partnesrsPersent(event){

    $('.partners').show();


    $('.partners .allPartners').empty();
    let companyName = $(event.target).text();

    $('.company-list div.currentCompany').removeClass('currentCompany');

    $(event.target).addClass('currentCompany');

    let currentCompany = this.companiesList.find((company) => company.name === companyName);



    let companyPartners = currentCompany.partners;


    var totalValue = 0;
    for (let i = 0; i < companyPartners.length; i++){
      totalValue += companyPartners[i].value;
    }


    for (let i = 0; i < companyPartners.length; i++) {
      let percentOfValue = Math.round(companyPartners[i].value*100/totalValue);
      $('.partners .allPartners').append(`<div class="allInformation"><div class="partnerName"> ${companyPartners[i].name}</div><div class="partner"> ${percentOfValue}%</div></div>`);
    }


  }

}

export const companies = new Companies();

function render(){
  return `
<h1>Companies</h1>

<div class="row">
  <div class="col-12 col-md-6 mt-5 mt-md-0">
    <div class="card total">
        <div class="card-header font-weight-bold" >Total Companies</div>
        <div class="card-body">
        <div class="loader"></div>
        </div>
     </div>
  </div>
  
  <div class="col-12 col-md-6 mt-5 mt-md-0">
      <div class="card companiesList">
        <div class="card-header font-weight-bold" >List of Companies</div>
        <div class="card-body">
            <div class="loader"></div>
            <div class="company-list">
            </div>
        </div>
     </div>  
  </div>
</div>

<div class="row">
    <div class="col-12 mt-5">
        <div class="card partners">
            <div class="card-header font-weight-bold" >Companies partners</div>
            <div class="card-body allPartners"></div>
        </div>
    </div>
</div>

<div class="row mt-0 mt-md-5">
  <div class="col-12 col-md-6 mt-5 mt-md-0">
    <div class="card">
        <div class="card-header font-weight-bold" >Companies by Location</div>
        <div class="card-body location">
        <div class="loader"></div>
        </div>
     </div>
  </div>
  
  <div class="col-12 col-md-6 mt-5 mt-md-0">
      <div class="card">
        <div class="card-header font-weight-bold news" >News</div>
        <div class="card-body news">
          <div class="loader"></div>
          <div class="row">
            <div class="col-5">
              <div class="img"><img src="src/img/Capture.PNG"></div>
              <div class="font-weight-bold">Author:<span> Admin</span></div>
              <div class="font-weight-bold">Public:<span> 30.10.2016</span></div>
             </div>
            
            <div class="col-7"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p></div>
          </div>
        </div>
     </div>
  </div>
</div>
  `
}
