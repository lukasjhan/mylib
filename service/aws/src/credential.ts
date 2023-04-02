interface Credentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
}

const credential: Credentials = require('../key.json');

export default credential;
