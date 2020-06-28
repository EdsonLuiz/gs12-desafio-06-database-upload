import {
  getCustomRepository,
  TransactionRepository,
  getRepository,
} from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

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
    if (!(type === 'income' || type === 'outcome')) {
      throw new AppError('Type of transaction should be income or outcome.');
    }
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance.');
    }

    let returnedCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!returnedCategory) {
      returnedCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(returnedCategory);
    }

    const createdTransaction = transactionRepository.create({
      title,
      value,
      type,
      category: returnedCategory,
    });

    await transactionRepository.save(createdTransaction);

    return createdTransaction;
  }
}

export default CreateTransactionService;
