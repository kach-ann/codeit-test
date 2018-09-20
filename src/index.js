'use strict';

import 'bootstrap';
import './scss/index.scss';

import { registration } from './registration/registration';
import { companies } from './companies/companies';

$(function () {
  registration.render();
  companies.render();
});
