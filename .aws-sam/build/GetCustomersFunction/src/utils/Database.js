const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = null;
    this.client = new SecretsManagerClient({ region: "eu-central-1" });
    this.secretName = "prod/v2/sql";
  }

  async connect() {
    try {
      const secretString = await this.getSecretValue(this.secretName);
      const credentials = JSON.parse(secretString);
      this.connection = mysql.createConnection({
        host     : credentials.host,
        user     : credentials.username,
        password : credentials.password,
        port     : credentials.port,
        database   : credentials.dbname
      });
      await this.connection.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      console.log('Disconnected from the database');
    }
  }

  async getSecretValue(secretName) {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    try {
      const response = await this.client.send(command);
      return response.SecretString;
    } catch (error) {
      console.error("Error fetching secret from Secrets Manager:", error);
      throw error;
    }
  }

  async query(sql, values) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async insert(table, data) {
    const sql = `INSERT INTO ${table} SET ?`;
    await this.query(sql, data);
  }

  async getById(table, id) {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
    const results = await this.query(sql, [id]);
    return results[0];
  }

  async update(table, data) {
    const sql = `UPDATE ${table} SET ? WHERE id = ?`;
    await this.query(sql, [data, data.id]);
  }

  async delete(table, id) {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    await this.query(sql, [id]);
  }
}

module.exports = Database;