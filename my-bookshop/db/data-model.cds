namespace my.bookshop;
using { Country, managed } from '@sap/cds/common';

entity Books {
  key ID : Integer;
  title  : localized String;
  author : Association to Authors;
  stock  : Integer;
}

entity Authors {
  key ID : Integer;
  name   : String;
  books  : Association to many Books on books.author = $self;
}

entity Orders : managed {
  key ID  : UUID;
  book    : Association to Books;
  country : Country;
  amount  : Integer;
}


entity Logs {
  key ID  : UUID;
  tenantID: String;
  author_ID:String;
  level: String;
  source: String;
  host: String;
  process: String;
  module: String;
  method: String;
  timestamp: Date;
  action: String;
  type: String enum {
     REGULAR = 'R';
     SECURITY = 'S';
  };
  message: String;
  user: String;
  actionOnUser: String;
  hasDetailedMessages: Boolean;
  detailedMessages: String;
}