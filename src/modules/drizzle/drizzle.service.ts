import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client, ClientConfig } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { config } from 'dotenv';

config({ path: '.env' }); // Load environment variables

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private client: Client;
  public db: NodePgDatabase;

  constructor() {
    const clientConfig: ClientConfig = {
      connectionString:
        process.env.POSTGRES_DB_CONNECTION_STRING ||
        'http://postgres:postgres@172.17.0.3:5432/',
    };

    // Initialize the client
    this.client = new Client(clientConfig);
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      this.db = drizzle(this.client);
      console.log('Connected to the Postgres database successfully.');
    } catch (error) {
      console.error('Failed to connect to the Postgres database:', error);
      throw new Error('Database connection error');
    }
  }

  async onModuleDestroy() {
    try {
      await this.client.end();
      console.log('Disconnected from the Postgres database successfully.');
    } catch (error) {
      console.error('Failed to disconnect from the Postgres database:', error);
    }
  }
}
