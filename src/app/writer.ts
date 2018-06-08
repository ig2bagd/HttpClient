import { Book } from './book';

export interface Writer {
   writerId: number;
   writerName: string;
   books: Book[];
}