'use strict';

import './registration.scss';
import { companies } from '../companies/companies';

class Registration {
  render() {
    document.title = 'Registration';

    $('#app').html(render());
    $('form#registration').on("submit", function () {
      $('.alert-danger').remove();

      $.post('http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration',
        $('form#registration').serialize(),
        function(data) {
          console.log(data.status)
          if (data.status === 'Error') {
            $('.card-body').prepend(
              `<div class="alert alert-danger">${data.message}</div>`
            )
          } else if (data.status === 'Form Error') {
            $('.form-control[name="' + data.field + '"]').parent().after(
              `<div class="alert alert-danger">${data.message}</div>`
            );
          } else {
            companies.render();
          }

        }
      )
      return false;
    });
  }
}
export const registration = new Registration();

function render() {
  return `
<div class="card">
  <div class="card-header text-center font-weight-bold" >Sing Up</div>
  <div class="card-body">
  <form id="registration">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
          </div>
           <input name="name" type="text" class="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="First name" required>
        </div>    
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
          </div>
           <input name="secondname" type="text" class="form-control" id="exampleInputLastUsername" aria-describedby="emailHelp" placeholder="Last name" required>
        </div>    
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-envelope"></i></span>
          </div>
          <input name="email" type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email" required>
        </div>    
      </div>
      <div class="form-group">
        <select name="gender" class="form-control" id="gender" required>
          <option selected disabled value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-star-of-life"></i></span>
          </div>
          <input name="pass" type="password" class="form-control" id="exampleInputPassword" aria-describedby="emailHelp" placeholder="Password" required>
        </div>    
      </div>
      <div class="form-check">
        <input required type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Conditions of Agreement</label>
      </div>
      <button type="submit" class="btn btn-secondary">Send</button>
    </form>
  </div>
</div>
    
  `;
}
