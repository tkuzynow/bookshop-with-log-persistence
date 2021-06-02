using { Country, managed } from '@sap/cds/common';
using my.bookshop as bookshop from '../db/data-model';

service CatalogService {

  entity Books @readonly as projection on bookshop.Books;
  entity Authors @readonly as projection on  bookshop.Authors;
  entity Orders @insertonly as projection on  bookshop.Orders;

}