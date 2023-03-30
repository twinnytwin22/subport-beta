import Arweave from 'arweave';

const uploadToArweave = async (file: File): Promise<string> => {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });

  const transaction = await arweave.createTransaction({ data: file });
  transaction.addTag('Content-Type', file.type);

  await arweave.transactions.sign(transaction);
  await arweave.transactions.post(transaction);

  return `https://arweave.net/${transaction.id}`;
};
