import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TestData implements InMemoryDbService {
  createDb() {
    //JSON data  
    let bookDetails = [
      { id: '101', name: 'Angular 2 by Krishna', category: 'Angular', year: '2015' },
      { id: '102', name: 'AngularJS by Krishna', category: 'Angular', year: '2015' },
      { id: '103', name: 'Angular 2 by Vishnu', category: 'Angular', year: '2016' },
      { id: '104', name: 'Core Java by Vishnu', category: 'Java', year: '2016' },
      { id: '105', name: 'JSP & Servlet by Vishnu', category: 'Java', year: '2016' },
      { id: '106', name: 'JPA by Vishnu', category: 'Java', year: '2016' },
      { id: '107', name: 'Hibernate by Krishna', category: 'Hibernate', year: '2015' }
    ];
    //JSON data
    let writerDetails =
      {
        writerId: 11, writerName: 'Mahesh',
        books: [
          { id: '103', name: 'Angular Tutorial', category: 'Angular', year: '2016' },
          { id: '104', name: 'Core Java Tutorial', category: 'Java', year: '2015' }
        ]
      };
    //Text data
    let welcomeMsg = "Welcome to the Angular world!";

    return { books: bookDetails, writer: writerDetails, message: welcomeMsg };
  }
} 