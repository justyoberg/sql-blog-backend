import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_URL);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database');
    return process.exit(1);
  }

  return null;
};
