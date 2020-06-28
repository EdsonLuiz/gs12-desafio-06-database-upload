import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Request {
  category: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  public async execute({
    category,
    title,
    type,
    value,
  }: Request): Promise<Transaction> {
    // TODO
    const transactionRepository = getRepository(Transaction);

    const transaction = {} as Transaction;

    switch (type) {
      case 'income':
        return transaction;
        break;
      case 'outcome':
        return transaction;
        break;
      default:
        throw new AppError(
          'Only accept transactions of type income or outcome.',
        );
    }

    return transaction;
  }
}

export default CreateTransactionService;
