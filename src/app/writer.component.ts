import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/retry';

import { tap, map, retry } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { WriterService } from './writer.service';
import { Book } from './book';
import { Writer } from './writer';

@Component({
	selector: 'app-writer',
	templateUrl: './writer.component.html'
})
export class WriterComponent implements OnInit {
	obsTextMsg: Observable<string>;
	obsBooks: Observable<Book[]>;
	books: Book[];
	favBooks: Book[];
	favWriter: Writer;
	writer: Writer;

	categories = [
		{ category: 'Angular' },
		{ category: 'Hibernate' },
		{ category: 'Java' }
	];
	years = [
		{ year: '2015' },
		{ year: '2016' }
	];

	constructor(private writerService: WriterService,
		private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.getTextMsg();
		this.getBooks();
		this.getWriterWithFavBooks();
		this.getFavoriteWriter();
		this.getWriter();
		this.getData();
	}

	bookForm = this.formBuilder.group({
		category: '',
		year: ''
	});

	onFormSubmit() {
		let category = this.bookForm.get('category').value;
		let year = this.bookForm.get('year').value;
		this.filterBooks(category, year);
	}

	getTextMsg() {
		this.obsTextMsg = this.writerService.getTextMsg();
		this.writerService.getTextMsg().subscribe(
			msg => console.log(msg)
		);
	}
	getBooks() {
		this.obsBooks = this.writerService.getBooks();
	}
	filterBooks(category: string, year: string) {
		this.writerService.filterBooks(category, year)
			.pipe(
				tap(data => console.log('category=' + category + ', year=' + year + '; tap:: ' + JSON.stringify(data)) )
			)
			.subscribe(data =>
				this.books = data
			);
	}
	getWriterWithFavBooks() {
		this.writerService.getWriterWithFavBooks().subscribe(
			data => {
				this.favBooks = data['books'];
			}
		);
	}
	getFavoriteWriter() {
		this.writerService.getFavoriteWriter().pipe(retry(2)).subscribe(
			data => {
				this.favWriter = data;
				console.log(this.favWriter.books);
			},
			(err: HttpErrorResponse) => {
				if (err.error instanceof Error) {
					//A client-side or network error occurred.				 
					console.log('An error occurred:', err.error.message);
				} else {
					//Backend returns unsuccessful response codes such as 404, 500 etc.				 
					console.log('Backend returned status code: ', err.status);
					console.log('Response body:', err.error);
				}
			}
		);
	}
	getWriter() {
		this.writerService.getFullResponseForWriter().subscribe(
			res => {
				this.writer = res.body;
				console.log(this.writer.books);
				console.log(res.headers.get('Content-Type'));
			},
			err => {
				console.log(err);
			}
		);
	}
	getData() {
		this.writerService.getDataForUrl().pipe(retry(3)).subscribe(
			res => {
				console.log(res);
			},
			(err: HttpErrorResponse) => {
				if (err.error instanceof Error) {
					//A client-side or network error occurred.				  
					console.log('An error occurred:', err.error.message);
				} else {
					//Backend returns unsuccessful response codes such as 404, 500 etc.				  
					console.log('Backend returned status code: ', err.status);
					console.log('Response body:', err.error);
				}
			}
		);
	}
}
