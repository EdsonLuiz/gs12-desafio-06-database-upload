import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';
import { getCustomRepository } from 'typeorm';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // TODO
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const returnedTransaction = await transactionRepository.findOne(id);

    if (!returnedTransaction) throw new AppError('Transaction not found');

    await transactionRepository.remove(returnedTransaction);

    return;
  }
}

export default DeleteTransactionService;
